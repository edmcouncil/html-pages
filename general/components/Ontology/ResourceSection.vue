<template>
  <div class="card">
    <div class="card-body">
      <h5
        class="card-title section-title"
        :class="{'section-collapse': collapsed}"
        @click="toggleCollapsed"
      >
        {{ sectionName }}
      </h5>
      <div class="card-content">
        <dl
          class="row"
          v-for="(property, name) in section"
          :key="name"
        >
          <dt class="col-sm-12">{{ name }}</dt>
          <dd class="col-sm-12">
            <PropertiesList :list="property" :limit="5" :sectionId="'section_'+sectionName+'_'+sectionIndex+'_'+name" />
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import PropertiesList from './PropertiesList';

export default {
  components: {
    PropertiesList
  },
  name: 'ResourceSection',
  props: [
    'section',
    'sectionName',
    'sectionIndex',
  ],
  data() {
    return {
      collapsed: false,
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
};
</script>

