export default {
  state: {
    DataDictionarySerializations: [
      {
        name: 'Data Dictionary Production',
        csv: [{
          name: 'datadictionary-prod.csv',
          PRODUCT: 'datadictionary',
        }],
        xlsx: [{
          name: 'datadictionary-prod.xlsx',
          PRODUCT: 'datadictionary',
        }]
      },
      {
        name: 'Data Dictionary Development',
        csv: [{
          name: 'datadictionary-dev.csv',
          PRODUCT: 'datadictionary',
        }],
        xlsx: [{
          name: 'datadictionary-dev.xlsx',
          PRODUCT: 'datadictionary',
        }]
      },
    ],
  },
  mutations: {

  },
  actions: {

  },
  namespaced: true,
};
