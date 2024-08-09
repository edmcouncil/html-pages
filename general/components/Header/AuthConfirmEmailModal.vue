<template>
  <BsModal
    id="confirmEmail-modal"
    :open="authModalStore.authModal === 'confirmEmail'"
    modal-class="confirmEmail-modal"
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
        <h5 class="modal-title">E-mail verification</h5>
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
      <p class="small">
        Your e-mail address has been verified successfully. You can now log in.
      </p>
    </div>
  </BsModal>
</template>

<script lang="ts" setup>
import { useAuthModalStore } from '~/stores/authModal';
import { useRoute, useRouter } from 'vue-router';

const authModalStore = useAuthModalStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.query.confirmation) {
    const { confirmation, ...restQuery } = route.query;
    router.replace({ query: restQuery });

    authModalStore.openModal('confirmEmail');
  }
});

const hideModal = () => {
  authModalStore.closeModal();
};

const handleReturn = () => {
  authModalStore.openModal('login');
};
</script>
