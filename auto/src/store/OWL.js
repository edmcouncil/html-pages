export default {
  state: {
    serializations: [
      // {
      //   name: 'AUTO (Production) (zip)',
      //   xml: [{
      //     name: 'prod.rdf.zip',
      //     PRODUCT: 'ontology',
      //   }],
      //   ttl: [{
      //     name: 'prod.ttl.zip',
      //     PRODUCT: 'ontology',
      //   }],
      //   json: [{
      //     name: 'prod.jsonld.zip',
      //     PRODUCT: 'ontology',
      //   }],
      //   nq: [
      //     {
      //       name: 'prod.auto.nq',
      //       PRODUCT: 'ontology',
      //     },
      //     {
      //       name: 'prod.auto.nq.zip',
      //       PRODUCT: 'ontology',
      //     },
      //   ],
      // },
      {
        name: 'AUTO Development (zip)',
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
        nq: [
          {
            name: 'dev.auto.nq',
            product: 'ontology',
          },
          {
            name: 'dev.auto.nq.zip',
            product: 'ontology',
          },
        ],
      },
      // {
      //   name: 'AUTO (Production)',
      //   link: {
      //     name: 'follow your nose starting point',
      //     url: 'http://patterns.dataincubator.org/book/follow-your-nose.html',
      //   },
      //   xml: [{
      //     name: 'LoadAUTOProd.rdf',
      //     PRODUCT: 'ontology',
      //   }],
      //   ttl: [{
      //     name: 'LoadAUTOProd.ttl',
      //     PRODUCT: 'ontology',
      //   }],
      //   json: [{
      //     name: 'LoadAUTOProd.jsonld',
      //     PRODUCT: 'ontology',
      //   }],
      //   nq: [
      //   ],
      // },
      {
        name: 'AUTO Development',
        link: {
          name: 'follow your nose starting point',
          url: 'http://patterns.dataincubator.org/book/follow-your-nose.html',
        },
        xml: [{
          name: 'LoadAUTODev.rdf',
          product: 'ontology',
        }],
        ttl: [{
          name: 'LoadAUTODev.ttl',
          product: 'ontology',
        }],
        json: [{
          name: 'LoadAUTODev.jsonld',
          product: 'ontology',
        }],
        nq: [
        ],
      },
      // {
      //   name: 'AUTO (Production) (Quickstart)',
      //   ttl: [{
      //     name: 'prod.auto-quickstart.ttl',
      //     PRODUCT: 'ontology',
      //   }],
      //   nq: [
      //     {
      //       name: 'prod.auto-quickstart.nt',
      //       PRODUCT: 'ontology',
      //     },
      //     {
      //       name: 'prod.auto-quickstart.nt.zip',
      //       PRODUCT: 'ontology',
      //     },
      //   ],
      // },
      {
        name: 'AUTO Development Quickstart',
        ttl: [{
          name: 'dev.auto-quickstart.ttl',
          product: 'ontology',
        }],
        nq: [
          {
            name: 'dev.auto-quickstart.nt',
            product: 'ontology',
          },
          {
            name: 'dev.auto-quickstart.nt.zip',
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
