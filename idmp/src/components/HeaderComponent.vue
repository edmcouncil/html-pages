<template>
  <header class="container px-0">
    <div class="container-fluid">
      <div class="row">
        <div class="col px-0">
          <div class="navigation-container d-block d-lg-block">
            <nav class="navbar navbar-expand navbar-light">
              <a
                class="navbar-brand"
                href="https://edmcouncil.org"
                target="_blank"
              >
                <img id="logo-fibo" src="@/assets/img/logo.png" />
              </a>

              <ul class="navbar-nav ml-auto align-items-center">
                <li class="nav-item dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="burger-button">
                      <img
                        class="icon-burger"
                        src="@/assets/icons/union-burger.svg"
                      />
                      <h3>MENU</h3>
                    </div>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <router-link
                      class="nav-link dropdown-item"
                      :to="{ path: router('ontology') }"
                    >
                      IDMP Viewer
                    </router-link>

                    <a
                      class="nav-link dropdown-item sub-nav-menu collapsed"
                      href="#"
                      data-toggle="collapse"
                      data-target="#productsCollapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="productsCollapse"
                    >
                      Products
                    </a>
                    <div class="collapse" id="productsCollapse">
                      <router-link
                        class="nav-link dropdown-item sub-nav-item"
                        :to="{ path: router('products') }"
                      >
                        About Products
                      </router-link>
                      <router-link
                        class="nav-link dropdown-item sub-nav-item"
                        :to="{ path: router('OWL') }"
                      >
                        Ontology
                      </router-link>
                      <router-link
                        class="nav-link dropdown-item sub-nav-item"
                        :to="{ path: router('vocabulary') }"
                      >
                        Vocabulary
                      </router-link>
                      <router-link
                        class="nav-link dropdown-item sub-nav-item"
                        :to="{ path: router('data-dictionary') }"
                      >
                        Data Dictionary
                      </router-link>
                    </div>
                    <a
                      href="https://spec.edmcouncil.org"
                      class="nav-link dropdown-item"
                      v-on:click="
                        outboundLinkClick('https://spec.edmcouncil.org')
                      "
                    >
                      OKG Home
                    </a>
                  </div>
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
import helpers from '../store/helpers';
import SlideCarousel from '@/components/SlideCarousel.vue';
import $ from 'jquery';


export default {
  extends: helpers,
  name: 'HeaderComponent',
  components: { SlideCarousel },
  mounted() {
    $(document).on('click', '.dropdown-menu .sub-nav-menu', function (e) {
      e.stopPropagation();
    });
  }
};
</script>

<style lang="scss">
header {
  background: linear-gradient(
      98.03deg,
      rgba(255, 255, 255, 0.9) 5.63%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    url("@/assets/img/header-white.jpg");
  background-size: cover;
  background-position: center;
  padding: 0;
  min-height: 532px;
  max-height: 532px;

  display: flex;
  flex-direction: column;
}
.navbar {
  padding: 0;
  li {
    border-bottom: 0;
    padding: 0;
    margin-left: 40px;
    letter-spacing: 0;
  }
}

.navigation-container {
  padding: 40px 60px;
}

// edmc logo
.navbar-brand {
  padding: 0;
  margin: 0;

  #logo-fibo {
    width: 140px;
  }
}

// menu button
.dropdown {
  .burger-button {
    align-items: center;
    background-color: map-get($colors-map, "white");
    color: map-get($colors-map, "black-80");
    border-radius: 2px;
    box-shadow: 0px 5px 20px #07539526;
    display: flex;
    padding: 15px 40px;

    transition: background-color 0.35s ease;

    .icon-burger {
      height: 24px;
      width: 24px;
      margin-right: 20px;
    }
  }

  &.show .burger-button {
    background-color: map-get($colors-map, "white-60");
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
  background-color: map-get($colors-map, "white");
  box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
  border-radius: 0;

  margin-top: 5px;
  opacity: 0;

  transition: opacity 0.35s ease, margin-top 0.35s ease;

  &.show {
    user-select: unset;
    pointer-events: unset;

    margin-top: 15px;
    opacity: 1;
  }
}

.dropdown-toggle {
  &:hover {
    text-decoration: none;
  }

  &::after {
    display: none;
  }
}

// nav items - title list
.navbar-expand .navbar-nav .nav-link {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;

  padding: 0;

  color: map-get($colors-map, "black");

  &:hover {
    color: map-get($colors-map, "black-60");
  }
}

// nav items inside menu
.navbar-light .navbar-nav .dropdown-menu > .nav-link {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;

  color: map-get($colors-map, "black-80");

  margin: 0;
  padding: 15px 40px;

  &:hover {
    color: map-get($colors-map, "black-80");
    background-color: map-get($colors-map, "black-5");
  }
  &:focus {
    color: map-get($colors-map, "black-80");
    background-color: unset;
  }
  &:active {
    color: map-get($colors-map, "black-80");
    background-color: map-get($colors-map, "black-20");
  }

  // sub items collapse (category title)
  &.sub-nav-menu {
    background-color: transparent;
    position: relative;

    &::after {
      content: "";
      background-image: url("@/assets/icons/triangle-down.svg");
      background-size: 24px;
      background-position: center;
      width: 24px;
      height: 24px;
      position: absolute;

      right: 40px;
      top: 18px;
      transition: transform 0.35s ease;
    }

    &.collapsed {
      &::after {
        transform: rotate(90deg);
      }
    }
  }
}
.dropdown-divider {
  border-top: 1px solid map-get($colors-map, "black-5");
}

// nav items inside menu - sub items
.navbar-expand .navbar-nav .nav-link.sub-nav-item {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;

  color: map-get($colors-map, "black-80");

  margin: 0;
  padding: 15px 40px 15px 60px;

  &:hover {
    background-color: map-get($colors-map, "black-5");
  }
  &:focus {
    background-color: unset;
  }
  &:active {
    background-color: map-get($colors-map, "black-20");
  }
}

@media (max-width: 350px) {
  .dropdown {
    .burger-button {
      .icon-burger {
        margin: 0;
      }
      h3 {
        display: none;
      }
    }
  }
}

@media (max-width: 1024px) {
  .navbar li {
    margin-left: 30px;
  }
}

@media (max-width: 991px) {
  .navbar-brand {
    #logo-fibo {
      width: 105px;
    }
  }

  .navbar li {
    margin-left: 0px;
  }
  .dropdown {
    .burger-button {
      padding: 15px 30px;
    }
  }
  .navbar-light .navbar-nav .dropdown-menu > .nav-link,
  .navbar-expand .navbar-nav .nav-link.sub-nav-item {
    padding: 10px 30px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    white-space: normal;
  }

  .navbar-expand .navbar-nav .nav-link.sub-nav-item {
    padding: 10px 30px 10px 45px;
  }

  .navbar-light .navbar-nav .dropdown-menu > .nav-link.sub-nav-menu::after {
    top: 9px;
    right: 30px;
  }

  .navigation-container {
    padding: 20px 30px;
  }
}

@media (max-width: 992px) and (min-width: 700px) {
  header {
    min-height: 400px;
    max-height: 400px;
  }
}
</style>
