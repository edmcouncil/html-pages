<template>
  <BsModal
    id="reset-modal"
    :open="modalOpen"
    modal-class="reset-modal"
    footer-class="d-none"
    @on-modal-hidden="hideModal"
  >
    <template #modal-header>
      <div class="left">
        <div
          type="button"
          class="return-btn"
          data-dismiss="modal"
          aria-label="Return"
          @click="handleReturn"
          @keydown="handleReturn"
        ></div>
        <h5 class="modal-title">Reset password</h5>
      </div>
      <div
        type="button"
        class="close-btn"
        data-dismiss="modal"
        aria-label="Close"
        @click="hideModal"
      ></div>
    </template>

    <Transition mode="out-in">
      <div v-if="!successPage" class="modal-card">
        <div v-if="serverError" class="modal-error mb-2">
          {{ serverError }}
        </div>
        <form
          id="reset-form"
          autocomplete="off"
          class="modal-form"
          @submit.prevent="resetPassword"
        >
          <p class="small mb-4">
            Enter your new password, then click "Save" to complete the update.
          </p>
          <CustomInput
            v-for="field in formFields"
            :id="`${field.name}Reset`"
            :key="field.name"
            v-bind="field"
            :model-value="form[field.name] as string"
            :error="shouldShowError(field.name) ? errors[field.name] : null"
            @update:model-value="(value) => updateField(field.name, value)"
            @blur="touchField(field.name)"
          />
          <button
            type="submit"
            class="btn normal-button mt-2"
            :disabled="!isFormValid || isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : 'Save' }}
          </button>
        </form>
      </div>
      <div v-else class="modal-card">
        <p class="small">The password has been updated successfully.</p>
      </div>
    </Transition>
  </BsModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';
import { useRoute, useRouter } from 'vue-router';
import {
  useFormValidation,
  type FieldConfig
} from '~/composables/useFormValidation';
import { passwordRules, type ValidationRule } from '~/helpers/inputValidation';

const authModalStore = useAuthModalStore();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const successPage = ref(false);
const serverError = ref<string | null>(null);
const isSubmitting = ref(false);
const code = ref<string>('');

const passwordMatchRule: ValidationRule = {
  validate: (value: string) => value === form.password,
  message: "Passwords don't match"
};

const formFields: FieldConfig[] = [
  {
    name: 'password',
    label: 'New password:',
    type: 'password',
    autocomplete: 'new-password',
    required: true,
    rules: passwordRules
  },
  {
    name: 'repeatPassword',
    label: 'Repeat new password:',
    type: 'password',
    autocomplete: 'new-password',
    required: true,
    rules: [passwordMatchRule]
  }
];

const {
  form,
  errors,
  updateField,
  touchField,
  shouldShowError,
  isFormValid,
  resetForm,
  validateAllFields
} = useFormValidation(formFields);

onMounted(() => {
  if (route.query.recoveryCode) {
    const { recoveryCode, ...restQuery } = route.query;
    code.value = recoveryCode as string;

    router.replace({ query: restQuery });

    authModalStore.openModal('reset');
  }
});

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const hideModal = () => {
  authModalStore.closeModal();
  resetForm();
  successPage.value = false;
  serverError.value = null;
};

const handleReturn = () => {
  hideModal();
  authModalStore.openModal('login');
};

const resetPassword = async () => {
  validateAllFields();

  if (!isFormValid.value) return;

  isSubmitting.value = true;
  serverError.value = null;

  try {
    await $fetch(`${baseURL()}/api/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify({
        code: code.value,
        password: form.password,
        passwordConfirmation: form.repeatPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    successPage.value = true;
  } catch (err: any) {
    let message: string | null = null;

    if (err.data && err.data.error) {
      message = err.data.error.message;
    } else if (err.message) {
      message = err.message;
    }

    if (message) {
      message = message.charAt(0).toUpperCase() + message.slice(1);
      serverError.value = `Can't reset password. ${message}.`;
    } else {
      serverError.value = "Can't reset password. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
};

const modalOpen = computed(() => authModalStore.authModal === 'reset');
</script>
