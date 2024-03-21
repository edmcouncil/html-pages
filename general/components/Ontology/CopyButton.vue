<template>
  <button
    type="button"
    class="btn-copy-url"
    :class="{ copied }"
    @click="pressed()"
  >
    <span v-if="copied" class="copied-text">Copied to clipboard!</span>
    <span class="content-text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'CopyButton',
  props: ['copyContent', 'text'],
  data() {
    return {
      copied: false
    };
  },
  methods: {
    async pressed() {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(this.copyContent);
      } else {
        const el = document.createElement('textarea');
        el.addEventListener('focusin', (e) => e.stopPropagation());
        el.value = this.copyContent;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }

      if (this.copied) {
        return;
      }

      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-text {
  opacity: 1;
  transition: opacity 0.5s;
}
.copied {
  color: map-get($colors-map, 'black-40') !important;

  .copied-text {
    animation: 0.3s copiedFadeOut 1.2s ease-in forwards;
  }
  .content-text {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s;
  }
}

@keyframes copiedFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes copiedFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
