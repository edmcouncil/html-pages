<template>
  <div class="container slider">
    <div id="carouselExampleIndicators" class="carousel slide">
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="carousel-caption d-none d-md-block">
            <h2>FIBO Interest Group</h2>
            <p>EDMConnect FIBO Community Space for thoughts sharing</p>
            <!-- <router-link :to="{ path: router('OWL') }" class="btn-sl">DOWNLOAD FIBO OWL</router-link> -->
            <a
              href="https://edmconnect.edmcouncil.org/fibointerestgroup/home"
              v-on:click="
                outboundLinkClick(
                  'https://edmconnect.edmcouncil.org/fibointerestgroup/home'
                )
              "
              class="btn-sl"
              >Visit FIBO Interest Group</a
            >
          </div>
        </div>
        <div class="carousel-item">
          <div class="carousel-caption d-none d-md-block">
            <h2>FIBO GitHub Space</h2>
            <p>
              Since January 2020, FIBO has been developed by an open community
              process
            </p>
            <!-- <router-link :to="{ path: router('vocabulary') }" class="btn-sl">DOWNLOAD FIBO SKOS Vocabulary</router-link> -->
            <a
              href="https://github.com/edmcouncil/fibo/blob/master/README.md"
              v-on:click="
                outboundLinkClick(
                  'https://github.com/edmcouncil/fibo/blob/master/README.md'
                )
              "
              class="btn-sl"
              >Visit FIBO GitHub Space</a
            >
          </div>
        </div>
        <div class="carousel-item">
          <div class="carousel-caption d-none d-md-block">
            <h2>FIBO Training</h2>
            <p>FIBO & Knowledge Graph Fundamentals Training</p>
            <a
              href="https://edmcouncil.org/page/OKGVirtualTraining"
              v-on:click="
                outboundLinkClick(
                  'https://edmcouncil.org/page/OKGVirtualTraining'
                )
              "
              class="btn-sl"
              >Learn more</a
            >
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
      <div class="fill-image-fibo"></div>
    </div>
  </div>
</template>

<script>
import helpers from '../store/helpers.js';

export default {
  extends: helpers,
  name: 'SlideCarousel',
};
</script>

<style lang="scss">
.fa,
.fas {
  font-family: $font-family-awsome-solid;
  font-weight: 900;
}
.slider {
  padding-left: 0;
  padding-right: 0;

  img {
    max-height: 250px !important;
    min-height: 250px !important;
    object-fit: cover;
  }
}

.carousel-inner {
  height: 250px;
  background-image: url("@/assets/img/banerBlack.jpg");
  background-color: black;
  background-size: 100% 100%;
}

.carousel-caption {
  top: 20px;
  padding-top: 10px;

  h2 {
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
  }

  p {
    font-size: 19px !important;
    font-weight: 600 !important;
    color: rgba(255, 255, 255, 0.8);
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    text-transform: uppercase;
  }
  h5 {
    font-size: 32px;
  }
}
a.btn-sl {
  display: inline-block;
  color: map-get($colors-map, "white");
  padding: 8px 13px;
  font-size: 13px;
  margin-top: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  text-decoration: underline !important;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline !important;
    color: rgba(255, 255, 255, 0.8);
  }
}

.carousel-item {
  opacity: 0;
  transition: transform 1.25s ease-in-out, opacity .7s;
  &.active {
    opacity: 1;
  }
  &.active.carousel-item-left {
    opacity: 0;
  }
  &.active.carousel-item-right {
    opacity: 0;
  }
  &.carousel-item-next {
    transition: transform .8s ease-in-out, opacity .8s;
    opacity: 0;
    &.carousel-item-right {
      opacity: 1;
    }
    &.carousel-item-left {
      opacity: 1;
    }
  }
  &.carousel-item-prev {
    transition: transform .8s ease-in-out, opacity .8s;
    opacity: 0;
     &.carousel-item-right {
      opacity: 1;
    }
    &.carousel-item-left {
      opacity: 1;
    }
  }
}

.carousel-indicators li {
  width: 16px;
  height: 4px;
  opacity: 0.9;
  margin-left: 6px;
  margin-right: 6px;
  padding-top: 0;
  padding-left: 0;
  background-color: white;
  opacity: 0.4;
  transition: transform .6s ease-in-out, opacity .3s;

  &.active {
    background-color: white;
    opacity: 1;
  }
}
.carousel-control-prev,
.carousel-control-next {
  opacity: 1;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:active {
    cursor: pointer;
    opacity: 1;
  }
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 48px;
  height: 48px;
}

.carousel-control-prev-icon {
  background-image: url("@/assets/icons/carousel-previous.svg");
}

.carousel-control-next-icon {
  background-image: url("@/assets/icons/carousel-next.svg");
}

@media (max-width: 1620px) {
  .carousel-caption {
    p {
      font-size: 32px;
      padding-bottom: 20px;
      padding-top: 10px;
    }
    h5 {
      font-size: 24px;
    }
  }
}

@media (max-width: 1199px) {
  .carousel-caption {
    p {
      font-size: 24px;
      padding-bottom: 10px;
      padding-top: 5px;
    }
    h2 {
      font-size: 32px;
      margin-bottom: 0;
    }
  }
}

@media (max-width: 991px) {
  .carousel-caption.d-none {
    padding-top: 30px;
    display: block !important;
    margin-top: -20px;
  }
  .slider img {
    min-height: 230px !important;
  }
}
@media (max-width: 767px) {
  .carousel-caption.d-none {
    display: block !important;
    margin-top: -30px;
  }

  .slider img {
    min-height: 200px !important;
  }
  .carousel-caption h2 {
    font-size: 24px;
    margin-bottom: 0;
  }
}
@media (max-width: 575px) {
  .slider img {
    min-height: 220px !important;
  }
  .carousel-caption p {
    font-size: 12px !important;
    font-weight: 400 !important;
    padding-bottom: 5px;
  }
  a.btn-sl {
    margin-top: 0px;
    padding: 5px 10px;
  }
}
</style>
