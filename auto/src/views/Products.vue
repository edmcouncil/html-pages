<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>Products</span>
                </h1>

                <h3 v-if="serializations">Serializations of AUTO OWL</h3>
                
                <div v-if="serializations" class="table-responsive">
                  <table class="table table-style-striped">
                    <tr>
                      <th>FIBO OWL</th>
                      <th>RDF-XML</th>
                      <th>Turtle</th>
                      <th>JSON-LD</th>
                      <th>N-Quads/N-Triples</th>
                    </tr>

                    <tr v-for="element in serializations" :key="element.name">
                      <td>
                        {{element.name}}
                        <span v-if="element.link && element.link.name">
                          (
                          <a
                            :href="timestamped(element.link, timestamp)"
                            v-on:click="outboundLinkClick(element.link.name)"
                          >{{element.link.name}}</a>)
                        </span>
                      </td>
                      <td>
                        <a
                          v-for="xmlLink in element.xml"
                          :key="xmlLink.name"
                          :href="timestamped(xmlLink, timestamp)"
                          v-on:click="outboundLinkClick(xmlLink.name)"
                          class="inline"
                        >{{xmlLink.name}}</a>
                        <span v-if="!element.xml || element.xml.length === 0">N/A</span>
                      </td>
                      <td>
                        <a
                          v-for="xmlLink in element.ttl"
                          :key="xmlLink.name"
                          :href="timestamped(xmlLink, timestamp)"
                          v-on:click="outboundLinkClick(xmlLink.name)"
                          class="inline"
                        >{{xmlLink.name}}</a>
                        <span v-if="!element.ttl || element.ttl.length === 0">N/A</span>
                      </td>
                      <td>
                        <a
                          v-for="xmlLink in element.json"
                          :key="xmlLink.name"
                          :href="timestamped(xmlLink, timestamp)"
                          v-on:click="outboundLinkClick(xmlLink.name)"
                          class="inline"
                        >{{xmlLink.name}}</a>
                        <span v-if="!element.json || element.json.length === 0">N/A</span>
                      </td>
                      <td>
                        <a
                          v-for="xmlLink in element.nq"
                          :key="xmlLink.name"
                          :href="timestamped(xmlLink, timestamp)"
                          v-on:click="outboundLinkClick(xmlLink.name)"
                          class="inline"
                        >{{xmlLink.name}}</a>
                        <span v-if="!element.nq || element.nq.length === 0">N/A</span>
                      </td>
                    </tr>
                  </table>
                </div>


                <h3>Deliverables </h3>


                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Link (if available)</th>
                        </tr>
                        <tr>
                            <td><strong>D01</strong></td>
                            <td>Auto schema.org ontology: A schema.org-compliant fundamental ontology for vehicle information in e-commerce</td>
                            <td>Released</td>
                            <!--<td><a href="../ontology?query=https%3A%2F%2Fspec.edmcouncil.org%2Fauto%2Fontology%2FEC%2FSchemaAutomotive%2FAutoSchemaOrg%2F">Auto Viewer</a></td>-->
                            <td><router-link :to="{ path: router('ontology'), query: { query: encodeURI('https://spec.edmcouncil.org/auto/ontology/EC/AutoSchemaOrg/')}}">Auto Viewer</router-link></td>

                        </tr>
                        <tr>
                            <td><strong>D02</strong></td>
                            <td>AUTO Compatibility: A schema.org-compliant ontology for vehicle configuration information.</td>
                            <td>Planned</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td><strong>D03</strong></td>
                            <td>AUTO Vehicle Lifetime Information: A schema.org-compliant ontology for vehicle life-time information.</td>
                            <td>Planned</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td><strong>D04</strong></td>
                            <td>AUTO Vehicle Data Backbone: An ontology for information interchange within a vehicle, between vehicles, and between vehicles and their external entities.</td>
                            <td>Planned</td>
                            <td>N/A</td>
                        </tr>
                    </tbody>
                </table>





            </article>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import helpers from '../store/helpers.js';
    import {
        outboundClick, outboundLinkClick
    }
    from '../helpers/ga';

    export default {
        extends: helpers,
        name: 'deliverables ',
        components: {},
        computed: {
          ...mapState('OWL', {
            serializations: state => state.serializations,
          }),
          ...mapState('helpers', {
            timestamp: state => state.timestamp,
          }),
        },
        methods: {
          timestamped(link, timestamp) {
            return typeof link.PRODUCT === 'string'
              ? this.hrefP(link.name, link.PRODUCT)
              : typeof link.product === 'string'
                ? this.hrefD(link.name, link.product)
                : eval(`\`${link.url}\``);
          },
          outboundClick,
          outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>

</style>
