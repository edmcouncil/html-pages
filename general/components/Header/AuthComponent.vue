<template>
  <ClientOnly>
    <div v-if="configStore.config.authEnabled === 'true'">
      <AuthLoginModal />
      <AuthRegisterModal />
      <AuthRecoverModal />
      <AuthResetModal />
      <AuthConfirmEmailModal />
      <div class="auth-component dropdown me-1 me-lg-0">
        <div v-if="isLoggedIn" class="auth-component-wrapper">
          <a
            id="authDropdown"
            class="dropdown-toggle user-email"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="me-3">{{ user?.username }}</span>
            <img
              src="@/assets/icons/user.svg"
              alt="User icon"
              class="user-icon me-2"
            />
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="authDropdown"
          >
            <a class="dropdown-item" @click="logout"> Logout </a>
          </div>
        </div>
        <div v-else>
          <a class="login-link" @click="openLogin"> Login </a>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { useAuthModalStore } from '~/stores/authModal';

const authStore = useAuthStore();
const authModalStore = useAuthModalStore();
const configStore = useConfigurationStore();

const isLoggedIn = computed(() => !!authStore.jwt);
const user = computed(() => authStore.user);

const logout = () => {
  authStore.clear();
};

const openLogin = () => {
  authModalStore.openModal('login');
};
</script>

<style scoped lang="scss">
.auth-component {
  display: flex;
  align-items: center;
  margin-left: 40px;

  .auth-component-wrapper {
    max-width: 40vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .avatar {
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-email {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
  }

  .login-link {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;

    &:hover {
      color: black;
    }
  }

  .dropdown-menu {
    user-select: none;
    pointer-events: none;

    display: block;
    padding: 0;
    width: 200px;
    border: none;
    background-color: #fff;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border-radius: 2px;
    right: 0;
    left: auto;

    margin-top: 5px;
    opacity: 0;

    transition:
      opacity 0.35s ease,
      margin-top 0.35s ease;

    &.show {
      user-select: unset;
      pointer-events: unset;

      margin-top: 15px;
      opacity: 1;
    }

    .dropdown-item {
      font-family: 'Inter', sans-serif;
      font-weight: bold;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      padding: 15px 20px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        text-decoration: none;
      }
    }
  }
}
</style>
