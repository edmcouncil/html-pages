<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>About</span>
                </h1>
<img style='width: 70%; object-fit: contain;  display: block;margin-left: auto;margin-right: auto;' src="../assets/img/Open Knowledge Graph logo.png" alt="Open FIBO" />


<h4>Why Graphs</h4> 

<h5>This is the world we living</h5>
<p  class="text">We live in a hyper-connected world where an invisible bio-adversary can deliver a toxic shock to our global system with a largely unmeasurable impact on our Lives and Livelihood. As businesses strive to understand the Risk impact, assess their business resiliency and pivot to growth, we are struggling to stitch together holistic, continuous, and contextually relevant Intelligence at a scale and speed we need.</p>




<p class="text">Per IDC estimation, in 2020 we’ll produce and consume more than 59 Zettabytes of data with 26% growth over next 3 years and a larger portion of this will be un-structured data. While we have made tremendous progress in applying machine intelligence to understand and derive Insights from our internal data, our data ecosystems remain disjointed with significant lack of Trust. Our current architectures and technology are not able to connect and integrate internal and external data to enable Intelligence we need. This further inhibits our ability to develop newer Products and Services and maintain and grow a trusted relationship with our customers and partners while lowering our Risk profile.</p>

<h5>What we really need</h5>

<p class="text">What we really need is new strategy, architecture, and solutions to develop the Agile Intelligence we urgently need. <b>Knowledge Graphs</b> are well suited to serve as the DNA of this new architecture. Knowledge Graphs mimic how humans brain thinks – in terms of connections and relationships. Adding advanced machine intelligence to the underlying Graph databases enables the Enterprise Digital Brain.</p>


<h4>Market Size, Growth Trajectory</h4>
<p class="text">Per Marketsandmarkets, Knowledge Graph market is poised to experience hyper-growth ($3B and 23% CAGR by 2023). Other industry analysts such as Gartner are bullish on the Knowledge Graph market trends. <b>Gartner lists Graph powered augmented analytics to be among top 10 trends with 30% of the global organizations making Graph powered decisions</b>. </p>

<h5>Key use cases of Knowledge Graphs</h5>
<p class="text">Key use cases of Knowledge Graphs range from Risk, Fraud, Recommendation Engines, Supply-Chain analytics, Customer analysis. Industries such as Financial Services, Insurance, Life-Sciences, Healthcare are leading the way. Cloud based Knowledge Graph applications Marketplaces are in development.</p>

<h4>EDMC Advocates Knowledge Graph Adoption</h4> 

<p class="text">In particula, the role of EDMC is to</p>
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