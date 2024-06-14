<template>
  <BsModal
    id="recover-modal"
    :open="authModalStore.authModal === 'recover'"
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
      <div v-if="!codePage" class="modal-card">
        <div v-if="error" class="modal-error mb-2">
          {{ error }}
        </div>
        <form
          id="recover-form"
          class="modal-form"
          @submit.prevent="sendRecoveryEmail"
        >
          <p class="small mb-4">
            Please enter your email address below and click "Send Email". You
            will receive an email with instructions to reset your password.
          </p>
          <CustomInput
            id="emailRecover"
            v-model="email"
            label="E-mail"
            type="email"
            required
          />
          <a
            class="muted-link"
            href="#"
            role="button"
            tabindex="0"
            @click.prevent="
              () => {
                codePage = true;
              }
            "
          >
            <span>I already have a code</span>
          </a>
          <button type="submit" class="btn normal-button mt-2">
            Send e-mail
          </button>
        </form>
      </div>
      <div v-else class="modal-card">
        <div v-if="error" class="modal-error mb-2">
          {{ error }}
        </div>
        <form
          id="reset-form"
          autocomplete="off"
          class="modal-form"
          @submit.prevent="resetPassword"
        >
          <p class="small mb-4">
            Enter the code you received in email. Then enter new password and
            press save to confirm changes.
          </p>
          <CustomInput
            id="resetCode"
            v-model="code"
            label="Recovery code:"
            autocomplete="none"
            type="text"
            required
          />
          <CustomInput
            id="resetPasswordNew"
            v-model="password"
            label="New password:"
            autocomplete="none"
            type="password"
            required
          />
          <CustomInput
            id="resetRepeatPasswordNew"
            v-model="repeatPassword"
            label="Repeat new password:"
            autocomplete="none"
            type="password"
            required
          />
          <a
            class="muted-link"
            href="#"
            role="button"
            tabindex="0"
            @click.prevent="
              () => {
                codePage = false;
              }
            "
          >
            <span>I don't have the code</span>
          </a>
          <button type="submit" class="btn normal-button mt-2">Save</button>
        </form>
      </div>
    </Transition>
  </BsModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';

const authModalStore = useAuthModalStore();

const email = ref<string>('');
const code = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');
const error = ref<string | null>(null);

const codePage = ref<boolean>(false);

const runtimeConfig = useRuntimeConfig();

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const hideModal = () => {
  authModalStore.closeModal();
  codePage.value = false;
  password.value = '';
  repeatPassword.value = '';
  error.value = null;
};

const handleReturn = () => {
  if (codePage.value) codePage.value = false;
  else authModalStore.openModal('login');
};

const sendRecoveryEmail = async () => {
  error.value = null;
  try {
    await $fetch(`${baseURL()}/api/auth/forgot-password`, {
      method: 'POST',
      body: {
        email: email.value
      }
    });
    codePage.value = true;
  } catch (err: any) {
    error.value = 'An error occurred. Please try again.';
  }
};

const resetPassword = async () => {
  error.value = null;
  if (password.value !== repeatPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    await $fetch(`${baseURL()}/api/auth/reset-password`, {
      method: 'POST',
      body: {
        code: code.value,
        password: password.value,
        passwordConfirmation: repeatPassword.value
      }
    });

    hideModal();
  } catch (err: any) {
    error.value = 'An error occurred. Please try again.';
  }
};
</script>
