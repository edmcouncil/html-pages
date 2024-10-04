<template>
  <div class="carousel-container">
    <div
      id="carouselController"
      ref="carouselElement"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="10000"
    >
      <div class="carousel-inner">
        <div
          v-for="(item, index) in carouselItems"
          :key="item.id"
          :class="{ active: index === 0 }"
          class="carousel-item"
          data-bs-interval="8000"
        >
          <span class="text-display">{{ item.title }}</span>
          <h2>{{ item.text }}</h2>
          <a :href="item.link.url" @click="outboundLinkClick(item.link.url)">
            {{ item.link.name }}
          </a>
        </div>
      </div>
      <div class="carousel-controls-container">
        <div class="controls">
          <div class="controls__chevron controls__chevron--prev" role="button" @click="prevSlide()">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden-focusable">Previous</span>
          </div>
          <div class="controls__text">
            <p>{{ currentSlide }} of {{ slideCount }}</p>
          </div>
          <div class="controls__chevron controls__chevron--next" role="button" @click="nextSlide()">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden-focusable">Next</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Carousel } from 'bootstrap';

export default {
  name: 'SlideCarousel',
  setup() {
    const carouselElement = ref(null);
    const carousel = ref(null);
    const currentSlide = ref(1);
    const carouselItems = [
      {
        id: 1,
        title: 'Open Knowledge Graph Lab',
        text: 'We deliver Graph Powered Agile Intelligence',
        link: {
          url: 'https://edmconnect.edmcouncil.org/okginterestcommunity/okg-shared-lab',
          name: 'OKGSL mission'
        }
      },
      {
        id: 2,
        title: 'Open Knowledge Graph Training',
        text: 'EDMC offers courses in Knowledge Graph and FIBO, available in multiple forms.',
        link: {
          url: 'https://edmconnect.edmcouncil.org/okginterestcommunity/okg-training/okg-training-events',
          name: 'CHECK AND REGISTER'
        }
      },
      {
        id: 3,
        title: 'FIBO',
        text: 'The Financial Industry Business Ontology (FIBO) defines the sets of things that are of interest in financial business applications and the ways that those things can relate to one another.',
        link: {
          url: 'https://spec.edmcouncil.org/fibo/',
          name: 'Official FIBO website'
        }
      },
      {
        id: 4,
        title: 'AUTO',
        text: 'The Automotive Ontology (AUTO) defines the shared conceptual structures in the automotive industry.',
        link: {
          url: 'https://spec.edmcouncil.org/auto/',
          name: 'Official AUTO website'
        }
      },
      {
        id: 5,
        title: 'IDMP',
        text: 'The Identification of Medicinal Products Ontology (IDMP) aims to demonstrates added value to the ISO IDMP standards for data usability across organizational boundaries and regulatory jurisdictions.',
        link: {
          url: 'https://spec.edmcouncil.org/idmp/',
          name: 'Official IDMP website'
        }
      }
    ];

    const slideCount = carouselItems.length;

    const prevSlide = () => {
      carousel.value?.prev();
    };

    const nextSlide = () => {
      carousel.value?.next();
    };

    onMounted(() => {
      if (carouselElement.value) {
        carousel.value = new Carousel(carouselElement.value);

        carouselElement.value.addEventListener('slide.bs.carousel', (event) => {
          currentSlide.value = event.to + 1;
        });
      } else {
        console.error('Carousel element not found');
      }
    });

    onUnmounted(() => {
      if (carouselElement.value) {
        carouselElement.value.removeEventListener('slide.bs.carousel', () => {});
      }
    });

    return {
      carouselElement,
      currentSlide,
      carouselItems,
      slideCount,
      prevSlide,
      nextSlide
    };
  }
};
</script>

<style lang="scss" scoped>
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

  span.text-display {
    display: inline-block;
    color: var(--bs-black);
  }
  h2 {
    margin: 40px 0;
    color: var(--bs-gray-800);
  }
  a {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    display: inline-block;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: var(--bs-black);

    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &.active {
    opacity: 1;
    transition:
      transform 1s ease-out 0.2s,
      opacity 0.5s ease-out 0.2s;
  }

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
      color: var(--bs-gray-600);
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
      color: var(--bs-gray-600);
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
