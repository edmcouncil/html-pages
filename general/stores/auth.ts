import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';

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
  redirectLink: string | null;
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): AuthState => {
    return {
      jwt: null,
      user: null,
      redirectLink: null
    };
  },
  actions: {
    setJwt(token: string) {
      this.jwt = token;
    },
    setUserData(user: UserData) {
      this.user = user;
    },
    setRedirectLink(link: string) {
      this.redirectLink = link;
    },
    clearRedirectLink() {
      this.redirectLink = null;
    },
    async fetchFullProfile() {
      if (!this.jwt) {
        throw new Error('No JWT token available');
      }

      const runtimeConfig = useRuntimeConfig();
      const baseURL =
        typeof window !== 'undefined'
          ? window.location.origin + `${runtimeConfig.public.strapiBasePath}`
          : `${runtimeConfig.public.strapiBaseUrl}`;

      try {
        const response = await $fetch<UserData>(
          `${baseURL}/api/users/me?populate=role`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.jwt}`
            }
          }
        );

        if (response) {
          this.setUserData(response);
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Error fetching full profile:', error);
        throw error;
      }
    },
    async loginAndFetchProfile(
      jwt: string,
      initialUserData: Partial<UserData>
    ) {
      this.setJwt(jwt);
      this.setUserData({ ...initialUserData } as UserData);
      await this.fetchFullProfile();
    },
    clear() {
      this.jwt = null;
      this.user = null;
      this.redirectLink = null;
    }
  },
  persist: {
    key: () => {
      const runtimeConfig = useRuntimeConfig();
      return `ontoviewer-auth-${runtimeConfig.public.ontologyName}`;
    },
    storage: import.meta.client ? localStorage : undefined,
    paths: ['jwt', 'user', 'redirectLink']
  }
});
