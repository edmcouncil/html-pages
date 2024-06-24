<template>
  <BsModal
    id="register-modal"
    :open="modalOpen"
    modal-class="register-modal"
    footer-class="d-none"
    :can-escape="true"
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
        ></div>
        <h5 class="modal-title">Register</h5>
      </div>
      <div
        type="button"
        class="close-btn"
        data-dismiss="modal"
        aria-label="Close"
        @click="hideModal"
      ></div>
    </template>

    <div v-if="!successPage" class="modal-card">
      <div v-if="serverError" class="modal-error mb-2" role="alert">
        {{ serverError }}
      </div>
      <form
        id="register-form"
        class="modal-form"
        autocomplete="off"
        @submit.prevent="handleSubmit"
      >
        <CustomInput
          v-for="field in formFields.filter((f) => f.type !== 'checkbox')"
          :id="`${field.name}Register`"
          :key="field.name"
          v-bind="field"
          :model-value="form[field.name] as string"
          :error="shouldShowError(field.name) ? errors[field.name] : null"
          @update:model-value="(value) => updateField(field.name, value)"
          @blur="touchField(field.name)"
        />
        <div class="form-check pb-0 pt-2">
          <input
            id="privacyPolicyCheckbox"
            :checked="!!form.privacyPolicy"
            class="form-check-input"
            type="checkbox"
            name="privacyPolicyCheckbox"
            @change="handlePrivacyPolicyChange"
          />
          <label class="form-check-label" for="privacyPolicyCheckbox">
            I agree to the privacy policy.
          </label>
        </div>
        <div
          v-if="shouldShowError('privacyPolicy')"
          class="invalid-feedback d-block"
        >
          {{ errors.privacyPolicy }}
        </div>
        <button
          type="submit"
          class="btn normal-button mt-5"
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
    <div v-else class="modal-card">
      <p class="small">
        You created an account. A verification e-mail has been sent to the
        provided e-mail address. Please check your inbox and follow the
        instructions provided to verify your e-mail address.
      </p>
    </div>
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
import {
  emailRules,
  usernameRules,
  passwordRules
} from '~/helpers/inputValidation';

const authModalStore = useAuthModalStore();
const runtimeConfig = useRuntimeConfig();

const successPage = ref(false);
const serverError = ref<string | null>(null);
const isSubmitting = ref(false);

const formFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    autocomplete: 'email',
    required: true,
    rules: emailRules
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    autocomplete: 'username',
    required: true,
    rules: usernameRules
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    autocomplete: 'new-password',
    required: true,
    rules: passwordRules
  },
  {
    name: 'repeatPassword',
    label: 'Repeat password',
    type: 'password',
    autocomplete: 'new-password',
    required: true,
    rules: []
  },
  {
    name: 'privacyPolicy',
    label: 'I agree to the privacy policy',
    type: 'checkbox',
    required: true,
    rules: [
      {
        validate: (value) => value === 'true',
        message: 'You must agree to the privacy policy'
      }
    ]
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

const handlePrivacyPolicyChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  updateField('privacyPolicy', target.checked);
  touchField('privacyPolicy');
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

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const handleSubmit = async () => {
  validateAllFields();

  if (!isFormValid.value) return;

  isSubmitting.value = true;
  serverError.value = null;

  try {
    await $fetch(`${baseURL()}/api/auth/local/register`, {
      method: 'POST',
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password
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
      serverError.value = `Can't register. ${message}.`;
    } else {
      serverError.value = "Can't register. Please fill the form and try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
};

const modalOpen = computed(() => authModalStore.authModal === 'register');
</script>
