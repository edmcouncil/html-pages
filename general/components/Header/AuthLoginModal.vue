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
      <div v-show="!!error" :key="'error-message'" class="modal-error mb-2">
        {{ error ? error : '' }}
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
        <button
          class="btn normal-button mt-4 github-button"
          @click.prevent="connectGithub()"
        >
          <svg
            class="github-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          Login with GitHub
        </button>
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

const route = useRoute();

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
      await authStore.loginAndFetchProfile(response.jwt, response.user);
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

const connectGithub = () => {
  const githubConnectUrl = `${baseURL()}/api/connect/github`;

  authStore.setRedirectLink(route.fullPath);

  window.location.href = githubConnectUrl;
};

const modalOpen = computed(() => authModalStore.authModal === 'login');
</script>

<style lang="scss">
.github-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.github-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  fill: white;
}
</style>
