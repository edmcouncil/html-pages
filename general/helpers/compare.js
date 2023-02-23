export function mergeData(data1, data2) {
  let mergedData = {};

  let { label, iri, qName, maturityLevel } = data1;
  mergedData.headerLeft = {
    label,
    iri,
    qName,
    maturityLevel,
  };

  ({ label, iri, qName, maturityLevel } = data2);
  mergedData.headerRight = {
    label,
    iri,
    qName,
    maturityLevel,
  };

  mergedData.properties = {};

  if (data1.properties)
    for (const key in data1.properties) {
      mergedData.properties[key] = {};
    }

  if (data2.properties)
    for (const key in data2.properties) {
      mergedData.properties[key] = {};
    }

  // build structure

  for (const property in mergedData.properties) {
    if (data1.properties?.[property])
      for (const item in data1.properties[property])
        mergedData.properties[property] = {
          ...mergedData.properties[property],
          [item]: [],
        };

    if (data2.properties?.[property])
      for (const item in data2.properties[property])
        mergedData.properties[property] = {
          ...mergedData.properties[property],
          [item]: [],
        };
  }

  // fill the structure

  for (const property in mergedData.properties) {
    if (data1.properties?.[property]) {
      for (const title in data1.properties[property]) {
        for (let i = 0; i < data1.properties[property][title].length; i++) {
          const chunk = data1.properties[property][title][i];
          mergedData.properties[property][title].push({
            left: chunk,
            right: {
              type: "EMPTY",
              value: ""
            },
          });
        }
      }
    }

    if (data2.properties?.[property]) {
      for (const title in data2.properties[property]) {
        for (let i = 0; i < data2.properties[property][title].length; i++) {
          const chunk = data2.properties[property][title][i];
          if (mergedData.properties[property][title][i])
            mergedData.properties[property][title][i].right = chunk;
          else
            mergedData.properties[property][title].push({
              left: {
                type: "EMPTY",
                value: ""
              },
              right: chunk,
            });
        }
      }
    }
  }

  console.log(mergedData);

  return mergedData;
}
