<template>
  <div>
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
    </label>
    <input
      :id="id"
      :name="id"
      :value="modelValue"
      :autocomplete="autocomplete"
      :type="type"
      class="form-control"
      :required="required"
      @input="handleInput($event)"
      @change="handleInput($event)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  autocomplete?: string;
  type: string;
  modelValue: string;
  label?: string;
  required?: boolean;
}

const { id, modelValue, label, type } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.value !== undefined) {
    emit('update:modelValue', target.value);
  }
};
</script>

<style lang="scss" scoped>
.form-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
}

.form-control {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Inter';
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
  background-color: white;
  margin-bottom: 15px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  &:focus {
    border-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
