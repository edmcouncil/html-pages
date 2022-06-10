<template>
  <div class="container header">
    <div class="desktop-view">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="https://edmcouncil.org" target="_blank">
          <img id="logo-fibo" src="@/assets/img/logo.png" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="burger-button">
                  <div class="icon-burger">
                    <img src="@/assets/icons/union-burger.svg" />
                  </div>
                </div>
              </a>
              <div
                class="dropdown-menu desktop"
                aria-labelledby="navbarDropdown"
              >
                <router-link
                  class="nav-link"
                  :to="{ path: router('ontology') }"
                >
                  IDMP Viewer</router-link
                >
                <router-link class="nav-link" :to="{ path: router('products') }"
                  >IDMP Products</router-link
                >
                <div class="sub-nav-link">
                  <router-link
                    class="nav-link nav-sub-link"
                    :to="{ path: router('OWL') }"
                    >IDMP Ontology</router-link
                  >
                  <router-link
                    class="nav-link nav-sub-link"
                    :to="{ path: router('vocabulary') }"
                    >IDMP Vocabulary</router-link
                  >
                  <router-link
                    class="nav-link nav-sub-link"
                    :to="{ path: router('data-dictionary') }"
                    >IDMP Data Dictionary</router-link
                  >
                </div>

                <a
                  href="https://spec.edmcouncil.org"
                  class="nav-link"
                  v-on:click="outboundLinkClick('https://spec.edmcouncil.org')"
                  >OKG Home</a
                >
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="mobile-view">
      <nav class="navbar navbar-expand-lg navbar-light mobile-view">
        <a class="navbar-brand" href="https://edmcouncil.org" target="_blank">
          <img id="logo-fibo" src="@/assets/img/logo.png" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: router('ontology') }"
                >IDMP Viewer</router-link
              >
            </li>

            <li class="nav-item dropdown">
              <!-- <router-link class="nav-link" :to="{ path: router('products') }">FIBO Products</router-link> -->
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >IDMP Products</a
              >
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link
                  class="dropdown-item"
                  :to="{ path: router('products') }"
                >
                  About IDMP Products
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ path: router('OWL') }"
                >
                  IDMP Ontology
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ path: router('vocabulary') }"
                >
                  IDMP Vocabulary
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ path: router('data-dictionary') }"
                >
                  IDMP Data Dictionary
                </router-link>
              </div>
            </li>

            <li class="nav-item">
              <a
                href="https://spec.edmcouncil.org"
                class="nav-link"
                v-on:click="outboundLinkClick('https://spec.edmcouncil.org')"
                >OKG Home</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <SlideCarousel v-if="!$route.meta.plainLayout"></SlideCarousel>
  </div>
</template>

<script>
import Vue from "vue";
import helpers from "../store/helpers.js";
import SlideCarousel from "@/components/SlideCarousel.vue";

Vue.component("SlideCarousel", SlideCarousel);

export default {
  extends: helpers,
  name: "HeaderComponent",
};
</script>

<style lang="scss">
.fab {
  font-family: $font-family-awsome-brands;
  font-style: normal;
}
.fa-linkedin-in:before {
  content: "\f0e1";
}
.fa-twitter:before {
  content: "\f099";
}
.fa-youtube:before {
  content: "\f167";
}
.header {
  background-image: url("../assets/img/headerTransparent.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  padding: 0;
}

.burger-button {
  align-items: center;
  background-color: map-get($colors-map, "black");
  border-radius: 2px;
  box-shadow: 0px 5px 20px #07539526;
  display: flex;
  height: 60px;
  margin-left: 40px;
  min-width: 104px;
  padding: 0px 40px;
  .icon-burger {
    align-items: flex-end;
    display: flex;
    height: 24px;
    min-width: 24px;
    img {
      height: 23px;
      width: 24px;
    }
  }
}
.burger-button img {
  max-width: 90%;
  height: auto;
}

.sub-nav-link {
  padding-left: 10px;
  color: black;
}
.nav-sub-link {
  color: map-get($colors-map, "grey") !important;
  text-shadow: 0 0 1px #ccc;
}

@media (min-width: 992px) {
  .desktop-view {
    padding: 0 45px;
    display: block !important;
  }
  .mobile-view {
    display: none !important;
  }
}
@media (max-width: 991px) {
  .mobile-view {
    display: block !important;
  }
  .desktop-view {
    display: none !important;
  }
}

.padding-top30-bottom30 {
  padding: 30px 0;
}
.navbar {
  padding: 0;
  li {
    border-bottom: 0;
    padding: 0;
    letter-spacing: 0;
  }
}
.nav-item {
  font-weight: 50;
}

.nav-item.padding-top15 {
  padding-top: 15px !important;
}
.navbar-nav {
  align-self: flex-end;
  padding-bottom: 5px;
  margin-top: 0px;
  padding-top: 15px;
  margin-bottom: 12px;
}
.navbar-collapse {
  padding-top: 0px;
}
.navbar-nav li:before,
.navbar-links li:before {
  border: none !important;
}
.navbarfibo {
  align-self: end;
  justify-content: flex-end;
  padding-bottom: 15px;
  font-weight: 700;
}
.navbar-brand img {
  margin-top: 0px;
}
.navbar-expand-lg .navbar-nav .nav-link {
  padding: 2px 0 2px 30px;
  font-size: 18px;
  font-weight: 100;
  padding-top: 5px;
  color: map-get($colors-map, "black");
  text-shadow: 0 0 1px #ccc;
}
.nav-link {
  transition: 0.5s;

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none;
  }
}
.navbar-light .navbar-toggler {
  margin-top: 10px;
  color: map-get($colors-map, "white");
  border-color: transparent;
  line-height: 20px;
}
.navbar-toggler {
  background-color: map-get($colors-map, "black");
  font-size: 15px;
  float: right;
  margin-right: 5px;
}
.navbar-toggler-icon {
  background-image: url("../assets/icons/union-burger.svg") !important;
}

.navbar-links {
  position: absolute;
  top: 25px;
  right: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    background-color: map-get($colors-map, "orange");
    text-decoration: none;
    white-space: nowrap;
    margin: 0 3px;
    padding: 0;
    transition: 0.3s;
    vertical-align: top;
    line-height: 34px;
    height: 34px;
    &:hover {
      background-color: map-get($colors-map, "blue");
    }
    &:nth-child(4) {
      margin-right: 40px;
    }
    a {
      color: map-get($colors-map, "white");
      font-size: 12px;
      font-weight: 500;
      line-height: 33px;
      text-transform: uppercase;
      padding: 0 15px;
      line-height: 36px;

      &:hover {
        text-decoration: none;
      }
    }
    &.edm-logo {
      background-color: transparent;
    }
    &.edm-logo {
      background-color: transparent;
    }
    &.ico {
      background-color: map-get($colors-map, "white");
      margin: 0 0;

      a {
        padding: 0;
        font-size: 22px;
      }
      i {
        display: inline-block;
        margin-top: 60px;
        background-color: map-get($colors-map, "medium-grey");
        color: map-get($colors-map, "white");
        border-radius: 100%;
        line-height: 40px;
        height: 40px;
        width: 40px;
        text-align: center;
        margin: 0 1px;
        font-size: 22px;
        transition: all 0.6s ease 0s;

        &:hover {
          background-color: map-get($colors-map, "lighter-grey");
          color: map-get($colors-map, "blue");
        }
      }
    }
  }
}

.dropdown-menu {
  min-width: 250px;
  border: none;
  background-color: map-get($colors-map, "white");
  border-radius: 0;
}

//multiselect burger hide down arrow
.dropdown-toggle::after {
  display: none;
}
.dropdown-menu.desktop {
  left: -95%;
}

.dropdown-item {
  color: map-get($colors-map, "black");
  padding: 2px 12px;
  font-size: 18px;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;

  &:hover,
  &:focus {
    text-decoration: none;
    background-color: map-get($colors-map, "blue");
    color: #fff;
  }
}

.ml-auto {
  left: auto !important;
  right: 0px;
}
@media (max-width: 1559px) {
  #logo-fibo {
    width: 140px;
    margin-top: 10px;
  }
  .navbar-nav {
    margin-bottom: 7px;
  }
}
@media (max-width: 1199px) {
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-left: 18px;
    padding-right: 0;
    font-size: 14px;
  }
  .navbar-links li {
    height: 29px;
    line-height: 29px;
  }
  .navbar-links li a {
    padding: 0 10px;
    line-height: 29px;
  }
}
@media (max-width: 991px) {
  #logo-fibo {
    margin-bottom: 20px;
  }
  .navbar-nav {
    margin-top: 0px;
  }
  .navbar-collapse {
    padding-top: 0px;
  }
}
@media (max-width: 767px) {
  .navbar-brand img {
    margin-top: 10px;
    width: 260px;
  }
  #logo-fibo {
    margin-bottom: 10px;
  }
  .carousel-caption.d-none {
    display: block !important;
    margin-top: -30px;
  }

  .navbar-links li:nth-child(4) {
    margin-right: 0;
  }
  .navbar-links li.ico {
    display: none;
  }
  .navbar-links li {
    height: 23px;
    line-height: 18px;
    margin: 0 1px;
  }
  .navbar-links li a {
    padding: 0 7px;
    font-size: 10px;
    line-height: 14px;
  }
}
@media (max-width: 575px) {
  .navbar-brand img {
    margin-top: 80px;
  }
  .navbar-links {
    top: 5px;
    right: 0;
    margin-left: -20px;
  }
}
</style>
