import { diff } from 'json-diff';
import { compareTwoStrings } from 'string-similarity';

const exactMatchTypes = [
  'AXIOM',
  'DIRECT_SUBCLASSES',
  'INSTANCES',
  'MODULES',
  'IRI',
  'OWL_LABELED_MULTI_AXIOM',
];

function getRenderedList(item) {
  if (item.type === 'AXIOM') {
    let lines = item.fullRenderedString.split('<br />');
    lines = lines.map((item) => item.trim());
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('- ')) lines[i] = lines[i].substring(2);
    }
    return { type: item.type, lines };
  }
  if (item.type === 'OWL_LABELED_MULTI_AXIOM') {
    const linesFromValue = item.value.map((item) => item.fullRenderedString);
    const lines = [item.entityLabel.label, ...linesFromValue];
    return { type: item.type, lines };
  }
  if (item.type === 'STRING') {
    const lines = item.value.split('\n');
    return { type: item.type, lines };
  }
  if (item.type === 'DIRECT_SUBCLASSES') {
    const lines = [item.value.label];
    return { type: item.type, lines };
  }
  if (item.type === 'INSTANCES') {
    const lines = [item.value.label];
    return { type: item.type, lines };
  }
  if (item.type === 'IRI') {
    const lines = [item.value.label];
    return { type: item.type, lines };
  }
  if (item.type === 'MODULES') {
    const lines = [item.value.label];
    return { type: item.type, lines };
  }
  const lines = [item.value];
  return { type: item.type, lines };
}

function isChangeItem(item) {
  return Array.isArray(item) && [' ', '+', '-', '~'].includes(item[0]);
}

function isStringSimilar(string1, string2) {
  return compareTwoStrings(string1, string2) > 0.6;
}

// handle line comparison of modified elements
function isMatchingLine(line1, line2) {
  if ((line2[0] != '+' && line2[0] != '-') || line1[0] == line2[0]) return false;
  if (isStringSimilar(line1[1], line2[1])) {
    return true;
  }

  return false;
}

export function mergeData(data1, data2) {
  const mergedData = {};

  let {
    label, iri, qName, maturityLevel, versionIri,
  } = data1;
  mergedData.headerLeft = {
    label,
    iri,
    qName,
    maturityLevel,
    versionIri,
  };

  ({
    label, iri, qName, maturityLevel, versionIri,
  } = data2);
  mergedData.headerRight = {
    label,
    iri,
    qName,
    maturityLevel,
    versionIri,
  };

  mergedData.properties = {};

  // build structure

  if (data1.properties) {
    for (const section in data1.properties) {
      mergedData.properties = {
        ...mergedData.properties,
        [section]: {},
      };
    }
  }

  if (data2.properties) {
    for (const section in data2.properties) {
      mergedData.properties = {
        ...mergedData.properties,
        [section]: {},
      };
    }
  }

  for (const section in mergedData.properties) {
    if (data1.properties?.[section]) {
      for (const title in data1.properties[section]) {
        mergedData.properties[section] = {
          ...mergedData.properties[section],
          [title]: [],
        };
      }
    }

    if (data2.properties?.[section]) {
      for (const title in data2.properties[section]) {
        mergedData.properties[section] = {
          ...mergedData.properties[section],
          [title]: [],
        };
      }
    }
  }

  // compare all titles between data1 and data2
  for (const section in mergedData.properties) {
    for (const title in mergedData.properties[section]) {
      const titleAsLines1 = [];
      const titleAsLines2 = [];
      if (data1.properties?.[section]?.[title]) {
        let index = 0;
        for (const chunk of data1.properties[section][title]) {
          titleAsLines1.push({
            ...getRenderedList(chunk),
            originalData: chunk,
          });
          // index original data
          chunk.id = index++;
        }
      }

      if (data2.properties?.[section]?.[title]) {
        for (const chunk of data2.properties[section][title]) {
          titleAsLines2.push(getRenderedList(chunk));
        }
      }

      // find matches before comparing
      const matches = [];
      const addedBuffer = [];
      const removedBuffer = [];
      for (let i = 0; i < titleAsLines1.length; i++) {
        const current = titleAsLines1[i];
        const currentType = current.type;
        if (!exactMatchTypes.includes(currentType)) continue;
        for (let j = 0; j < titleAsLines2.length; j++) {
          const comparedItem = titleAsLines2[j];
          if (current.lines[0] == comparedItem.lines[0]) {
            matches.push([current, comparedItem]);
            titleAsLines1.splice(i, 1);
            titleAsLines2.splice(j, 1);
            i--;
            break;
          }
        }
      }
      for (const removed of titleAsLines1) {
        if (exactMatchTypes.includes(removed.type)) removedBuffer.push(removed);
      }
      for (const added of titleAsLines2) {
        if (exactMatchTypes.includes(added.type)) addedBuffer.push(added);
      }

      let titleDiff = [];

      // if the title has matches or buffered adds/removes then add them, otherwise do regular diff
      if (
        matches.length > 0
        || removedBuffer.length > 0
        || addedBuffer.length > 0
      ) {
        for (const match of matches) {
          // check if the match has changes
          const linesDiff = diff(match[0].lines, match[1].lines, {
            full: true,
          });
          if (isChangeItem(linesDiff[0])) {
            titleDiff.push([
              '~',
              {
                lines: linesDiff,
                type: match[1].type,
              },
            ]);
          } else {
            titleDiff.push([
              ' ',
              {
                lines: linesDiff,
                type: match[1].type,
              },
            ]);
          }
        }
        for (const removed of removedBuffer) {
          titleDiff.push([
            '-',
            {
              lines: removed.lines,
              originalData: removed.originalData,
              type: removed.type,
            },
          ]);
        }
        for (const added of addedBuffer) {
          titleDiff.push([
            '+',
            {
              lines: added.lines,
              type: added.type,
            },
          ]);
        }
        titleDiff.sort((x, y) => {
          let comparedValue1;
          let comparedValue2;
          if (x[0] == '~') comparedValue1 = x[1].lines[0][1];
          else comparedValue1 = x[1].lines[0];

          if (y[0] == '~') comparedValue2 = y[1].lines[0][1];
          else comparedValue2 = y[1].lines[0];

          if (comparedValue1.toLowerCase() < comparedValue2.toLowerCase()) {
            return -1;
          }
          if (comparedValue1.toLowerCase() > comparedValue2.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        data1.properties?.[section]?.[title]?.sort((x, y) => {
          const comparedValue1 = getRenderedList(x).lines[0];
          const comparedValue2 = getRenderedList(y).lines[0];
          if (comparedValue1.toLowerCase() < comparedValue2.toLowerCase()) {
            return -1;
          }
          if (comparedValue1.toLowerCase() > comparedValue2.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        data2.properties?.[section]?.[title]?.sort((x, y) => {
          const comparedValue1 = getRenderedList(x).lines[0];
          const comparedValue2 = getRenderedList(y).lines[0];
          if (comparedValue1.toLowerCase() < comparedValue2.toLowerCase()) {
            return -1;
          }
          if (comparedValue1.toLowerCase() > comparedValue2.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      } else {
        titleDiff = diff(titleAsLines1, titleAsLines2, {
          full: true,
          excludeKeys: 'originalData',
        });
      }

      // apply original data by index
      if (data1.properties?.[section]?.[title]) {
        const itemsFromOriginal = titleDiff.filter((item) => {
          if (isChangeItem(item)) return [' ', '-', '~'].includes(item[0]);
          return true;
        });

        for (let i = 0; i < itemsFromOriginal.length; i++) {
          const originalChunk = data1.properties[section][title][i];

          if (isChangeItem(itemsFromOriginal[i])) {
            if (originalChunk) {
              itemsFromOriginal[i][1].originalData = originalChunk;
            } else {
              itemsFromOriginal[i][1].originalData = {
                type: 'EMPTY',
                value: '',
              };
            }
          } else if (originalChunk) {
            itemsFromOriginal[i].originalData = originalChunk;
          } else {
            itemsFromOriginal[i].originalData = {
              type: 'EMPTY',
              value: '',
            };
          }
        }
      }

      mergedData.properties[section][title] = titleDiff;
    }
  }

  // convert the structure to left/right data
  for (const section in mergedData.properties) {
    for (const title in mergedData.properties[section]) {
      for (const chunk in mergedData.properties[section][title]) {
        const chunkData = mergedData.properties[section][title][chunk];
        // check if it's a diff chunk
        if (isChangeItem(chunkData)) {
          if (chunkData[0] == ' ') {
            mergedData.properties[section][title][chunk] = {
              changeType: 'unchanged',
              left: chunkData[1].originalData,
              right: { type: chunkData[1].type, value: chunkData[1].lines },
            };
          } else if (chunkData[0] == '+') {
            mergedData.properties[section][title][chunk] = {
              changeType: 'added',
              left: {
                type: 'EMPTY',
                value: '',
              },
              right: { type: chunkData[1].type, value: chunkData[1].lines },
            };
          } else if (chunkData[0] == '-') {
            mergedData.properties[section][title][chunk] = {
              changeType: 'removed',
              left: chunkData[1].originalData,
              right: {
                type: 'EMPTY',
                value: '',
              },
            };
          } else if (chunkData[0] == '~') {
            // handle inner list diff
            const diffList = chunkData[1].lines;
            for (
              let i = diffList[0][1].type == 'AXIOM' ? 1 : 0;
              i < diffList.length;
              i++
            ) {
              const current = diffList[i];
              if (current[0] != '+' && current[0] != '-') continue;
              let match = null;
              for (let j = i + 1; j < diffList.length; j++) {
                const comparedLine = diffList[j];
                if (isMatchingLine(current, comparedLine)) {
                  match = comparedLine;
                  break;
                }
              }
              if (match) {
                current[0] = '~';
                current[1] = {
                  __old: current[1],
                  __new: match[1],
                };
                const index = diffList.indexOf(match);
                if (index !== -1) {
                  diffList.splice(index, 1);
                }
              }
            }
            // const testingDiff = chunkData[1].lines.map(item => item[1]);

            mergedData.properties[section][title][chunk] = {
              changeType: 'changed',
              left: chunkData[1].originalData,
              right: { type: chunkData[1].type, value: diffList },
            };
          }
        } else {
          mergedData.properties[section][title][chunk] = {
            left: chunkData.originalData,
            right: chunkData.originalData,
          };
        }
      }
    }
  }

  return mergedData;
}
