<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>Products</span>
                </h1>

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
                            <td><a href="../ontology?query=https%3A%2F%2Fspec.edmcouncil.org%2Fauto%2Fontology%2FEC%2FSchemaAutomotive%2FAutoSchemaOrg%2F">Auto Viewer</a></td>
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
    import helpers from '../store/helpers.js';
    import {
        outboundClick, outboundLinkClick
    }
    from '../helpers/ga';

    export default {
        extends: helpers,
        name: 'deliverables ',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>

</style>