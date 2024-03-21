<template>
  <div :id="correctId" ref="carouselElement" class="carousel slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BsCarousel',
  props: {
    open: Boolean,
    id: String
  },
  emits: ['shown', 'hidden'],
  data() {
    return {
      instance: null
    };
  },
  computed: {
    correctId() {
      if (this.id) return this.id.replaceAll(' ', '-') + '-carousel';
      else return Math.random().toString(16).slice(2);
    }
  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await nextTick();
        this.instance.show();
      } else {
        this.instance.hide();
      }
    }
  },
  mounted() {
    const { $bootstrap } = useNuxtApp();
    const element = this.$refs.collapseElement;
    this.instance = new $bootstrap.Collapse(element);
    element.addEventListener('shown.bs.collapse', this.onShown);
    element.addEventListener('hidden.bs.collapse', this.onHidden);

    if (this.open) this.instance.show();
    else this.instance.hide();
  },
  beforeUnmount() {
    const element = this.$refs.collapseElement;
    element.removeEventListener('shown.bs.collapse', this.onShown);
    element.removeEventListener('hidden.bs.collapse', this.onHidden);
  },
  methods: {
    onShown() {
      this.$emit('shown');
      if (this.open) {
        this.instance.show();
      } else {
        this.instance.hide();
      }
    },
    onHidden() {
      this.$emit('hidden');
      if (this.open) {
        this.instance.show();
      } else {
        this.instance.hide();
      }
    }
  }
};
</script>
