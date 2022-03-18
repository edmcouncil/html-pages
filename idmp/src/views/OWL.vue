<template>
  <div class="container">
    <main>
      <article>
        <h1>
          <span>FIBO OWL</span>
        </h1>

        <p class="text">
          FIBO OWL is available in a number of RDF formats. These are available
          for offline use (i.e., download all of FIBO as a zip), or online use.
          Each FIBO ontology file is available for "follow your nose" treatment,
          a general description of which is available here.
        </p>

        <p class="text">FIBO OWL is published in two releases:</p>
        <ul class="space-at-top">
          <li>
            <b>FIBO Production</b> is published at the end of each calendar
            quarter and has been vetted by SMEs and passed standard industry
            <i>hygiene</i> tests for OWL.
          </li>
          <li>
            <b>FIBO Development</b> is published in real-time as changes are
            incorporated by the FIBO Community and consists of a draft as
            well-vetted content.
          </li>
        </ul>

        <p>
          FIBO OWL is available for download in the EDMConnect FIBO Interest
          Community space.
        </p>

        <h3>
          <a
            href="https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl"
            v-on:click="
              outboundClick(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl'
              )
            "
            >Download FIBO OWL</a
          >
        </h3>


      </article>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
</style>
