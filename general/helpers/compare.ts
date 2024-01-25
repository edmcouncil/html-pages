import { diff } from './custom-json-diff.js';
import stringComparison from 'string-comparison';

import type {
  DiffSymbol,
  LineDiff,
  DataChunk,
  Data,
  Header,
  LinesChunk,
  ChangeChunk,
  LeftRightChange,
  EmptyData,
  TempDataProperties,
  TitleNameChange,
  MergedData
} from './compare.types.js';

const EMPTY_DATA: EmptyData = { type: 'EMPTY', value: '' };

const EXACT_MATCH_TYPES: string[] = [
  'AXIOM',
  'DIRECT_SUBCLASSES',
  'INSTANCES',
  'MODULES',
  'IRI',
  'OWL_LABELED_MULTI_AXIOM',
];

const SIMILARITY_THRESHOLD: number = 0.6;

function getLinesChunk(item: DataChunk): LinesChunk {
  switch (item.type) {
    case 'AXIOM':
      return {
        type: item.type,
        lines: item.fullRenderedString!
          .split('<br />')
          .map((line: string) => line.trim())
          .map((line: string) => (line.startsWith('- ') ? line.substring(2) : line))
      };

    case 'OWL_LABELED_MULTI_AXIOM':
      return {
        type: item.type,
        lines: [item.entityLabel!.label, ...item.value!.map((v: DataChunk) => v.fullRenderedString)]
      };

    case 'STRING':
      return {
        type: item.type,
        lines: item.value.split('\n')
      };

    case 'DIRECT_SUBCLASSES':
    case 'INSTANCES':
    case 'IRI':
    case 'MODULES':
      return {
        type: item.type,
        lines: [item.value.label]
      };

    default:
      return {
        type: item.type || 'EMPTY',
        lines: [item.value]
      };
  }
}

function isChangeItem(item: any): boolean {
  return Array.isArray(item) && [' ', '+', '-', '~'].includes(item[0]);
}

function getChangeType(symbol: DiffSymbol): string {
  switch (symbol) {
    case '+': return 'added';
    case '-': return 'removed';
    case '~': return 'changed';
    default: return 'unchanged';
  }
}

function isStringSimilar(string1: string, string2: string): boolean {
  return stringComparison.diceCoefficient.similarity(string1, string2) > SIMILARITY_THRESHOLD;
}

function createHeader(data: Data): Header {
  const { label, iri, qName, maturityLevel, versionIri } = data;
  return { label, iri, qName, maturityLevel, versionIri };
}

function initializePropertiesStructure(data1: Data, data2: Data): TempDataProperties {
  let newProperties: TempDataProperties = {};

  if (data1.properties) {
    for (const section in data1.properties) {
      newProperties = {
        ...newProperties,
        [section]: {},
      };
    }
  }

  if (data2.properties) {
    for (const section in data2.properties) {
      newProperties = {
        ...newProperties,
        [section]: {},
      };
    }
  }

  for (const section in newProperties) {
    if (data1.properties?.[section]) {
      for (const title in data1.properties[section]) {
        newProperties[section] = {
          ...newProperties[section],
          [title]: [],
        };
      }
    }

    if (data2.properties?.[section]) {
      for (const title in data2.properties[section]) {
        newProperties[section] = {
          ...newProperties[section],
          [title]: [],
        };
      }
    }
  }

  return newProperties;
}

function populateTitleLines(data: Data, section: string, title: string, includeOriginalData = false): LinesChunk[] {
  const titleAsLines: LinesChunk[] = [];

  // check if title exists in Data object
  if (data.properties?.[section]?.[title]) {
    // it does - get array of LinesChunk[] from the original data chunks
    for (const chunk of data.properties[section][title]) {
      const linesChunk = getLinesChunk(chunk);
      if (includeOriginalData) {
        linesChunk.originalData = chunk;
      }
      titleAsLines.push(linesChunk);
    }
  }

  return titleAsLines;
}

function computeDiffs(titleAsLines1: LinesChunk[], titleAsLines2: LinesChunk[]): ChangeChunk[] {
  const matches: [LinesChunk, LinesChunk][] = [];
  const addedBuffer: LinesChunk[] = [];
  const removedBuffer: LinesChunk[] = [];

  // find matches before comparing
  for (let i = 0; i < titleAsLines1.length; i++) {
    const currentLinesChunk: LinesChunk = titleAsLines1[i];
    if (!EXACT_MATCH_TYPES.includes(currentLinesChunk.type)) continue;
    for (let j = 0; j < titleAsLines2.length; j++) {
      const comparedLinesChunk = titleAsLines2[j];
      if (currentLinesChunk.lines[0] === comparedLinesChunk.lines[0]) {
        matches.push([currentLinesChunk, comparedLinesChunk]);
        titleAsLines1.splice(i, 1);
        titleAsLines2.splice(j, 1);
        i--;
        break;
      }
    }
  }

  // items left in titleAsLines1 are removed - add them to removedBuffed
  for (const removed of titleAsLines1) {
    if (EXACT_MATCH_TYPES.includes(removed.type)) {
      removedBuffer.push(removed);
    }
  }

  // items left in titleAsLines2 are new - add them to addedBuffer
  for (const added of titleAsLines2) {
    if (EXACT_MATCH_TYPES.includes(added.type)) {
      addedBuffer.push(added);
    }
  }

  let titleDiff: ChangeChunk[] = [];

  // if the title has matches or buffered adds/removes then add them, otherwise do regular diff
  if (matches.length > 0 || removedBuffer.length > 0 || addedBuffer.length > 0) {
    for (const match of matches) {
      const linesDiff = diff(match[0].lines, match[1].lines, { full: true });
      titleDiff.push([
        isChangeItem(linesDiff[0]) ? '~' : ' ',
        {
          type: match[1].type,
          lines: linesDiff,
          originalData: match[0].originalData
        },
      ] as ChangeChunk);
    }

    titleDiff.push(...removedBuffer.map(removed => ([
      '-',
      {
        type: removed.type,
        lines: removed.lines,
        originalData: removed.originalData,
      }
    ]) as ChangeChunk));

    titleDiff.push(...addedBuffer.map(added => ([
      '+',
      {
        lines: added.lines,
        type: added.type,
      }
    ]) as ChangeChunk));

    // alphabetical order in titleDiff
    titleDiff.sort((x, y) => {
      const getComparedValue = (item: [string, any]): string => {
        let value = item[0] === '~' ? (item[1].lines as LineDiff[])[0][1] : (item[1].lines as string[])[0];
        return (typeof value !== 'string' ? value['__new'] : value).toLowerCase();
      };
      let comparedValue1 = getComparedValue(x);
      let comparedValue2 = getComparedValue(y);

      return comparedValue1.localeCompare(comparedValue2);
    });
  } else {
    const tempDiff = diff(titleAsLines1, titleAsLines2, {
      full: true,
      excludeKeys: 'originalData',
    });

    for (const item of tempDiff) {
      if (isChangeItem(item)) {
        titleDiff.push(item as ChangeChunk);
      } else {
        titleDiff.push([
          ' ',
          item,
        ] as ChangeChunk);
      }
    }
  }

  return titleDiff;
}

function handleInnerListDiff(lines: LineDiff[]): void {
  // go through LineDiffs of the 'changed' chunk and try to find
  // similar lines that will be merged into modified line representation ('~')
  for (let i = 0; i < lines.length; i++) {
    const current = lines[i];

    // we only consider adds and removes
    if (current[0] != '+' && current[0] != '-') continue;
    let match: LineDiff | null = null;
    for (let j = 0; j < lines.length; j++) {
      const comparedLine = lines[j] as LineDiff;

      // skip already handled lines and the same symbol
      if ((comparedLine[0] != '+' && comparedLine[0] != '-') || comparedLine[0] == current[0]) continue;

      if (isStringSimilar(current[1] as string, comparedLine[1] as string)) {
        match = comparedLine;
        break;
      }
    }

    if (match) {
      // modified line representation - handled in ComparedText.vue
      const updatedCurrent: LineDiff = [
        '~',
        {
          __old: current[0] === '-' ? current[1] : match[1],
          __new: current[0] === '+' ? current[1] : match[1],
        }
      ]
      lines[i] = updatedCurrent;
      const index = (lines as LineDiff[]).indexOf(match);
      if (index !== -1) {
        lines.splice(index, 1);
      }
    }
  };
}

function convertToLeftRightChange(propertyDiffs: ChangeChunk[]): LeftRightChange[] {
  return propertyDiffs.map(changeChunk => {
    const changeType = getChangeType(changeChunk[0]);

    if (changeType === 'changed') {
      handleInnerListDiff(changeChunk[1].lines as LineDiff[]);

      return {
        changeType: 'changed',
        left: changeChunk[1].originalData ? changeChunk[1].originalData : EMPTY_DATA,
        right: changeChunk[1],
      }
    } else {
      const leftData = changeType === 'added' ? EMPTY_DATA : changeChunk[1].originalData!;
      const rightData = changeType === 'removed' ? EMPTY_DATA : changeChunk[1];

      return { changeType, left: leftData, right: rightData } as LeftRightChange;
    }
  });
}

function getAddedAndRemovedTitles(mergedData: MergedData): [string[], string[]] {
  const addedTitles: string[] = [];
  const removedTitles: string[] = [];

  // find titles that have only adds or removes
  for (const section in mergedData.properties) {
    for (const title in mergedData.properties[section]) {
      const titleItem = mergedData.properties[section][title];
      let titleChangeType = titleItem[0].changeType;
      if (titleChangeType !== 'added' && titleChangeType !== 'removed')
        continue;

      let isConsistent = true;

      for (const change of titleItem) {
        if (change.changeType !== titleChangeType) {
          // title is not strictly adds or removes only - skip it
          isConsistent = false;
          break;
        }
      }

      if (isConsistent) {
        if (titleChangeType === 'added') addedTitles.push(title);
        else removedTitles.push(title);
      }
    }
  }

  return [addedTitles, removedTitles];
}

function getFullTitleString(title: LeftRightChange[]): string {
  let result = '';

  for (const item of title) {
    // we assume string[] here,
    // because handleTitleNameChanges provides us 'added' and 'removed' items
    // only 'changed' can have LineDiffs
    let lines: string[] = [];

    if (item.changeType === 'added') lines = item.right.lines as string[];
    else if (item.changeType === 'removed') lines = getLinesChunk(item.left).lines as string[];

    result = result.concat(...lines);
  }

  return result;
}

function findTitleMatches(
  mergedData: MergedData,
  addedTitles: string[],
  removedTitles: string[]
): [LeftRightChange[], LeftRightChange[]][] {
  const titleMatches: [LeftRightChange[], LeftRightChange[]][] = [];

  // go through each title in properties
  for (const section1 in mergedData.properties) {
    for (const title1 in mergedData.properties[section1]) {
      if (addedTitles.includes(title1)) {
        let matchFound = false;
        // inner loop to find matches
        for (const section2 in mergedData.properties) {
          if (matchFound) break;
          for (const title2 in mergedData.properties[section2]) {
            if (matchFound) break;
            if (removedTitles.includes(title2)) {
              const addedTitle = mergedData.properties[section1][title1];
              const removedTitle = mergedData.properties[section2][title2];

              const fullStringAdded = getFullTitleString(addedTitle);
              const fullStringRemoved = getFullTitleString(removedTitle);

              // if titles in string format are similar it's a match
              if (isStringSimilar(fullStringAdded, fullStringRemoved)) {
                // save in mergedData.titleNameChanges
                mergedData.titleNameChanges.push({
                  newName: title2,
                  oldName: title1
                });

                titleMatches.push([removedTitle, addedTitle]);

                // we only leave one the 'removed' title
                delete mergedData.properties[section1][title1];
                matchFound = true;
              }
            }
          }
        }
      }
    }
  }

  return titleMatches;
}

function extractSortingString(item: LeftRightChange): string {
  if (item.changeType === 'removed') {
    // take from left
    const lines = getLinesChunk(item.left).lines;
    return lines.join(' ');
  } else {
    // take from right
    const lines = item.right.lines;

    if (!lines || !lines[0]) return '';

    if (typeof lines[0] === 'string') {
      // string[]
      return lines.join(' ');
    } else {
      // LineDiff[]
      return lines.map(i => {
        const content = i as LineDiff;
        if (typeof content[1] === 'string')
          return content[1];
        else
          return content[1]['__new'];
      }).join(' ');
    }
  }
}

function sortTitleAlphabetically(title: LeftRightChange[]): void {
  title.sort((a, b) => {
    const aString = extractSortingString(a);
    const bString = extractSortingString(b);

    return aString.localeCompare(bString);
  });
}

function handleTitleNameChanges(mergedData: MergedData): void {
  // if title changed name, then one title has only adds and another one has only removes
  const [addedTitles, removedTitles] = getAddedAndRemovedTitles(mergedData);

  const titleMatches = findTitleMatches(mergedData, addedTitles, removedTitles);

  // for each matched title
  for (let i = 0; i < titleMatches.length; i++) {
    const match = titleMatches[i];
    const removedTitle: LeftRightChange[] = match[0];
    const addedTitle: LeftRightChange[] = match[1];

    const finalTitle: LeftRightChange[] = [];

    // find matches between elements of the titles
    // go through elements of addedTitle
    for (let addedIndex = 0; addedIndex < addedTitle.length; addedIndex++) {
      const addedItem = addedTitle[addedIndex];
      let matchFound = false;

      // go through elements of removedTitle
      for (let removedIndex = 0; removedIndex < removedTitle.length; removedIndex++) {
        const removedItem = removedTitle[removedIndex];
        const addedItemLines = addedItem.right.lines;
        const removedItemLines = getLinesChunk(removedItem.left).lines;

        const addedItemAsString = (addedItemLines as string[]).join();
        const removedItemAsString = (removedItemLines as string[]).join();

        // compare element from addedTitle and element from removedTitle
        if (isStringSimilar(addedItemAsString, removedItemAsString)) {
          if (addedItemAsString === removedItemAsString) {
            //items are identical - add 'unchanged' LeftRightChange
            const removedLinesAsLineDiffs = removedItemLines as string[];

            const totalLines = [...removedLinesAsLineDiffs];
            finalTitle.push({
              changeType: 'unchanged',
              left: removedItem.left,
              right: {
                type: addedItem.right.type,
                originalData: removedItem.left,
                lines: totalLines
              } as LinesChunk
            } as LeftRightChange);
          } else {
            //items are similar but not identical
            // handle inner list differences and add 'changed' LeftRightChange
            const addedLinesAsLineDiffs = addedItemLines.map(l => ['+', l] as LineDiff);
            const removedLinesAsLineDiffs = removedItemLines.map(l => ['-', l] as LineDiff);

            const totalLines = [...addedLinesAsLineDiffs, ...removedLinesAsLineDiffs];

            handleInnerListDiff(totalLines);

            finalTitle.push({
              changeType: 'changed',
              left: removedItem.left,
              right: {
                type: addedItem.right.type,
                originalData: removedItem.left,
                lines: totalLines
              } as LinesChunk
            } as LeftRightChange);
          }

          // delete original item from title
          removedTitle.splice(removedIndex, 1);
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        finalTitle.push(addedItem);
      }
    }
    removedTitle.push(...finalTitle);
    sortTitleAlphabetically(removedTitle);
  }
}

export function mergeData(data1: Data, data2: Data): MergedData {
  const mergedData: MergedData = {
    headerLeft: createHeader(data1),
    headerRight: createHeader(data2),
    titleNameChanges: [],
    properties: {},
  };

  // create properties structure that holds
  // sections and titles from both data1 and data2
  let tempProperties: TempDataProperties = initializePropertiesStructure(data1, data2);

  // compare all titles in tempProperties
  for (const section in tempProperties) {
    for (const title in tempProperties[section]) {
      // get LinesChunk array from section's title
      const titleAsLines1 = populateTitleLines(data1, section, title, true);
      const titleAsLines2 = populateTitleLines(data2, section, title, false);

      // get ChangeChunks by comparing the two LinesChunk arrays
      let titleDiff = computeDiffs(titleAsLines1, titleAsLines2);

      tempProperties[section][title] = titleDiff;
    }
  }

  // convert the structure to left/right data
  for (const section in tempProperties) {
    for (const title in tempProperties[section]) {
      const chunkData = tempProperties[section][title];

      // we need to create sections in mergedData before adding titles to them
      if (!mergedData.properties[section])
        mergedData.properties[section] = {};

      mergedData.properties[section][title] = convertToLeftRightChange(chunkData);
    }
  }

  handleTitleNameChanges(mergedData);

  return mergedData;
}
