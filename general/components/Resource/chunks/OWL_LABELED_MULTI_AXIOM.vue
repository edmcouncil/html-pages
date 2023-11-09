<template>
  <div v-if="value.length < 6">
    <customLink
      :isDeprecated="`${entityLabel.deprecated}`"
      :name="entityLabel.label"
      :query="entityLabel.iri"
    />
    <ul v-if="value.length > 0">
      <li
        v-for="(item, index) in value"
        :key="`${identifier}_${item.fullRenderedString.replace(
          ' ',
          '-'
        )}_${index}`"
        :class="{ 'list-item-inferable': item.inferable }"
      >
        <AXIOM
          :value="item.value"
          :entityMaping="item.entityMaping"
          :inferable="item.inferable"
          :identifier="`${identifier}-${item.fullRenderedString.replace(
            ' ',
            '-'
          )}`"
        />
      </li>
    </ul>
  </div>
  <div v-else>
    <customLink
      :isDeprecated="`${entityLabel.deprecated}`"
      :name="entityLabel.label"
      :query="entityLabel.iri"
    />
    <ul v-if="value.length > 0">
      <li
        v-for="(item, index) in value.slice(0, 5)"
        :key="`${identifier}_${item.fullRenderedString.replace(
          ' ',
          '-'
        )}_${index}`"
        :class="{ 'list-item-inferable': item.inferable }"
      >
        <AXIOM
          :value="item.value"
          :entityMaping="item.entityMaping"
          :inferable="item.inferable"
          :identifier="`${identifier}-${item.fullRenderedString.replace(
            ' ',
            '-'
          )}`"
        />
      </li>
    </ul>
    <bs-collapse :id="identifier" :open="isMoreVisible">
      <transition name="list">
        <ul v-if="value.length > 0" ref="scrollTarget">
          <li
            v-for="(item, index) in value.slice(5)"
            :key="`${identifier}_${item.fullRenderedString.replace(
              ' ',
              '-'
            )}_${index}`"
            :class="{ 'list-item-inferable': item.inferable }"
          >
            <AXIOM
              :value="item.value"
              :entityMaping="item.entityMaping"
              :inferable="item.inferable"
              :identifier="`${identifier}-${item.fullRenderedString.replace(
                ' ',
                '-'
              )}`"
            />
          </li>
        </ul>
      </transition>
    </bs-collapse>

    <div v-if="!isMoreVisible" href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-more-btn">Show {{ value.length - 5 }} more</div>
    </div>
    <div v-else href="#" @click.prevent="toggleIsMoreVisible()">
      <div class="see-less-btn">Show less</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OWL_LABELED_MULTI_AXIOM',
  props: ['value', 'entityMaping', 'entityLabel', 'identifier'],
  data() {
    return {
      isShowMore: false,
      isMoreVisible: false,
    };
  },
  mounted() {
    if (this.value.length > 5) {
      this.isShowMore = true;
    }
  },
  methods: {
    toggleIsMoreVisible() {
      const element = this.$refs.scrollTarget;
      const topOffset = element.getBoundingClientRect().top;

      if (!this.isMoreVisible) {
        this.isMoreVisible = !this.isMoreVisible;
      } else if (topOffset < 0) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          this.isMoreVisible = !this.isMoreVisible;
        }, 500);
      } else {
        this.isMoreVisible = !this.isMoreVisible;
      }
    },
  },
};
</script>

<style lang="scss">
li.list-item-inferable::marker {
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
