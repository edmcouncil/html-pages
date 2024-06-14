import { defineStore } from 'pinia';

type ModalKey = 'login' | 'register' | 'recover';

interface AuthModalState {
  authModal: ModalKey | null;
}

export const useAuthModalStore = defineStore({
  id: 'auth-modal-store',
  state: (): AuthModalState => {
    return {
      authModal: null
    };
  },
  actions: {
    openModal(modal: ModalKey) {
      this.authModal = modal;
    },
    closeModal() {
      this.authModal = null;
    }
  }
});
