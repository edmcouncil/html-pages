<template>
  <div class="container">
    <div class="row justify-content-center ontology-container">
      <div class="col-md-6">
        <div class="login-card">
          <h1 class="mb-5">Recover password</h1>
          <form class="login-form" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <CustomInput
                id="newPassword"
                v-model="password"
                type="password"
                label="Enter new password"
              />
              <CustomInput
                id="newPasswordRepeat"
                v-model="repeatPassword"
                type="password"
                label="Repeat new password"
              />
            </div>
            <button type="submit" class="btn normal-button mt-4">
              Save password
            </button>
          </form>
          <div v-if="error" class="alert mt-3">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, type UserData } from '~/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const password = ref<string>('');
const repeatPassword = ref<string>('');
const error = ref<string | null>(null);

interface AuthResponse {
  jwt: string;
  user: UserData;
}

definePageMeta({
  layout: 'minimal'
});

const handleSubmit = async () => {
  error.value = null;

  try {
    const response = await $fetch<AuthResponse>(
      'http://localhost:1337/api/auth/local',
      {
        method: 'POST',
        body: JSON.stringify({
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
      router.push('/ontology');
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred during login';
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  padding: 40px;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
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
    padding-right: 90px;
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

@media (min-width: 992px) {
  .ontology-container {
    padding: 60px 60px 0 60px;
  }
}
</style>
