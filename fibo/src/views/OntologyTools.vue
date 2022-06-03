<template>
  <div class="container">
    <main>
      <ScrollTopHandler ref="scrollTopHandler" />
      <article class="full-page">
        <section>
          <h1>FIBO Ontology Tools</h1>

          <p>
            The FIBO ontology is best viewed using a dedicated ontology tool. We
            include instructions here for three popular tools,
            <a href="http://protege.stanford.edu/">Prot&eacute;g&eacute;</a>,
            <a
              href="http://www.topquadrant.com/tools/IDE-topbraid-composer-maestro-edition/"
              >TopBraid Composer</a
            >
            and
            <a
              href="https://www.nomagic.com/product-addons/magicdraw-addons/cameo-concept-modeler-plugin"
            >
              CCM (Cameo Concept Modeler)</a
            >.<br />
            For each of these tools, the <i>Production</i> and
            <i>Development</i> versions of FIBO are available. See below for
            detailed instructions for loading FIBO in each of these tools.
          </p>
          <p>
            <b>Note:</b> FIBO makes reference to
            <a href="http://www.omg.org/spec/LCC/">
              LCC (Languages, Countries and Codes)
            </a>
            from the OMG, which includes information about these things from
            other standards bodies. When you load FIBO, all these tools will
            find these files via follow-your-nose. If you cannot reach these
            files on the omg.org web servers for any reason, you will see load
            errors for the files it couldn't find. These can be safely ignored,
            but you will not have details of the Languages, Countries and Codes
            available in your model.
          </p>

          <h2>Prot&eacute;g&eacute;</h2>
          <div>
            Please use Prot&eacute;g&eacute; version 5.2 or higher.
            <p />
            <a href="http://protege.stanford.edu/">Prot&eacute;g&eacute;</a>
            prefers to manage files in
            <a href="https://www.w3.org/TR/rdf-syntax-grammar/">RDF/XML</a>
            format. Follow these instructions to download a zip file of FIBO in
            RDF/XML and load it into Prot&eacute;g&eacute;.
            <ol>
              <li>
                Download a zipped file of FIBO in RDF/XML format from the
                <a
                  href="https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl"
                  >FIBO products site.</a
                >
              </li>
              <li>
                Unzip this to your hard drive. This creates a single directory
                called
                <i>fibo</i>, with all of the FIBO ontologies in subdirectories.
              </li>
              <li>Open Prot&eacute;g&eacute;.</li>
              <li>
                Select File>Open, and navigate to the folder where you unzipped
                FIBO. Navigate three levels down to LoadFIBODev.rdf or
                LoadFiboProd.rdf (development and production, respectively), and
                select it.
              </li>
              <li>Protege will open all relevant FIBO files.</li>
            </ol>
          </div>
          <h2>TopBraid Composer</h2>
          <p>
            <a
              href="http://www.topquadrant.com/tools/IDE-topbraid-composer-maestro-edition/"
            >TopBraid Composer</a> prefers to manage files in
            <a href="https://www.w3.org/TR/turtle/">RDF Turtle</a> format.
            Follow these instructions to download a zip file of FIBO in Turtle
            and load it into TopBraid:
          </p>
          <ol>
            <li>
              Download a zipped file of FIBO in RDF/XML format from the
              <a
                href="https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl"
                >FIBO products site.</a
              >
            </li>
            <li>
              Unzip this on your hard drive. This creates a single directory
              called
              <i>fibo</i>, with all of the FIBO ontologies in subdirectories.
            </li>
            <li>
              Open TopBraid Composer. Create a project (File>New>Project) called
              <i>spec.edmcouncil.org</i>.
            </li>
            <li>
              Drag and drop the
              <i>fibo</i> directory from your filesystem onto the project
              <i>spec.edmcouncil.org</i>
              in the TopBraid Composer Navigator pane. If prompted, select "Copy
              files"
            </li>
            <li>
              Navigate through the fibo directory in the Navigator pane to
              LoadFIBODev.ttl or LoadFIBOProd.ttl files (development and
              production, respectively). Double-click on any of them to open all
              FIBO files.
            </li>
          </ol>
          <h2>No Magic CCM Cameo Concept Modeler</h2>
          <p>
            <a
              href="https://www.nomagic.com/product-addons/magicdraw-addons/cameo-concept-modeler-plugin"
            >
              CCM (Cameo Concept Modeler)
            </a>
            imports both the RDF/XML and Turtle TTL formats, and pulls the
            ontology into a 'UML-like' model of the ontology, which is then
            ready to use.
          </p>
          <ol>
            <li>
              Download a zipped file of FIBO in RDF/XML format from the
              <a
                href="https://edmconnect.edmcouncil.org/fibointerestgroup/fibo-products/fibo-owl"
                >FIBO products site.</a
              >
            </li>

            <li>
              Unzip this to your hard drive. This creates a single directory
              called fibo, with all of the FIBO ontologies in subdirectories.
            </li>
            <li>Open MagicDraw with the CCM plugin installed.</li>
            <li>
              In MagicDraw, create a new project: File/New Project. Select
              "Concept Modeling Project" as the project type. Select a name for
              the project and click "OK".
            </li>
            <li>
              Set the catalog file; from the
              <i>Options</i> menu, select <i>Project</i>. Navigate in the pop-up
              to <i>General/Concept Modeling</i> find the entry for "OWL Import
              Catalog", and click the three dots at the right to open a file
              navigator. Navigate to where you unzipped FIBO, Navigate down the
              tree until you can select the file catalog-v001.xml.
            </li>
            <li>
              Set the Project URI Construction Strategy to "303 URI": from the
              Options menu, select Project. Navigate in the pop-up to
              General/Concept Modeling, find the entry for "URI Construction
              Strategy", click the drop down menu at the right and select "303
              URI".
            </li>
            <li>
              Import the FIBO Master: File/Import From/OWL Ontology File, and
              navigate to the folder where you unzipped FIBO. Navigate to
              LoadFIBODev.rdf, or LoadFIBOProd.ttl, depending on your
              preference, and import it. MagicDraw will import all of FIBO
              ontologies contained in the LoadFIBO file.
            </li>
          </ol>
          <h2>Other available tools</h2>
          <p>
            The EDM Council is working in collaboration with many companies to
            offer open, easy access to FIBO content for discovery and analysis.
            Available now are:
          </p>
          <ul>
            <li>
              <a href="http://fibosearch.adaptive.com/">Adaptive</a>
            </li>
            <li>
              <a href="http://www.nomagic.com/magicfibo">NoMagic</a>
            </li>
            <li>
              <a href="http://www.stardog.com/">Stardog</a>
            </li>
            <li>
              <a href="http://data.world/">data.world</a>
            </li>
          </ul>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';
import helpers from "../store/helpers.js";
import { outboundClick } from "../helpers/ga";

export default {
  extends: helpers,
  name: "ontology-tools",
  components: { ScrollTopHandler },
  computed: {},
  methods: {
    outboundClick,
    scrollTop() {
      this.$refs.scrollTopHandler.scrollBackUp();
    },
  },
};
</script>

<style lang="scss" scoped></style>
