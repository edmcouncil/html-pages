<template>
  <footer>
    <div class="container">
      <div class="footer-contact row">
        <div class="footer-contact__col col col-12 col-lg-auto">
          <span class="footer-contact__title">Contact us</span>
          <div class="footer-contact__content">
            <a href="mailto:info@edmcouncil.org">info@edmcouncil.org</a>
          </div>
        </div>
        <div class="footer-contact__col col col-12 col-lg-auto">
          <span class="footer-contact__title">USA</span>
          <div class="footer-contact__content">
            <a href="tel:+1 (646) 722-4381">+1 (646) 722-4381</a>
          </div>
        </div>
        <div class="footer-contact__col col col-12 col-lg-auto">
          <span class="footer-contact__title">UK</span>
          <div class="footer-contact__content">
            <a href="tel:+44 (0) 1794 390044">+44 (0) 1794 390044</a>
          </div>
        </div>
        <div class="col social">
          <a
            href="https://www.youtube.com/user/EDMCouncil"
            class="social-icons"
            target="_blank"
            v-on:click="outboundClick('youtube')"
            ><img src="../assets/icons/social-icons-yt.svg"
          /></a>
          <a
            href="https://twitter.com/edmcouncil"
            class="social-icons"
            target="_blank"
            v-on:click="outboundClick('twitter')"
          >
            <img src="../assets/icons/social-icons-twitter.svg" />
          </a>
          <a
            href="https://www.linkedin.com/company/edm-council/"
            class="social-icons"
            target="_blank"
            v-on:click="outboundClick('linkedin')"
          >
            <img src="../assets/icons/social-icons-in.svg" />
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-12">
          <p class="copyright">
            © {{ new Date().getFullYear() }} EDM Council. All rights reserved.
            DCAM and FIBO are registered trademarks of EDM Council. All other
            marks are the property of their respective owners. Membership
            Management Software Powered by YourMembership
          </p>
          <div class="footer-links">
            <ul>
              <li>
                <a
                  href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC__Terms_of_Use_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC__Terms_of_Use_032318.pdf')"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC_Privacy_Policy_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC_Privacy_Policy_032318.pdf')"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC_Copyright_Policy_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC_Copyright_Policy_032318.pdf')"
                >
                  Copyright
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import helpers from "../store/helpers.js";
import { outboundClick } from "../helpers/ga";

export default {
  extends: helpers,
  name: 'FooterComponent',
  methods: {
    outboundClick,
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: transparent;
  padding: 120px 60px 60px 60px;

  .col {
    padding: 0;
  }

  a {
    color: map-get($colors-map, "black");

    &:hover {
      color: map-get($colors-map, "black-60");
    }
  }

  p {
    font-size: 12px;
    color: map-get($colors-map, "black");
  }
  .footer-contact {
    .footer-contact__col {
      margin-right: 80px;

      &:nth-child(3) {
        margin-right: 0px;
      }
    }

    .footer-contact__title {
      color: map-get($colors-map, "black-60");

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 30px;
      white-space: nowrap;
    }
    .footer-contact__content {
      padding-top: 20px;

      a {
        color: map-get($colors-map, "black-80");

        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        text-decoration-line: underline;
        white-space: nowrap;

        &:hover {
          color: map-get($colors-map, "black-60");
        }
      }
    }
  }

  li:before {
    border: 0 !important;
  }
  .copyright {
    color: map-get($colors-map, "black-60");

    margin: 60px 0;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.01em;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    line-height: 20px;
    padding-left: 0;
    font-size: 15px;
  }
  .social {
    align-items: flex-start;
    display: flex;
    justify-content: flex-end;
  }
  .social-icons {
    position: relative;
    height: 40px;
    width: 40px;

    margin-left: 40px;

    img {
      width: 100%;
    }
  }
  .footer-links ul {
    list-style-type: none;
    padding: 0 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-decoration: underline;

    li {
      padding-right: 40px;
      margin: 0;
      font-size: 18px;
      line-height: 30px;
      color: map-get($colors-map, "black-80");

      &:last-child {
        padding-right: 0;
      }
    }
  }
}

@media (max-width: 1254px) {
  footer .footer-contact .footer-contact__content a {
    font-size: 18px;
    line-height: 30px;
  }
}

@media (max-width: 1085px) {
  footer .footer-contact {
    .footer-contact__col {
      margin-right: 40px;
    }
  }
}

@media (max-width: 992px) {
  footer {
    padding: 60px 30px 30px 30px;

    .footer-contact {
      .footer-contact__col {
        margin-right: 0px;
        margin-bottom: 40px;
      }
    }
    footer-contact .footer-contact__content a {
      font-size: 20px;
      line-height: 30px;
    }
    .footer-contact .footer-contact__title {
      font-size: 16px;
      line-height: 24px;
    }
    .social {
      justify-content: flex-start;
      padding-top: 20px;
    }
    .social-icons {
      margin-left: 0px;
      margin-right: 40px;
    }
    .copyright {
      font-size: 14px;
      line-height: 20px;
    }
    .footer-links ul {
      flex-direction: column;

      li {
        padding-left: 0;
        padding-bottom: 40px;
        font-size: 16px;
        line-height: 24px;
        color: map-get($colors-map, "black-80");

        &:last-child {
          padding-bottom: 0px;
        }
      }
    }
  }
}
</style>
