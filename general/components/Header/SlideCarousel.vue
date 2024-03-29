<template>
  <div class="carousel-container">
    <div
      id="carouselController"
      ref="carousel"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(item, index) in carousel"
          :key="item.id"
          :class="{ active: index === 0 }"
          class="carousel-item"
          data-bs-interval="8000"
        >
          <span class="text-display">{{ item.title }}</span>
          <h2>{{ item.text }}</h2>

          <a :href="item.link.url">
            {{ item.link.name }}
          </a>
        </div>
      </div>
      <div class="carousel-controls-container">
        <div class="controls">
          <div
            class="controls__chevron controls__chevron--prev"
            role="button"
            @click="prevSlide()"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden-focusable">Previous</span>
          </div>
          <div class="controls__text">
            <p>{{ currentSlide + 1 }} of {{ slideCount }}</p>
          </div>
          <div
            class="controls__chevron controls__chevron--next"
            role="button"
            @click="nextSlide()"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden-focusable">Next</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <b-carousel
      id="carouselController"
      :interval="8000"
      ref="carousel"
      @sliding-start="onSlideStart"
    >
      <b-carousel-slide
        v-for="(item, index) in carousel"
        :key="item.id"
        :class="{ active: index === 0 }"
      >
        <span class="text-display">{{ item.title }}</span>
        <h2>{{ item.text }}</h2>

        <a :href="item.link.url">
          {{ item.link.name }}
        </a>
      </b-carousel-slide>

      <div class="carousel-controls-container">
        <div class="controls">
          <div
            class="controls__chevron controls__chevron--prev"
            role="button"
            @click="prevSlide()"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </div>
          <div class="controls__text">
            <p>{{ currentSlide + 1 }} of {{ slideCount }}</p>
          </div>
          <div
            class="controls__chevron controls__chevron--next"
            role="button"
            @click="nextSlide()"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </div>
        </div>
      </div>
    </b-carousel> -->
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useContentStore } from '../../stores/content';

export default {
  name: 'SlideCarousel',
  data() {
    return {
      currentSlide: 0,
      isSliding: false,
      carouselThrottle: null,
      instance: null
    };
  },
  computed: {
    ...mapState(useContentStore, {
      carousel: (store) => store.headerData.carousel
    }),
    slideCount() {
      return this.carousel?.length || 1;
    }
  },
  mounted() {
    const { $bootstrap } = useNuxtApp();
    const element = this.$refs.carousel;
    this.instance = new $bootstrap.Carousel(element);
    element.addEventListener('slide.bs.carousel', this.onSlide);
  },
  beforeUnmount() {
    const element = this.$refs.carousel;
    element.removeEventListener('slide.bs.carousel', this.onSlide);
  },
  methods: {
    nextSlide() {
      if (this.carouselThrottle === null && !this.isSliding) {
        const { $bootstrap } = useNuxtApp();
        const element = this.$refs.carousel;
        const instance = $bootstrap.Carousel.getInstance(element);
        instance.next();
        this.carouselThrottle = setTimeout(() => {
          this.carouselThrottle = null;
        }, 500);
      }
    },
    prevSlide() {
      if (this.carouselThrottle === null && !this.isSliding) {
        const { $bootstrap } = useNuxtApp();
        const element = this.$refs.carousel;
        const instance = $bootstrap.Carousel.getInstance(element);
        instance.prev();
        this.carouselThrottle = setTimeout(() => {
          this.carouselThrottle = null;
        }, 500);
      }
    },
    onSlide(event) {
      this.currentSlide = event.to;
    }
  }
};
</script>

<style lang="scss">
.carousel-container {
  flex: 1;
  padding: 0px 60px 60px 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  min-height: 340px;
  max-height: 340px;

  #carouselController {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .carousel-inner {
    overflow: visible;
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.carousel-controls-container {
  display: flex;
  position: absolute;
  flex-direction: column-reverse;
  bottom: 0;
  right: 0;
  padding: 0;
  z-index: 11;

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
        content: '';
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
        background-image: url('@/assets/icons/carousel-previous.svg');
      }

      .carousel-control-next-icon {
        background-image: url('@/assets/icons/carousel-next.svg');
      }
    }
  }
}

.carousel-item {
  padding: 0;
  margin: 0;
  position: absolute;

  .carousel-caption {
    position: relative;
    padding: 0;
    left: unset;
    right: unset;
    bottom: unset;
    text-align: left;
  }
  span.text-display {
    display: inline-block;
    color: map-get($colors-map, 'black');
  }
  h2 {
    margin: 40px 0;
    color: map-get($colors-map, 'black-80');
  }
  a {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    display: inline-block;

    letter-spacing: 0.02em;
    text-decoration-line: underline;

    color: map-get($colors-map, 'black');

    &:hover {
      color: map-get($colors-map, 'black-60');
    }
  }
  // transition
  &.active {
    opacity: 1;
    transition:
      transform 1s ease-out 0.2s,
      opacity 0.5s ease-out 0.2s;
  }
  // entering slide
  &.carousel-item-next {
    opacity: 1;
    transition:
      transform 1.2s ease-out,
      opacity 1s ease-out 0.6s;
  }
  &.carousel-item-prev {
    opacity: 1;
    transition:
      transform 1.2s ease-out,
      opacity 1s ease-out 0.6s;
  }
  // leaving slide
  &.active.carousel-item-left {
    opacity: 0;
    transition:
      transform 1s ease-in,
      opacity 0.3s ease-out;
  }
  &.active.carousel-item-right {
    opacity: 0;
    transition:
      transform 1s ease-in,
      opacity 0.3s ease-out;
  }

  //new
  &.carousel-item-next:not(.carousel-item-start),
  &.active.carousel-item-end {
    opacity: 0;
    transform: translateX(120px);
  }

  &.carousel-item-prev:not(.carousel-item-end),
  &.active.carousel-item-start {
    opacity: 0;
    transform: translateX(-80px);
  }
}

@media (max-width: 992px) {
  .carousel-container {
    padding: 0px 30px 30px 30px;
  }

  .carousel-item {
    h2 {
      margin: 30px 0;
      color: map-get($colors-map, 'black-60');
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
  .carousel-container {
    min-height: 380px;
    max-height: 380px;
  }
  .carousel-item {
    .text-display {
      font-size: 30px;
      line-height: 36px;
    }
    h2 {
      font-size: 16px;
      line-height: 24px;
      margin: 15px 0;
      color: map-get($colors-map, 'black-60');
    }
    a {
      font-size: 16px;
      line-height: 24px;
    }
  }
}

@media (max-width: 991px) {
  .carousel-container {
    min-height: 380px;
    max-height: 380px;
  }
  .carousel-container .carousel-inner {
    display: flex;
    align-items: flex-start;
  }
}

@media (max-width: 992px) and (min-width: 700px) {
  .carousel-container {
    min-height: 260px;
    max-height: 260px;
  }
}

@media (min-width: 1439px) {
  .carousel-item {
    width: calc(100% - 320px);
  }
}

@media (min-width: 1800px) {
  .carousel-item {
    width: 70%;
  }
}
</style>
