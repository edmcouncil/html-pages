<template>
  <button
    type="button"
    class="btn-compare-versions"
    :class="{ open }"
    @click="pressed()"
  >
    <span v-if="open" class="open-text">Cancel</span>
    <span v-else class="content-text">Compare versions</span>
  </button>
</template>

<script>
export default {
  name: 'CompareButton',
  data() {
    return {
      open: false,
    };
  },
  methods: {
    pressed() {
      this.open = !this.open;
      this.$emit('compareToggled', this.open);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-compare-versions {
  color: rgba(0, 0, 0, 0.8);
  border: none;
  background: none;
  font-size: 18px;
  line-height: 30px;
  padding: 0;
  user-select: none;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  &:active {
    color: rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: "";
    background-image: url("@/assets/icons/compare.svg");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;

    display: block;
    width: 24px;
    height: 30px;
    float: left;
    margin: 0 6px 0 0;
  }

  &:focus {
    outline: none;
    border: none;
  }
}
.btn-compare-versions.open {
  &::before {
    background-image: url("@/assets/icons/close.svg");
  }
}
</style>
