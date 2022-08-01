<template>
  <div class="container-fluid carousel-container d-flex flex-column">
    <div
      id="carouselController"
      class="carousel slide row justify-content-center flex-grow-1"
      data-ride="carousel"
      data-interval="10000"
    >
      <div class="carousel-inner col-lg-10">
        <div class="carousel-item active">
          <span class="text-display">FIBO Interest Group</span>
          <h2>EDMConnect FIBO Community Space for thoughts sharing</h2>

          <a
            href="https://edmconnect.edmcouncil.org/fibointerestgroup/home"
            v-on:click="
              outboundLinkClick(
                'https://edmconnect.edmcouncil.org/fibointerestgroup/home'
              )
            "
          >
            Visit FIBO Interest Group
          </a>
        </div>
        <div class="carousel-item">
          <span class="text-display">FIBO GitHub Space</span>
          <h2>
            Since January 2020, FIBO has been developed by an open community
            process
          </h2>

          <a
            href="https://github.com/edmcouncil/fibo/blob/master/README.md"
            v-on:click="
              outboundLinkClick(
                'https://github.com/edmcouncil/fibo/blob/master/README.md'
              )
            "
          >
            Visit FIBO GitHub Space
          </a>
        </div>
        <div class="carousel-item">
          <span class="text-display">FIBO Training</span>
          <h2>FIBO & Knowledge Graph Fundamentals Training</h2>

          <a
            href="https://edmcouncil.org/page/OKGVirtualTraining"
            v-on:click="
              outboundLinkClick(
                'https://edmcouncil.org/page/OKGVirtualTraining'
              )
            "
          >
            Learn more
          </a>
        </div>
      </div>
      <div class="carousel-controls-container col-lg-2">
        <div class="controls">
          <div
            class="controls__chevron controls__chevron--prev"
            data-target="#carouselController"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </div>
          <div class="controls__text">
            <p>{{ currentSlide }} of {{ slideCount }}</p>
          </div>
          <div
            class="controls__chevron controls__chevron--next"
            data-target="#carouselController"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '../store/helpers.js';
import $ from 'jquery';

export default {
  extends: helpers,
  name: 'SlideCarousel',
  mounted() {
    $('#carouselController').on('slide.bs.carousel', (e) => {
      this.currentSlide = e.to + 1;
    })
  },
  data() {
    return {
      currentSlide: 1,
      slideCount: 3,
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel-container {
  flex: 1;
  padding: 30px 60px 60px 60px;
  overflow: hidden;

  .carousel-inner {
    overflow: visible;
    max-height: 260px;
  }
}

.carousel-controls-container {
  display: flex;
  flex-direction: column-reverse;

  .controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .controls__text p {
      margin: 0px 30px;
      width: 50px;
      white-space: nowrap;
      text-align: right;
    }

    .controls__chevron {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      position: relative;

      &:after {
        content: "";
        padding: 50px;
        position: absolute;
        left: -25px;
        top: -25px;
      }

      .carousel-control-prev-icon,
      .carousel-control-next-icon {
        width: 100%;
        height: 100%;
      }

      .carousel-control-prev-icon {
        background-image: url("@/assets/icons/carousel-previous.svg");
      }

      .carousel-control-next-icon {
        background-image: url("@/assets/icons/carousel-next.svg");
      }
    }
  }
}

.carousel-item {
  span.text-display {
    display: inline-block;
  }
  h2 {
    margin: 40px 0;
    color: map-get($colors-map, "black-80");
  }
  a {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    display: inline-block;

    letter-spacing: 0.02em;
    text-decoration-line: underline;

    color: map-get($colors-map, "black");

    &:hover {
      color: map-get($colors-map, "black-60");
    }
  }
  // transition
  &.active {
    opacity: 1;
    transition: transform 1s ease-out, opacity 1s ease;
  }
  // entering slide
  &.carousel-item-next {
    opacity: 0;
    transition: transform 1s ease-out, opacity 1s ease;
  }
  &.carousel-item-prev {
    opacity: 0;
    transition: transform 1s ease-out, opacity 1s ease;
  }
  &.active.carousel-item-right,
  &.carousel-item-next:not(.carousel-item-left) {
    transform: translateX(120px);
  }
  &.active.carousel-item-left,
  &.carousel-item-prev:not(.carousel-item-right) {
    transform: translateX(-70px);
  }
  // leaving slide
  &.active.carousel-item-left {
    opacity: 0;
    transition: transform 1s ease-in, opacity 0.5s ease-out;
  }
  &.active.carousel-item-right {
    opacity: 0;
    transition: transform 1s ease-in, opacity 0.5s ease-out;
  }
}

@media (max-width: 992px) {
  .carousel-container {
    padding: 30px;
  }

  .carousel-item {
    h2 {
      margin: 32px 0;
      color: map-get($colors-map, "black-60");
    }
    a {
      font-size: 18px;
      line-height: 22px;
    }
  }

  .carousel-controls-container .controls {
    .controls__chevron {
      width: 24px;
      height: 24px;
      &:after {
        padding: 35px;
        left: -25px;
        top: -25px;
      }
    }
  }
}

@media (max-width: 350px) {
  .carousel-item {
    .text-display {
      font-size: 30px;
      line-height: 36px;
    }
    h2 {
      font-size: 16px;
      line-height: 24px;
      margin: 15px 0;
      color: map-get($colors-map, "black-60");
    }
    a {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
