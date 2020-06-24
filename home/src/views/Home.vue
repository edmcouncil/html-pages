<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>About</span>
                </h1>
<img style='width: 70%; object-fit: contain;  display: block;margin-left: auto;margin-right: auto;' src="../assets/img/Open Knowledge Graph logo.png" alt="Open FIBO" />


<h4>Why Knowledge Graphs</h4> 

<h5>This is the world we live in</h5>
<img style='width: 45%; object-fit: contain;  display: block;margin-left: auto;margin-right: auto;' src="../assets/img/60s.png" alt="Open FIBO" align="right" />

<p  class="text">We live in a hyper-connected world where an invisible bio-adversary can deliver a toxic shock to our global system with a largely unmeasurable impact on our Lives and Livelihood. As businesses strive to understand the Risk impact, assess their business resiliency, and pivot to growth, we are unable to  stitch together holistic, continuous, and contextually relevant Intelligence at a scale and speed we need to deal with the 'New Normal'.</p>

<p class="text">Per IDC estimation, in 2020, we’ll produce and consume more than 59 Zettabytes of data with 26% growth over the next 3 years, and a larger portion of this will be unstructured data. While we have made tremendous progress in applying machine intelligence to understand and derive Insights from our internal data, our data ecosystems remain disjointed with a significant lack of Trust. Our current architectures and technology are not able to connect and integrate internal and external data to enable Agile Intelligence we need. This further inhibits our ability to develop newer Products and Services,  maintain and grow a trusted relationship with our customers and partners while lowering our Risk profile.</p>

<h5>What we urgently need</h5>

<p class="text">What we urgently need is a new strategy, architecture, and solutions to develop Agile Intelligence. <b>Knowledge Graphs</b> are well suited to serve as the DNA (core?) of this new architecture. <b>Knowledge Graphs mimic how humans brain thinks – in terms of connections and relationships</b>. Adding advanced machine intelligence to the underlying Graph databases enables the Enterprise Digital Brain that can deliver the <b>enterprise-level Agile Intelligence</b>.</p>


<h4>Knowledge Graph Market Size and Growth Trajectory</h4>
<p class="text">Per Marketsandmarkets, the Knowledge Graph industry is poised to experience hyper-growth ($3B and 23% CAGR by 2023). Other industry analysts such as Gartner are bullish on the Knowledge Graph market trends. <b>Gartner lists Graph powered augmented analytics to be among the top 10 trends, with 30% of the global organizations making Graph powered decisions</b>.</p>

<h5>Knowledge Graphs use cases</h5>
<p class="text">Key use cases of Knowledge Graphs include 
<ul>
    <li>Risk</li>
    <li>Fraud</li>
    <li>Recommendation Engines</li>
    <li>IoT streaming analytics</li>
    <li>Supply-Chain analytics and</li>
    <li>Customer analysis</li>
</ul>
Industries such as Financial Services, Insurance, Life-Sciences, Healthcare are leading the way. Cloud-based Knowledge Graph applications Marketplaces are in development.</p>

<h4>EDMC Advocates Knowledge Graph Adoption</h4> 

<p class="text">In particular, the role of EDMC is to</p>
<ul>
    <li>Provide Knowledge Graph Awareness, Training and Certification Programs</li>
    <li>Support Shared Industry Ontologies as Accelerators to Business Solutions</li>
    <li>Support a Community of Knowledge Graph Advocates</li>
</ul>






                
                
                <div style="clear:both;"></div>
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
        name: 'home',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>
.automotive-logo{
  border: 1px solid map-get($colors-map, 'medium-grey');
  float: left;
  width: 400px;
  padding: 20px;
  margin: 0 40px 40px 0;
}
</style>