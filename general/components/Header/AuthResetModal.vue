<template>
  <BsModal
    id="reset-modal"
    :open="authModalStore.authModal === 'reset'"
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
            Enter your new password, then click "Save" to complete the update.
          </p>
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
          <button type="submit" class="btn normal-button mt-2">Save</button>
        </form>
      </div>
      <div v-else class="modal-card">
        <p class="small">The password has been updated successfully.</p>
      </div>
    </Transition>
  </BsModal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';
import { useRoute, useRouter } from 'vue-router';

const authModalStore = useAuthModalStore();

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const successPage = ref<boolean>(false);

const code = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');
const error = ref<string | null>(null);

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
  password.value = '';
  repeatPassword.value = '';
  successPage.value = false;
  error.value = null;
};

const handleReturn = () => {
  authModalStore.openModal('login');
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

    successPage.value = true;
  } catch (err: any) {
    error.value = 'An error occurred. Please try again.';
  }
};
</script>
