<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <Toast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :toast="toast"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();
</script>

<style scoped>
.toast-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 15px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  pointer-events: none;
}
</style>
