<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>Applications</span>
                </h1>

                
<p>The Automotive Ontology can be used in the following applications:</p>
<ol>
    <li>Creation of Knowledge Graphs describing a carmaker offer</li>
    <li>Ranking an automotive website higher and better on Google and other search engines</li>
    <li>Add new kind of analytics to the automotive websites</li>
    <li>Enhance lead collection and convergence on the automotive websites</li>
    <li>Build innovative conceptual search on the automotive websites</li>
</ol>

  

				
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
        name: 'forum',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>

</style>