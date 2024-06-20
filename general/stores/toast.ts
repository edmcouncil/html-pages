import { defineStore } from 'pinia';

type ToastType = 'default' | 'success' | 'warning' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  nextId: number;
}

export const useToastStore = defineStore({
  id: 'toast',
  state: (): ToastState => ({
    toasts: [],
    nextId: 0
  }),
  actions: {
    addToast(message: string, type: ToastType = 'default') {
      const id = this.nextId++;
      this.toasts.push({ id, message, type });
      setTimeout(() => {
        this.removeToast(id);
      }, 5000);
    },
    removeToast(id: number) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    }
  }
});
