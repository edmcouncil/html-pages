<template>
  <BsModal
    id="register-modal"
    :open="modalOpen"
    modal-class="register-modal"
    footer-class="d-none"
    :can-escape="true"
    @on-modal-hidden="hideModal"
    @hidden="
      () => {
        renderForm = false;
      }
    "
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
    <div class="modal-card">
      <div v-if="error" class="modal-error mb-2">
        {{ error }}
      </div>
      <form
        id="register-form"
        class="modal-form"
        autocomplete="nope"
        @submit.prevent="handleSubmit"
      >
        <div class="mb-1">
          <CustomInput
            id="emailRegister"
            v-model="email"
            autocomplete="email"
            label="E-mail"
            type="email"
            required
          />
        </div>
        <div class="mb-1">
          <CustomInput
            id="usernameRegister"
            v-model="username"
            autocomplete="nope"
            label="Username"
            type="text"
            required
          />
        </div>
        <div class="mb-1">
          <CustomInput
            id="passwordRegister"
            v-model="password"
            autocomplete="nope"
            label="Password"
            type="password"
            required
          />
        </div>
        <div class="mb-1">
          <CustomInput
            id="passwordRepeatRegister"
            v-model="repeatPassword"
            autocomplete="nope"
            label="Repeat password"
            type="password"
            required
          />
        </div>
        <button type="submit" class="btn normal-button mt-4">Register</button>
      </form>
    </div>
  </BsModal>
</template>

<script lang="ts" setup>
import { useAuthStore, type UserData } from '~/stores/auth';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';

const authStore = useAuthStore();
const authModalStore = useAuthModalStore();

const email = ref<string>('');
const username = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');
const error = ref<string | null>(null);
const renderForm = ref<boolean>(false);

interface AuthResponse {
  jwt: string;
  user: UserData;
}

const runtimeConfig = useRuntimeConfig();

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const hideModal = () => {
  authModalStore.closeModal();
};

const handleReturn = () => {
  authModalStore.openModal('login');
};

const handleSubmit = async () => {
  error.value = null;

  try {
    const response = await $fetch<AuthResponse>(
      `${baseURL()}/api/auth/local/register`,
      {
        method: 'POST',
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.jwt && response.user) {
      authStore.setJwt(response.jwt);
      authStore.setUserData(response.user);
      hideModal();
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    let message: string | null = null;

    if (err.data && err.data.error) {
      message = err.data.error.message;
    } else if (err.message) {
      message = err.message;
    }

    if (message) {
      message = message.charAt(0).toUpperCase() + message.slice(1);
      error.value = `Can't register. ${message}.`;
    } else {
      error.value = `Can't register. Please fill the form and try again.`;
    }
  }
};

const modalOpen = computed(() => authModalStore.authModal === 'register');
watch(modalOpen, (newValue) => {
  if (newValue) renderForm.value = true;
  else {
    email.value = '';
    username.value = '';
    password.value = '';
    repeatPassword.value = '';
    error.value = null;
    renderForm.value = false;
  }
});
</script>
