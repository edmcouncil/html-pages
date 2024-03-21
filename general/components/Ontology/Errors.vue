<template>
  <div class="container px-0">
    <div v-if="error.search" class="row">
      <div class="col-12">
        <div class="ontology-alert red" role="alert">
          <strong>Error!</strong> We had trouble connecting with our search
          server, please try later.
          <div class="dismiss-alert-button" @click="error.search = false"></div>
        </div>
      </div>
    </div>

    <div v-if="error.entityData" class="row">
      <div class="col-12">
        <div class="ontology-alert red" role="alert">
          <strong>Error!</strong> Cannot fetch data, please try later.
          <div
            class="dismiss-alert-button"
            @click="error.entityData = false"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="error.versions" class="row">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Versions could not be loaded.
          <div
            class="dismiss-alert-button"
            @click="error.versions = false"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="error.modules" class="row">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Modules could not be loaded.
          <div
            class="dismiss-alert-button"
            @click="error.modules = false"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="error.properties" class="row">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Search properties could not be loaded.
          <div
            class="dismiss-alert-button"
            @click="error.properties = false"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Errors',
  props: ['error'],
  computed: {},
  methods: {}
};
</script>
