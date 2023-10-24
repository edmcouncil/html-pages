<template>
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link" :class="{disabled: prevDisabled}" @click="prevHandler">‹</button>
    </li>
    <li class="page-item" v-if="showFirstPage">
      <button class="page-link" @click="selectPage(1)">1</button>
    </li>
    <li class="page-item ellipsis-left" v-if="showFirstPage">
      <button class="page-link disabled">...</button>
    </li>
    <li class="page-item" v-for="item of currentRange">
      <button class="page-link" :class="{active: modelValue === item}" @click="selectPage(item)">{{ item }}</button>
    </li>
    <li class="page-item ellipsis-right" v-if="showLastPage">
      <button class="page-link disabled">...</button>
    </li>
    <li class="page-item" v-if="showLastPage">
      <button class="page-link" @click="selectPage(totalPages)">{{ totalPages }}</button>
    </li>
    <li class="page-item">
      <button class="page-link" :class="{disabled: nextDisabled}" @click="nextHandler">›</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'bs-pagination',
  props: {
    modelValue: Number,
    perPage: Number,
    totalResults: Number,
  },
  emits: ['update:modelValue'],
  data() {
    return {
    };
  },
  methods: {
    selectPage(page) {
      this.$emit('update:modelValue', page);
      this.$emit('pageSelected');
    },
    nextHandler() {
      if (this.modelValue < this.totalPages) {
        this.$emit('update:modelValue', this.modelValue + 1);
        this.$emit('pageSelected');
      }
    },
    prevHandler() {
      if (this.modelValue > 1) {
        this.$emit('update:modelValue', this.modelValue - 1);
        this.$emit('pageSelected');
      }
    },
  },
  mounted() {


  },
  beforeUnmount() {

  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await nextTick();
        this.instance.show();
      } 
      else {
        this.instance.hide();
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.perPage);
    },
    showFirstPage() {
      return this.modelValue > 2;
    },
    showLastPage() {
      return this.modelValue < this.totalPages - 1;
    },
    currentRange() {
      let start = Math.max(this.modelValue - 1, 1);
      let end = Math.min(start + 2, this.totalPages);
      let range = [];
      for (let i = start; i <= end; i++) range.push(i);
      return range;
    },
    prevDisabled() {
      return this.modelValue <= 1;
    },
    nextDisabled() {
      return this.modelValue >= this.totalPages;
    },
  }
};
</script>

<style lang="scss">
.pagination {
  gap: 10px;
  justify-content: center;

  input {
    visibility: hidden;
    display: none;
  }

  .page-link {
    font-size: 18px;
    line-height: 18px;
    padding: 8px 12px;
    border-radius: 2px !important;
    user-select: none;
    background-color: transparent;
    border: 2px solid transparent;
    color: rgb(51, 51, 51);
    margin-left: 6px;
    transition: color 0.05s ease-in-out,
      background-color 0.05s ease-in-out, border-color 0.05s ease-in-out,
      box-shadow 0.05s ease-in-out;

    &:hover {
      background-color: map-get($colors-map, "black-20");
    }

    &:active {
      background-color: rgb(153, 153, 153);
      border: 2px solid rgb(153, 153, 153);
      color: rgb(51, 51, 51);
    }

    &:focus {
      box-shadow: none;
      outline: none;
    }

    &.active {
      background-color: rgb(51, 51, 51);
      border: 2px solid rgb(51, 51, 51);
      color: map-get($colors-map, "white");
    }

    &.active:active {
      background-color: map-get($colors-map, "black");
      border: 2px solid map-get($colors-map, "black");
      color: map-get($colors-map, "white");
    }

    &.disabled {
      background-color: transparent;
      border: 2px solid transparent;
      color: map-get($colors-map, "black-40");
    }

  }
}
</style>
