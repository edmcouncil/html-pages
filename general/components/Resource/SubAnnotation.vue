<template>
  <div
    class="subannotation"
  >
    <div class="subannotation__title">
      {{ title }}
    </div>
    <div class="subannotation__content">
      <component
        :is="subannotation.type"
        :value="subannotation.value"
        :entityMaping="subannotation.entityMaping"
        v-bind="subannotation"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AXIOM: () => import(/* webpackChunkName: "AXIOM" */ '../chunks/AXIOM'),
    STRING: () => import(/* webpackChunkName: "STRING" */ '../chunks/STRING'),
    DIRECT_SUBCLASSES: () =>
      import(
        // eslint-disable-next-line comma-dangle
        /* webpackChunkName: "DIRECT_SUBCLASSES" */ '../chunks/DIRECT_SUBCLASSES'
      ),
    MODULES: () => import(/* webpackChunkName: "MODULES" */ '../chunks/MODULES'),
    IRI: () => import(/* webpackChunkName: "IRI" */ '../chunks/IRI'),
    INSTANCES: () =>
      import(
        // eslint-disable-next-line comma-dangle
        /* webpackChunkName: "INSTANCES" */ '../chunks/INSTANCES'
      ),
    ANY_URI: () => import(/* webpackChunkName: "ANY_URI" */ '../chunks/ANY_URI'),
  },
  name: 'SubAnnotation',
  props: ['title', 'subannotation']
};
</script>

<style lang="scss">
.subannotation {
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 10px;
  background: rgb(227, 227, 227);
  border: 2px solid rgb(227, 227, 227);
  padding: 10px 15px;
  border-radius: 4px;

  .subannotation__title {
    font-weight: 400;
    line-height: 18px;
    letter-spacing: .01em;
    text-overflow: ellipsis;
    margin-right: 10px;
    color: rgb(102,102,102);
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
}
</style>
