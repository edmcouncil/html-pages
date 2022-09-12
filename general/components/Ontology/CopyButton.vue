<template>
  <button
    v-clipboard="copyContent"
    type="button"
    class="btn-copy-url"
    :class="{ copied }"
    @click="pressed()"
  >
    <!-- {{ copied ? 'Copied to clipboard!' : text }} -->
    <span v-if="copied" class="copied-text">Copied to clipboard!</span>
    <span v-else class="content-text">{{ text }}</span>
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
.content-text {
  opacity: 1;
  transition: opacity 0.3s;
}
.copied {
  color: map-get($colors-map, "black-40")!important;

  .copied-text {
    transition: opacity 0.3s 1.2s;
    opacity: 0;
  }
  .content-text {
    opacity: 0;
  }
}
</style>
