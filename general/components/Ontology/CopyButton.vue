<template>
  <button
    v-clipboard="copyContent"
    type="button"
    class="btn-copy-url"
    :class="{ copied }"
    @click="pressed()"
  >
    {{ copied ? 'Copied to clipboard!' : text }}
  </button>
</template>

<script>
export default {
  name: "CopyButton",
  props: [ 'copyContent', 'text' ],
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    pressed() {
      if (this.copied) {
        return;
      }

      this.copied = true;
      setTimeout(()=>{
        this.copied = false;
      }, 1500);
    }
  },
}
</script>

<style lang="scss" scoped>
.copied {
  color: map-get($colors-map, "black-40")!important;
}
</style>
