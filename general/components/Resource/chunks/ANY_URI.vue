<template>
  <a :href="value" target="_blank">{{ value }}</a>
</template>

<script>
export default {
  name: 'ANYURI',
  props: ['value']
};
</script>
