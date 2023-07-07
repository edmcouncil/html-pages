<template>
  <a :href="value" target="_blank">{{ value }}</a>
</template>

<script>
export default {
  name: 'ANY_URI',
  props: ['value'],
};
</script>
