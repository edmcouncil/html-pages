<template>
  <span
    v-if="isFlag"
    class="fi"
    :class="flagIconClass"
    :title="langName + ' - ISO: ' + iso"
  ></span>
  <span v-else v-once>@{{ iso }} </span>
</template>
<script>
import relation from '@/helpers/langFlagData';

export default {
  name: 'LangCodeFlags',
  props: {
    iso: { type: String, required: true },
    squared: { type: Boolean, default: false }
  },
  data() {
    const isFlag = relation[`${this.iso.toLowerCase()}Lang`] !== null;
    return {
      isFlag,
      flagIso: relation[`${this.iso.toLowerCase()}Lang`]?.flag,
      langName: relation[`${this.iso.toLowerCase()}Lang`]?.name
    };
  },
  computed: {
    flagIconClass() {
      return `${this.squared ? 'fis ' : ''}fi-${this.flagIso}`;
    }
  }
};
</script>
