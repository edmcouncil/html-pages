<template>
  <article class="how-to-article">
    <section class="header-section">
      <h1>How to use {{ ontologyNameUppercase }} Viewer</h1>
      <p class="big muted">
        To start using {{ ontologyNameUppercase }} Viewer, search for
        interesting concepts by walking through the
        {{ ontologyNameUppercase }} directory structure on the left-hand side or
        use the full-text search function.
      </p>
    </section>

    <section v-if="hasVersions" class="blank versions-section">
      <img class="article-icon" src="@/assets/img/clock.svg" />
      <h2>{{ ontologyNameUppercase }} Versions</h2>
      <p class="big muted">
        {{ ontologyNameUppercase }} Viewer allows for browsing the past versions
        of {{ ontologyNameUppercase }}.
      </p>
      <p>
        It also helps developers to see the changes proposed to
        {{ ontologyNameUppercase }} in pull requests before their approval. To
        see the content of the past {{ ontologyNameUppercase }} releases or
        recent pull requests, choose them from the drop-down list.
      </p>
    </section>

    <section class="blank structure-section">
      <img class="article-icon" src="@/assets/img/directory.svg" />
      <h2>{{ ontologyNameUppercase }} structure</h2>
      <p class="big muted">
        {{ ontologyNameUppercase }} is a set of ontologies. It is organized in a
        hierarchical directory structure.
      </p>
      <p>
        Top-level directories are called domains; beneath that may be one or two
        levels of sub-domain and then modules and dozens of ontologies at the
        bottom level.
      </p>
    </section>

    <section class="blank maturity-section">
      <img class="article-icon" src="@/assets/img/maturity.svg" />
      <h2>{{ ontologyNameUppercase }} maturity levels</h2>
      <p class="big muted">
        Each {{ ontologyNameUppercase }} ontology has one of three levels of
        maturity.
      </p>
      <h3>Release</h3>
      <p>
        Release ontologies are ones that are considered to be stable and mature
        from a development perspective.
      </p>
      <h3>Provisional</h3>
      <p>
        Provisional ontologies are ones that are considered to be under
        development.
      </p>
      <h3>Informative</h3>
      <p>
        Provisional ontologies are ones that are considered deprecated but
        included for informational purposes because they are referenced by some
        provisional concept.
      </p>
    </section>

    <section class="blank colours-section">
      <h2>Colours</h2>
      <p class="big muted">
        {{ ontologyNameUppercase }} Viewer uses colours to indicate the status
        of an ontology. Each ontology is either green or yellow.
      </p>
      <div class="color-container">
        <img
          class="article-icon--small"
          src="@/assets/icons/production-maturity.svg"
        />
        <p>
          The green square icon indicates that an ontology has a "release"
          maturity level. Domains or modules are green if they contain only
          green ontologies.
        </p>
      </div>

      <div class="color-container">
        <img
          class="article-icon--small"
          src="@/assets/icons/provisional-maturity.svg"
        />
        <p>
          Yellow square icon means that it's provisional. Domains or modules are
          yellow if they contain only yellow ontologies.
        </p>
      </div>

      <div class="color-container">
        <img
          class="article-icon--small"
          src="@/assets/icons/informative-maturity.svg"
        />
        <p>
          Orange circle icon means that it's informative. Domains or modules are
          orange if they contain only orange ontologies.
        </p>
      </div>

      <div class="color-container">
        <img
          class="article-icon--small"
          src="@/assets/icons/mixed-maturity.svg"
        />
        <p>
          Mixed, green-yellow-orange icon means domains or modules include both
          green, yellow and orange ontologies.
        </p>
      </div>
    </section>

    <section class="about-section">
      <p class="title muted">About {{ ontologyNameUppercase }} Viewer</p>
      <div class="spacing-30"></div>
      <p class="small">
        {{ ontologyNameUppercase }} Viewer is a JAVA application that is
        specifically designed to access both the
        {{ ontologyNameUppercase }} structure and its content in the easiest
        possible way. It can serve both as a web application and REST API.
        {{ ontologyNameUppercase }} Viewer is an open-source project that EDM
        Council hosts. See https://github.com/edmcouncil/onto-viewer for
        details.
      </p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'HowToUse',
  props: ['hasVersions', 'ontologyNameUppercase'],
};
</script>
