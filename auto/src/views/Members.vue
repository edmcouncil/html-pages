<template>
  <div class="container">
    <main>
      <article class="full-page">
        <ScrollTopHandler ref="scrollTopHandler" />
        <section>
          <h1>Members</h1>

          <h3>Organization</h3>

          <h2>General Chairs</h2>
          <ul>
            <li>
              <strong><a href="http://www.heppnetz.de">Martin Hepp</a></strong
              >, Hepp Research GmbH
            </li>
            <li>
              <strong><a href="http://sopek.net/">Mirek Sopek</a></strong
              >, Makolab SA
            </li>
          </ul>

          <h3>Members</h3>

          <p>
            For the moment, we have a very informal notion of membership, based
            on the
            <a href="https://plus.google.com/communities/104510681993581444051"
              >group's Google Plus community</a
            >. For a list of all members of, see
            <a
              href="https://plus.google.com/communities/104510681993581444051/members"
            >
              https://plus.google.com/communities/104510681993581444051/members </a
            >.
          </p>
        </section>
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
import ScrollTopHandler from '@/components/Articles/ScrollTopHandler.vue';

export default {
  extends: helpers,
  name: 'MembersView',
  components: { ScrollTopHandler },
  methods: {
      outboundClick,
      outboundLinkClick,
  },
};
</script>

<style lang="scss" scoped>
</style>
