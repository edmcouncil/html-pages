<template>
  <div class="custom-input-container">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :value="modelValue"
      :autocomplete="autocomplete"
      :type="type"
      class="form-control"
      :required="required"
      :class="{ 'is-invalid': error }"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
    />
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  modelValue: string;
  label?: string;
  autocomplete?: string;
  type?: string;
  required?: boolean;
  error?: string | null;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur'): void;
}>();
</script>

<style lang="scss">
.custom-input-container {
  margin-bottom: 15px;
}

.form-label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
}

.form-control {
  padding: 5px 10px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  background-color: white;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.6);

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  &:focus:not(.is-invalid) {
    border-color: rgba(0, 0, 0, 0.8);
    outline: none;
    box-shadow: none;
  }

  &.is-invalid {
    border-color: #dc3545;
  }
}

.invalid-feedback {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}
</style>
