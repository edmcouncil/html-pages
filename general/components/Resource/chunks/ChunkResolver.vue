<template>
  <STRING v-if="value.type === 'STRING'" v-bind="value"></STRING>
  <AXIOM v-else-if="value.type === 'AXIOM'" v-bind="value"></AXIOM>
  <DIRECT_SUBCLASSES
    v-else-if="value.type === 'DIRECT_SUBCLASSES'"
    v-bind="value"
  ></DIRECT_SUBCLASSES>
  <MODULES v-else-if="value.type === 'MODULES'" v-bind="value"></MODULES>
  <IRI v-else-if="value.type === 'IRI'" v-bind="value"></IRI>
  <INSTANCES v-else-if="value.type === 'INSTANCES'" v-bind="value"></INSTANCES>
  <ANY_URI v-else-if="value.type === 'ANY_URI'" v-bind="value"></ANY_URI>
  <OWL_LABELED_MULTI_AXIOM
    v-else-if="value.type === 'OWL_LABELED_MULTI_AXIOM'"
    v-bind="value"
  ></OWL_LABELED_MULTI_AXIOM>
  <EMPTY v-else-if="value.type === 'EMPTY'" v-bind="value"></EMPTY>
  <OTHER v-else v-bind="value"></OTHER>
</template>

<script>
export default {
  name: 'ChunkResolver',
  props: ['value']
};
</script>
