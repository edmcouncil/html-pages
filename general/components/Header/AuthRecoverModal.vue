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
      <div v-if="!sentPage" class="modal-card">
        <div v-if="error" class="modal-error mb-2">
          {{ error }}
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
            id="emailRecover"
            v-model="email"
            label="E-mail"
            type="email"
            required
          />
          <button type="submit" class="btn normal-button mt-2">
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

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthModalStore } from '~/stores/authModal';
import { useRuntimeConfig } from '#app';

const authModalStore = useAuthModalStore();

const email = ref<string>('');
const error = ref<string | null>(null);

const sentPage = ref<boolean>(false);

const runtimeConfig = useRuntimeConfig();

const baseURL = () => {
  return typeof window !== 'undefined'
    ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
    : `${runtimeConfig.public.strapiBaseUrl}`;
};

const hideModal = () => {
  authModalStore.closeModal();
  sentPage.value = false;
  error.value = null;
};

const handleReturn = () => {
  authModalStore.openModal('login');
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
    sentPage.value = true;
  } catch (err: any) {
    error.value = 'An error occurred. Please try again.';
  }
};
</script>
