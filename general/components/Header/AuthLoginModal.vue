<template>
  <BsModal
    id="login-modal"
    :open="modalOpen"
    modal-class="login-modal"
    footer-class="d-none"
    :can-escape="true"
    @on-modal-hidden="hideModal"
  >
    <template #modal-header>
      <h5 class="modal-title">Login</h5>
      <div
        type="button"
        class="close-btn"
        data-dismiss="modal"
        aria-label="Close"
        @click="hideModal"
      ></div>
    </template>
    <div class="modal-card">
      <div v-if="error" :key="'error-message'" class="modal-error mb-2">
        {{ error }}
      </div>
      <form id="login-form" class="modal-form" @submit.prevent="handleSubmit">
        <div class="mb-1">
          <CustomInput
            id="emailOrUsername"
            v-model="identifier"
            name="emailOrUsername"
            label="E-mail or username"
            autocomplete="email"
            type="text"
            required
          />
        </div>
        <div class="mb-1">
          <CustomInput
            id="password"
            v-model="password"
            name="password"
            autocomplete="password"
            label="Password"
            type="password"
            required
          />
        </div>

        <a
          class="muted-link"
          href="#"
          role="button"
          tabindex="0"
          @click.prevent="authModalStore.openModal('recover')"
        >
          <span>Forgot password?</span>
        </a>
        <a
          class="muted-link"
          href="#"
          role="button"
          tabindex="0"
          @click.prevent="authModalStore.openModal('register')"
        >
          <span>Create an account</span>
        </a>
        <button type="submit" class="btn normal-button mt-4">Login</button>
      </form>
    </div>
  </BsModal>
</template>

<script lang="ts" setup>
import { useAuthStore, type UserData } from '~/stores/auth';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();

const authStore = useAuthStore();
const authModalStore = useAuthModalStore();

const identifier = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

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

const handleSubmit = async () => {
  error.value = null;

  try {
    const response = await $fetch<AuthResponse>(`${baseURL()}/api/auth/local`, {
      method: 'POST',
      body: JSON.stringify({
        identifier: identifier.value,
        password: password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.jwt && response.user) {
      authStore.setJwt(response.jwt);
      authStore.setUserData(response.user);
      toastStore.addToast('You are logged in.');
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
      error.value = `Can't login. ${message}.`;
    } else {
      error.value = `Can't login. Please fill the form and try again.`;
    }
  }
};

const modalOpen = computed(() => authModalStore.authModal === 'login');
</script>
