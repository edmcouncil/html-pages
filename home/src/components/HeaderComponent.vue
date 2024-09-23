<template>
  <header class="container website-header px-0">
    <div class="container-fluid">
      <div class="row">
        <div class="col px-0">
          <div class="navigation-container">
            <nav class="navbar navbar-expand navbar-light">
              <a
                class="navbar-brand"
                href="https://edmcouncil.org"
                target="_blank"
                aria-label="edmc logo"
              >
                <img id="ontology-logo" src="@/assets/img/logo.png" alt="edmc logo" />
              </a>

              <ul
                class="navbar-nav flex-column-reverse flex-lg-row ms-auto align-items-end align-items-lg-center gap-3 gap-lg-0"
              >
                <li class="nav-item d-none d-lg-block">
                  <a
                    class="nav-link"
                    href="https://edmcouncil.org/events/event_list.asp"
                    target="_blank"
                  >
                    Calendar
                  </a>
                </li>
                <li class="nav-item d-none d-lg-block">
                  <a class="nav-link" href="https://edmcouncil.org" target="_blank">EDMConnect</a>
                </li>
                <li class="nav-item d-none d-lg-block">
                  <a class="nav-link" href="https://edmcouncil.org" target="_blank">
                    Sign in / Register
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    id="navbarDropdown"
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="burger-button">
                      <img
                        class="icon-burger"
                        src="@/assets/icons/union-burger.svg"
                        alt="menu icon"
                      />
                      <h3>MENU</h3>
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <a
                        class="dropdown-item d-lg-none"
                        href="https://edmcouncil.org/events/event_list.asp"
                        target="_blank"
                      >
                        Calendar
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-lg-none"
                        href="https://edmcouncil.org/Login.aspx"
                        target="_blank"
                      >
                        EDMConnect
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-lg-none"
                        href="https://edmcouncil.org/login.aspx"
                        target="_blank"
                      >
                        Sign in / Register
                      </a>
                    </li>
                    <li><hr class="dropdown-divider d-lg-none" /></li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="navigationHandler('/')">
                        About OKG
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://spec.edmcouncil.org/fibo/"
                        @click="outboundLinkClick('https://spec.edmcouncil.org/fibo/')"
                      >
                        FIBO Home
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://spec.edmcouncil.org/auto/"
                        @click="outboundLinkClick('https://spec.edmcouncil.org/auto/')"
                      >
                        AUTO Home
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://spec.edmcouncil.org/idmp/"
                        @click="outboundLinkClick('https://spec.edmcouncil.org/idmp/')"
                      >
                        IDMP Home
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="navigationHandler('contact')"
                      >
                        Contact Person
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <SlideCarousel v-if="!$route.meta.plainLayout"></SlideCarousel>
  </header>
</template>

<script>
import SlideCarousel from '@/components/SlideCarousel.vue';
import { outboundLinkClick } from '../helpers/ga';

export default {
  name: 'HeaderComponent',
  components: { SlideCarousel },
  methods: {
    navigationHandler(to) {
      if (this.$route.fullPath !== to && this.$route.fullPath !== `/${to}`) {
        this.$router.push({ path: to });
      }
      this.$emit('navigationEvent', to);
    },
    outboundLinkClick
  }
};
</script>

<style lang="scss">
header.website-header {
  background: linear-gradient(98.03deg, rgba(255, 255, 255, 0.9) 5.63%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    url('@/assets/img/header-white.jpg');
  background-size: cover;
  background-position: center;
  padding: 0;
  min-height: 480px;
  display: flex;
  flex-direction: column;

  .navbar {
    padding: 0;
    justify-content: space-between;

    .nav-item {
      margin-left: 40px;
    }

    li {
      border-bottom: 0;
      padding: 0;
      letter-spacing: 0;
    }
  }

  .navigation-container {
    padding: 40px 60px;
  }

  .navbar-brand {
    padding: 0;
    margin: 0;

    #ontology-logo {
      width: 140px;
      max-height: 60px;
      object-fit: contain;
      object-position: left;
    }
  }

  .dropdown {
    .burger-button {
      align-items: center;
      background-color: var(--bs-white);
      color: var(--bs-gray-800);
      border-radius: 2px;
      box-shadow: 0px 5px 20px rgba(7, 83, 149, 0.15);
      display: flex;
      padding: 15px 40px;
      transition: background-color 0.35s ease;

      .icon-burger {
        height: 24px;
        width: 24px;
        margin-right: 20px;
      }
    }

    & .show .burger-button {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  .dropdown-menu {
    user-select: none;
    pointer-events: none;

    display: block;
    padding: 0;
    width: 320px;
    max-width: calc(100vw - 75px);
    border: none;
    background-color: map-get($colors-map, 'white');
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border-radius: 0;
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
  }

  .dropdown-toggle {
    text-decoration: none;

    &::after {
      display: none;
    }
  }

  .navbar-nav .nav-link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    padding: 0;
    color: var(--bs-black);

    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .navbar-nav .dropdown-menu .dropdown-item {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    color: var(--bs-gray-800);
    margin: 0;
    padding: 15px 40px;

    &:hover {
      color: var(--bs-gray-800);
      background-color: rgba(0, 0, 0, 0.05);
    }
    &:focus {
      color: var(--bs-gray-800);
      background-color: transparent;
    }
    &:active {
      color: var(--bs-gray-800);
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .dropdown-divider {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}

@media (max-width: 430px) {
  header.website-header {
    min-height: 520px;
  }

  header.website-header .dropdown .burger-button {
    .icon-burger {
      margin: 0;
    }
    h3 {
      display: none;
    }
  }
}

@media (max-width: 991px) {
  header.website-header .navbar-brand #ontology-logo {
    width: 105px;
  }

  .navbar-nav {
    flex-direction: column-reverse;
  }

  header.website-header .dropdown .burger-button {
    padding: 15px 30px;
  }

  header.website-header .navbar-nav .dropdown-menu .dropdown-item {
    padding: 10px 30px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    white-space: normal;
  }

  header.website-header .navigation-container {
    padding: 20px 30px 60px 30px;
  }
}

@media (max-width: 992px) and (min-width: 700px) {
  header.website-header {
    min-height: 400px;
  }
}
</style>
