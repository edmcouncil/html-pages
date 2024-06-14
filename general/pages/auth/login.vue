<template>
  <div class="container">
    <div class="row justify-content-center ontology-container">
      <div class="col-md-6">
        <div class="login-card">
          <h1 class="mb-5">Login</h1>
          <div v-if="error" class="login-error my-3">
            {{ error }}
          </div>
          <form class="login-form" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="emailOrUsername" class="form-label">
                E-mail or username
              </label>
              <input
                id="emailOrUsername"
                v-model="identifier"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label"> Password </label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>
            <!-- <NuxtLink class="recover-password" to="/auth/recover-password">
              Forgot password?
            </NuxtLink> -->
            <button type="submit" class="btn normal-button mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, type UserData } from '~/stores/auth';
import { useRuntimeConfig } from '#app';

const router = useRouter();
const authStore = useAuthStore();

const identifier = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);
const currentModal = ref<string | null>(null);

interface AuthResponse {
  jwt: string;
  user: UserData;
}

definePageMeta({
  layout: 'minimal'
});

const runtimeConfig = useRuntimeConfig();

function baseURL() {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
}

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
      router.push('/ontology');
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    error.value = 'Incorrect credentials. Please try again.';
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  padding: 40px;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);

  .login-error {
    color: #ec241d;
  }

  .login-form {
    display: flex;
    flex-direction: column;

    .form-label {
      font-family: 'Inter';
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.6);
    }

    .form-control {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.7);
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

    .recover-password {
      align-self: flex-end;
      color: rgba(0, 0, 0, 0.6);
    }

    .normal-button {
      width: fit-content;
    }

    .alert {
      color: rgba(0, 0, 0, 0.8);

      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;

      letter-spacing: 0.01em;

      border: none;
      border-radius: 2px;

      margin-top: 20px;
      padding: 5px 15px 5px 15px;

      background-color: #ec241d;
    }
  }
}
</style>
