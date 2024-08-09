<template>
  <div :class="['toast-notification', `toast-${toast.type}`, 'node-alert']">
    {{ toast.message }}
  </div>
</template>

<script setup>
const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.toast-notification {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  background-color: white;
  width: max-content;
  border-radius: 2px;
  padding: 5px 15px;
  margin-bottom: 10px;
  box-shadow: 0px 5px 20px rgba(7, 83, 149, 0.25);
}

.toast-default {
  background-color: #ffffff;
}
.toast-success {
  background-color: #e7ffed;
}
.toast-warning {
  background-color: #f2e5bf;
}
.toast-error {
  background-color: #ecdcdc;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.toast-enter-from,
.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
