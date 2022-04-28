<template>
  <footer>
    <div class="container">
      <div class="footer-contact row">
        <div class="col-md-3">
          <span class="footer-header">Contact us</span>
          <div class="footer-text">
            <a href="mailto:info@edmcouncil.org">info@edmcouncil.org</a>
          </div>
        </div>
        <div class="col-md-3">
          <span class="footer-header">USA</span>
          <div class="phone footer-text">+1 (646) 722-4381</div>
        </div>
        <div class="col-md-3">
          <span class="footer-header">UK</span>
          <div class="footer-text">+44 (0) 1794 390044</div>
        </div>
        <div class="col-md-3 social">
          <a
            href="https://www.youtube.com/user/EDMCouncil"
            target="_blank"
            v-on:click="outboundClick('youtube')"
            ><img class="social-icons-first" src="../assets/icons/social-icons-yt.svg"
          /></a>
          <a
            href="https://twitter.com/edmcouncil"
            target="_blank"
            v-on:click="outboundClick('twitter')"
          >
            <img class="social-icons" src="../assets/icons/social-icons-twitter.svg" />
          </a>
          <a
            href="https://www.linkedin.com/company/edm-council/"
            target="_blank"
            v-on:click="outboundClick('linkedin')"
          >
            <img class="social-icons" src="../assets/icons/social-icons-in.svg" />
          </a>
        </div>
      </div>

      <hr />
      <div class="row">
        <div class="col-md-12">
          <p class="copyright">
            © {{ new Date().getFullYear() }} EDM Council. All rights reserved. DCAM and FIBO are registered trademarks of EDM
            Council. All other marks are the property of their respective owners. Membership
            Management Software Powered by YourMembership
          </p>
          <hr />
          <div class="footer-links">
            <ul>
              <li>
                <a
            href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC__Terms_of_Use_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC__Terms_of_Use_032318.pdf')"
                  >Terms of Use</a
                >
              </li>
              <li>
                <a
            href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC_Privacy_Policy_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC_Privacy_Policy_032318.pdf')"
                  >Privacy Policy</a
                >
              </li>
              <li>
                <a
            href="https://cdn.ymaws.com/edmcouncil.org/resource/resmgr/Featured_Documents/Legal/EDMC_Copyright_Policy_032318.pdf"
                  target="_blank"
                  v-on:click="outboundClick('EDMC_Copyright_Policy_032318.pdf')"
                  >Copyright</a
                >
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

<style lang="scss">
footer {
  background-color: map-get($colors-map, "white");
  padding: 40px 0;

  a {
    color: map-get($colors-map, "black");
  }
  a:hover {
    color: map-get($colors-map, "gray");
  }
  p {
    font-size: 12px;
    color: map-get($colors-map, "black");
  }
  .footer-text {
    color: map-get($colors-map, "darker-gray");
    font-weight: 400;
    line-height: 36px;
    margin-top: 20px;
    min-height: 36px;
    text-decoration: underline;
    white-space: nowrap;
  }
  .footer-text a {
    color: map-get($colors-map, "darker-gray");
  }
  li:before {
    border: 0 !important;
  }
  span.footer-header {
    color: map-get($colors-map, "dark-grey");
    font-weight: 700;
    line-height: 30px;
    min-height: 30px;
    white-space: nowrap;
  }
  .copyright {
    font-size: 10px;
    color: map-get($colors-map, "gray");
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
  .social-icons-first {
    height: 40px;
    width: 40px;
  }
  .social-icons {
    height: 40px;
    margin-left: 40px;
    width: 40px;
  }
  .footer-links ul {
    font-size: 12px;
    list-style-type: none;
    padding: 0 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-decoration: underline;

    li {
      padding: 0;
      margin: 0;
      line-height: 12px;
      font-size: 12px;

      &:first-child {
        border-right: 1px solid map-get($colors-map, "grey");
        padding-right: 12px;
      }
      &:nth-child(2) {
        border-right: 1px solid map-get($colors-map, "grey");
        padding-right: 12px;
        padding-left: 12px;
      }
      &:nth-child(3) {
        padding-left: 12px;
      }
    }
  }
}
</style>
