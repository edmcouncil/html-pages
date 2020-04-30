<template>
  <div class="container">
    <main>
      <article>
        <h1>
          <span>Community</span>
        </h1>

        <p>The Automotive Ontology Working Group runs as <a href="https://www.w3.org/community/gao/" v-on:click="outboundLinkClick('https://www.w3.org/community/gao/')">W3C Community and Business Group</a>. It is an informal group of individuals and corporations who work hard to advance the use of shared conceptual structures in the form of Web ontologies for better data interoperability in the automotive industry, and this at Web scale. So far, the community helped to develop the automotive extension for schema.org (https://auto.schema.org/ ) so that automotive information is better understood by search engines. 

        <p>While the activity related to the future development of the Automotive Ontology is now endorsed and supported by <a href="https://edmcouncil.org/" v-on:click="outboundLinkClick('https://edmcouncil.org/')">EDM Council</a> the community remains in the <a href="https://www.w3.org/community/gao/" v-on:click="outboundLinkClick('https://www.w3.org/community/gao/')">W3C environment</a> as the appreciation of its foundational role in the Open Data community.</p>

        <p>The Automotive Ontology development space is organized on <a href="https://github.com/edmcouncil/auto" v-on:click="outboundLinkClick('https://github.com/edmcouncil/auto')">EDMC AUTO github space</a>.</p>
        
        <br />
      </article>
    </main>
  </div>
</template>


<script>
export default {
  name: 'contact',
  components: {},
};
</script>

<style lang="scss" scoped>
p {
    margin: 0 0 10px;
}
</style>
