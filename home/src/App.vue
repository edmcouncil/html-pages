<template>
  <div id="app">
    <HeaderComponent @navigationEvent="navigationHandler"></HeaderComponent>
    <router-view ref="routerView" />
    <FooterComponent></FooterComponent>
  </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  methods: {
    navigationHandler(to) {
      if (this.$refs.routerView.navigationHandler) {
        this.$refs.routerView.navigationHandler(to);
      }
    }
  }
};
</script>

<style lang="scss">
form {
  width: 500px;
  background: white;
  padding: 20px 25px;
  margin: auto;
  margin-top: 30px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  clear: both;

  input,
  textarea {
    font: inherit;
    padding: 5px 5px;
    width: 100%;
    margin-top: 3px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  button {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 8px 35px;
    font-size: 12px;
    background: map-get($colors-map, 'grey');
    color: white;
  }
  label {
    color: map-get($colors-map, 'grey');
    font-size: 11px;
    margin-bottom: 2px;
    display: block;
  }
}

hr {
  border-width: 1px;
  border-color: map-get($colors-map, 'white');
  margin-top: 20px;
  margin-bottom: 20px;
}
.fill-image-site {
  width: 324px;
  height: 388px;
  background: url('./assets/img/fill.png') no-repeat;
  position: absolute;
  top: 40%;
  left: 10%;
}
.fill-image-auto {
  width: 324px;
  height: 388px;
  background: url('./assets/img/fill.png') no-repeat;
  position: absolute;
  top: 40%;
  left: 10%;
  opacity: 0.01;
}

@media (max-width: 1559px) {
  .fill-image-auto {
    display: none;
  }
}
@media (max-width: 575px) {
  li {
    padding-left: 0;
  }
  body {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>
