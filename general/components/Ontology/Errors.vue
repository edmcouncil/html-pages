<template>
  <div class="container px-0">
    <div class="row" v-if="error.search">
      <div class="col-12">
        <div class="ontology-alert red" role="alert">
          <strong>Error!</strong> We had trouble connecting with our search
          server, please try later.
          <div @click="error.search = false" class="dismiss-alert-button"></div>
        </div>
      </div>
    </div>

    <div class="row" v-if="error.entityData">
      <div class="col-12">
        <div class="ontology-alert red" role="alert">
          <strong>Error!</strong> Cannot fetch data, please try later.
          <div
            @click="error.entityData = false"
            class="dismiss-alert-button"
          ></div>
        </div>
      </div>
    </div>

    <div class="row" v-if="error.versions">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Versions could not be loaded.
          <div
            @click="error.versions = false"
            class="dismiss-alert-button"
          ></div>
        </div>
      </div>
    </div>

    <div class="row" v-if="error.modules">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Modules could not be loaded.
          <div
            @click="error.modules = false"
            class="dismiss-alert-button"
          ></div>
        </div>
      </div>
    </div>

    <div class="row" v-if="error.properties">
      <div class="col-12">
        <div class="ontology-alert yellow" role="alert">
          <strong>Warning!</strong> Search properties could not be loaded.
          <div
            @click="error.properties = false"
            class="dismiss-alert-button"
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
  methods: {},
  computed: {},
};
</script>
