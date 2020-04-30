<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>Documentation</span>
                </h1>


        <p class="text">
          Since April 2020, AUTO has been developed by an open community process. Official documentation of the AUTO project is located in its Github repository. The following files are important for any AUTO contributors:
        </p>

        <ul>
          <li>
                <a href="https://github.com/edmcouncil/auto/blob/master/LICENSE"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/LICENSE')">LICENSE</a>: AUTO is made available under MIT License.
          </li>
          <li>

                <a href="https://github.com/edmcouncil/auto/blob/master/DCO"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/DCO')">DCO</a>: We enforce the Developer Certificate of Origin (DCO) on Pull Requests. It requires all commit messages to contain the Signed-off-by line with an email address that matches the commit author. Contributors sign-off that they adhere to these requirements by adding a "Signed-off-by" line to commit messages.

          </li>
          <li>
                <a href="https://github.com/edmcouncil/auto/blob/master/README.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/README.md')">READ.md</a>: The README is the instruction manual. It explains how to get started.

          </li>
          <!--<li>
                <a href="https://github.com/edmcouncil/auto/blob/master/CONTRIBUTING.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/CONTRIBUTING.md')">CONTRIBUTING.md</a> and <a href="https://github.com/edmcouncil/auto/blob/master/ONTOLOGY_GUIDE.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/ONTOLOGY_GUIDE.md')">ONTOLOGY_GUIDE.md</a>: These contributing documents explain what types of contributions are needed and how the process works. 

          </li> -->
          <li>

                <a href="https://github.com/edmcouncil/auto/blob/master/CODE_OF_CONDUCT.md"
                    v-on:click="outboundClick('https://github.com/edmcouncil/auto/blob/master/CODE_OF_CONDUCT.md')">CODE_OF_CONDUCT.md</a>: The code of conduct sets ground rules for participants’ behavior associated and helps to facilitate a friendly, welcoming environment. The AUTO project adheres to the Contributor Covenant code of conduct. By participating, you are expected to uphold this code.
          </li>
        </ul>


<p>We start building the automotive ontology from tranlating the auto extenion of schema.org into OWL. </p>



            
<h4><span>From auto.schema.org to the automotive ontology</span></h4>

<ul>
    <li>rdfs:subClassOf is used in schema.org.</li>
    <li>schema:domainIncludes and schema:rangeIncludes values are converted into rdfs:domain and rdfs:range values using owl:unionOf to capture the multiplicity of values.</li>
    <!--<li>https://schema.org/Date has been translated into xsd:dateTime.</li>
    <li>https://schema.org/Text has been translated into xsd:string</li>
    <li>schema:Number has been translated into xsd:decimal</li>
    <li>schema:URL has been translated into xsd:anyURI</li>
    <li>Schema properties that have classes and data types in the range have been duplicated into two see e.g. bodyType and bodyType2.</li>-->
    <li>schema.org does not have restrictions. "min 0" restricitons involving realtion R have been added to a class C, if C was a domain of R.</li>
</ul>




            </article>
        </main>
    </div>
</template>

<script>
    import helpers from '../store/helpers.js';
    import {
        outboundClick, outboundLinkClick
    }
    from '../helpers/ga';

    export default {
        extends: helpers,
        name: 'documentation',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>

</style>