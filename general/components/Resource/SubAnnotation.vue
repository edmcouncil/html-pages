<template>
  <div class="subannotation">
    <div class="subannotation__title">
      {{ title }}
    </div>
    <div class="subannotation__content">
      <ChunkResolver :value="subannotation" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'SubAnnotation',
    props: ['title', 'subannotation'],
};
</script>

<style lang="scss">
.subannotation {
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 10px;
  background: rgb(227, 227, 227);
  border: 2px solid rgb(227, 227, 227);
  padding: 10px 15px;
  border-radius: 4px;

  .subannotation__title {
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.01em;
    text-overflow: ellipsis;
    margin-right: 10px;
    color: rgb(102, 102, 102);
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
}
</style>
