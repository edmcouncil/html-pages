export default {
  state: {
    OWLSerializations: [
      {
        name: 'IDMP Production (zip)',
        xml: [{
          name: 'prod.rdf.zip',
          PRODUCT: 'ontology',
        }],
        ttl: [{
          name: 'prod.ttl.zip',
          PRODUCT: 'ontology',
        }],
        json: [{
          name: 'prod.jsonld.zip',
          PRODUCT: 'ontology',
        }],
        nq: [],
      },
      {
        name: 'IDMP Development (zip)',
        xml: [{
          name: 'dev.rdf.zip',
          product: 'ontology',
        }],
        ttl: [{
          name: 'dev.ttl.zip',
          product: 'ontology',
        }],
        json: [{
          name: 'dev.jsonld.zip',
          product: 'ontology',
        }],
        nq: [],
      },
      {
        name: 'IDMP Production',
        xml: [{
          name: 'LoadIDMPProd.rdf',
          PRODUCT: 'ontology',
        }],
        ttl: [{
          name: 'LoadIDMPProd.ttl',
          PRODUCT: 'ontology',
        }],
        json: [{
          name: 'LoadIDMPProd.jsonld',
          PRODUCT: 'ontology',
        }],
        nq: [
        ],
      },
      {
        name: 'IDMP Development',
        xml: [{
          name: 'LoadIDMPDev.rdf',
          product: 'ontology',
        }],
        ttl: [{
          name: 'LoadIDMPDev.ttl',
          product: 'ontology',
        }],
        json: [{
          name: 'LoadIDMPDev.jsonld',
          product: 'ontology',
        }],
        nq: [
        ],
      },
      {
        name: 'IDMP Production Quickstart',
        ttl: [{
          name: 'prod.idmp-quickstart.ttl.zip',
          PRODUCT: 'ontology',
        },
        {
          name: 'prod.idmp-quickstart.ttl',
          PRODUCT: 'ontology',
        },
      ],
        nq: [
          {
            name: 'prod.idmp-quickstart.nt.zip',
            PRODUCT: 'ontology',
          },
          {
            name: 'prod.idmp-quickstart.nt',
            PRODUCT: 'ontology',
          },
        ],
      },
      {
        name: 'IDMP Development Quickstart',
        ttl: [{
          name: 'dev.idmp-quickstart.ttl.zip',
          product: 'ontology',
        },
        {
          name: 'dev.idmp-quickstart.ttl',
          product: 'ontology',
        }],
        nq: [
          {
            name: 'dev.idmp-quickstart.nt.zip',
            product: 'ontology',
          },
          {
            name: 'dev.idmp-quickstart.nt',
            product: 'ontology',
          },
        ],
      },
    ],
  },
  mutations: {

  },
  actions: {

  },
  namespaced: true,
};
