<template>
  <BsModal
    id="recover-modal"
    :open="modalOpen"
    modal-class="recover-modal"
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
        <h5 class="modal-title">Recover password</h5>
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
      <div v-if="!sentPage" class="modal-card">
        <div v-if="serverError" class="modal-error mb-2">
          {{ serverError }}
        </div>
        <form
          id="recover-form"
          class="modal-form"
          @submit.prevent="sendRecoveryEmail"
        >
          <p class="small mb-4">
            Please enter your email address and click "Send e-mail".
          </p>
          <CustomInput
            v-for="field in formFields"
            :id="`${field.name}Recover`"
            :key="field.name"
            v-bind="field"
            :model-value="form[field.name] as string"
            :error="shouldShowError(field.name) ? errors[field.name] : null"
            @update:model-value="(value) => updateField(field.name, value)"
            @blur="touchField(field.name)"
          />
          <button
            type="submit"
            class="btn normal-button mt-4"
            :disabled="!isFormValid"
          >
            Send e-mail
          </button>
        </form>
      </div>
      <div v-else class="modal-card">
        <p class="small">
          A recovery e-mail has been sent to the provided e-mail address. Please
          check your inbox and follow the instructions provided to reset your
          password.
        </p>
      </div>
    </Transition>
  </BsModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';
import {
  useFormValidation,
  type FieldConfig
} from '~/composables/useFormValidation';
import { emailRules } from '~/helpers/inputValidation';

const authModalStore = useAuthModalStore();
const runtimeConfig = useRuntimeConfig();

const sentPage = ref(false);
const serverError = ref<string | null>(null);

const formFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    autocomplete: 'email',
    required: true,
    rules: emailRules
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

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const hideModal = () => {
  authModalStore.closeModal();
  resetForm();
  sentPage.value = false;
  serverError.value = null;
};

const handleReturn = () => {
  hideModal();
  authModalStore.openModal('login');
};

const sendRecoveryEmail = async () => {
  validateAllFields();

  if (!isFormValid.value) return;

  serverError.value = null;

  try {
    await $fetch(`${baseURL()}/api/auth/forgot-password`, {
      method: 'POST',
      body: {
        email: form.email
      }
    });
    sentPage.value = true;
  } catch (err: any) {
    serverError.value = 'An error occurred. Please try again.';
  }
};

const modalOpen = computed(() => authModalStore.authModal === 'recover');
</script>
