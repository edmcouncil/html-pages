<template>
    <div class="container">
        <main>
            <article>
                <h1>
                    <span>Members</span>
                </h1>

                <h3>Organization</h3>


                <h2>General Chairs</h2>
                <ul>
                    <li>
                        <strong><a href="http://www.heppnetz.de">Martin Hepp</a></strong>, Hepp Research GmbH
                    </li>
                    <li>
                        <strong><a href="http://sopek.net/">Mirek Sopek</a></strong>, Makolab SA
                    </li>                  
                </ul>


                <h3>Members</h3>

                <p>
                    For the moment, we have a very informal notion of membership, based on the
                    <a href="https://plus.google.com/communities/104510681993581444051">group's Google Plus community</a>.
                    For a list of all members of, see
                    <a href="https://plus.google.com/communities/104510681993581444051/members">
                        https://plus.google.com/communities/104510681993581444051/members
                    </a>.
				</p>
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
        name: 'members',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>

</style>