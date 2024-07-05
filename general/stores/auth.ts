import { defineStore } from 'pinia';

export interface UserData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface AuthState {
  jwt: string | null;
  user: UserData | null;
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): AuthState => {
    return {
      jwt: null,
      user: null
    };
  },
  actions: {
    setJwt(token: string) {
      this.jwt = token;
    },
    setUserData(user: UserData) {
      this.user = user;
    },
    clear() {
      this.jwt = null;
      this.user = null;
    }
  },
  persist: {
    key: () => {
      const runtimeConfig = useRuntimeConfig();
      return `ontoviewer-auth-${runtimeConfig.public.ontologyName}`;
    },
    storage: process.client ? localStorage : undefined,
    paths: ['jwt', 'user']
  }
});
