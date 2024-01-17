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

function handleInnerListDiff(changeChunk: ChangeChunk): LeftRightChange {
  const lines = changeChunk[1].lines;

  // go through LineDiffs of the 'changed' chunk and try to find
  // similar lines that will be merged into modified line representation ('~')
  for (let i = 0; i < lines.length; i++) {
    // lines will be of 'LineDiff' type because changeType of the changeChunk here is 'changed'
    const current = lines[i] as LineDiff;

    // we only consider adds and removes
    if (current[0] != '+' && current[0] != '-') continue;
    let match: LineDiff | null = null;
    for (let j = i + 1; j < lines.length; j++) {
      const comparedLine = lines[j] as LineDiff;
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
          __old: current[1],
          __new: match[1],
        }
      ]
      lines[i] = updatedCurrent;
      const index = (lines as LineDiff[]).indexOf(match);
      if (index !== -1) {
        lines.splice(index, 1);
      }
    }
  }

  return {
    changeType: 'changed',
    left: changeChunk[1].originalData ? changeChunk[1].originalData : EMPTY_DATA,
    right: changeChunk[1],
  } as LeftRightChange;
}

function convertToLeftRightChange(propertyDiffs: ChangeChunk[]): LeftRightChange[] {
  return propertyDiffs.map(changeChunk => {
    const changeType = getChangeType(changeChunk[0]);

    if (changeType === 'changed') {
      return handleInnerListDiff(changeChunk);
    } else {
      const leftData = changeType === 'added' ? EMPTY_DATA : changeChunk[1].originalData!;
      const rightData = changeType === 'removed' ? EMPTY_DATA : changeChunk[1];

      return { changeType, left: leftData, right: rightData } as LeftRightChange;
    }
  });
}

export function mergeData(data1: Data, data2: Data): MergedData {
  const mergedData: MergedData = {
    headerLeft: createHeader(data1),
    headerRight: createHeader(data2),
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

  return mergedData;
}
