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
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="../assets/img/banerBlack.jpg"
            alt="First slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>IDMP COMMON CORE ONTOLOGY</h2>
            <p>IDEA</p>
            <a
              href="https://marketing.pistoiaalliance.org/hubfs/Projects-Innovation/Ontology/PA_IDMP-Ontology_Executive-Project-Summary.pdf"
              v-on:click="
                outboundLinkClick(
                  'https://marketing.pistoiaalliance.org/hubfs/Projects-Innovation/Ontology/PA_IDMP-Ontology_Executive-Project-Summary.pdf'
                )
              "
              class="btn-sl"
            >
              Learn more
            </a>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/img/banerBlack.jpg"
            alt="Second slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>Project Info Pack</h2>
            <p>
              Info Package for the Cross-Industry Initiative
            </p>
            <a
              href="https://marketing.pistoiaalliance.org/hubfs/Projects-Innovation/Ontology/IDMP_Ontology_Project-Info.pdf"
              v-on:click="
                outboundLinkClick(
                  'https://marketing.pistoiaalliance.org/hubfs/Projects-Innovation/Ontology/IDMP_Ontology_Project-Info.pdf'
                )
              "
              class="btn-sl"
              >Find out more</a
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
  name: 'Carousel',
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
  }
}

.carousel-caption {
  top: 20px;

  p {
    font-size: 19px !important;
    font-weight: 600 !important;
    color: map-get($colors-map, "white");
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

  &:hover {
    text-decoration: underline !important;
  }
}

.carousel-indicators li {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  opacity: 0.9;
  margin-left: 6px;
  margin-right: 6px;
  padding-top: 0;
  padding-left: 0;

  &.active {
    background-color: map-get($colors-map, "black");
  }
}
.carousel-control-prev,
.carousel-control-next {
  opacity: 1;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 50px;
  height: 50px;
  background-color: map-get($colors-map, "white");
  border-radius: 32px;

  &:before {
    font-family: $font-family-awsome-solid;
    color: map-get($colors-map, "dark-grey");
    font-size: 20px;
    line-height: 50px;
  }
}

.carousel-control-prev-icon {
  &:before {
    content: "\f053";
  }
}

.carousel-control-next-icon {
  &:before {
    content: "\f054";
  }
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
