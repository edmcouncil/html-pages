<template>
  <div>
    <b-modal
      id="describe-modal"
      modal-class="describe-modal"
      footer-class="d-none"
      size="lg"
      centered
      scrollable
    >
      <template v-slot:modal-header>
        <div
          type="button"
          class="close-btn"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeModal()"
        ></div>
        <h5 class="modal-title">Describe {{ data.label }}</h5>
        <div class="help-icon" v-b-modal.info-modal @click="openInfo()"></div>
      </template>
      <div v-if="error" class="describe-error text-center">
        <img src="@/assets/icons/warning.svg" alt="Warning image" />
        <p>Error, please try again later.</p>
      </div>
      <div v-else-if="loading" class="describe-loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="code-content">
        <button
          type="button"
          class="btn-copy-code"
          :class="{ copied }"
          @click="pressed()"
        >
          <span v-if="copied" class="copied-text">Copied to clipboard!</span>
          <span v-else class="content-text">Copy code</span>
        </button>
        <pre><code class="hljs xml" v-html="highlightedCode"></code></pre>
      </div>
    </b-modal>
    <b-modal
      id="info-modal"
      modal-class="info-modal"
      size="md"
      centered
    >
      <template v-slot:modal-header>
        <div
          type="button"
          class="close-btn"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeInfo()"
        ></div>
        <h5 class="modal-title">About</h5>
      </template>
      <p>The describe tool is using <a href="https://data.world/">data.world</a> API.</p>
      <template v-slot:modal-footer>
        <button
          class="btn normal-button small"
          @click="closeInfo()"
        >
          Close
        </button>
      </template>
    </b-modal>
    <button
      type="button"
      class="btn-describe"
      :class="{ copied }"
      @click="openModal()"
      v-if="!error && !loading"
    >
      <span class="content-text">Describe</span>
    </button>
    <button
      type="button"
      class="btn-describe disabled"
      :class="{ copied }"
      @click="openModal()"
      v-else
      disabled
    >
      <span class="content-text">Describe</span>
    </button>
  </div>
</template>

<script>
import hljs from "highlight.js";
import { getDescribeIntegration } from '@/api/ontology';
import { mapState } from "vuex";

export default {
  name: "DescribeButton",
  props: [ 'data' ],
  data() {
    return {
      copied: false,
      error: false,
      loading: false,
      code: ``,
      highlightedCode: "",
    };
  },
  async mounted() {
    if (this.code && this.highlightedCode)
        return;

      let result = null;
      try {
        this.loading = true;
        const domain = `${this.describeServer}?iri=${this.data.iri}`;

        result = await getDescribeIntegration(domain);

        this.loading = false;
      } catch(e) {
        this.loading = false;
        this.error = true;
        console.error(e);
        return;
      }

      // check if integration is configured and there is no error message
      try {
        const data = await result.clone().json();

        if (
          data?.msg === "breakdown"
          || data?.message==="Integration is not configured"
        ) {
          this.error = true;
          return;
        }
      } catch(e) {
        // if the result is not a valid json then we can proceed
        this.error = false;
      }

      // highlight code
      this.code = await result.text();
      this.highlightedCode = hljs.highlight(this.code, { language: "xml" }).value;
  },
  methods: {
    async openModal() {
      this.$bvModal.show("describe-modal");
    },
    openInfo() {
      this.$bvModal.show("info-modal");
    },
    closeModal() {
      this.$bvModal.hide("describe-modal");
    },
    closeInfo() {
      this.$bvModal.hide("info-modal");
    },
    pressed() {
      navigator.clipboard.writeText(this.code);
      if (this.copied) {
        return;
      }

      this.copied = true;
      setTimeout(()=>{
        this.copied = false;
      }, 1500);
    },
  },
  computed: {
    ...mapState({
      // servers
      describeServer: (state) => state.servers.describeServer,
    }),
  },
};
</script>

<style lang="scss">
.describe-loading, .describe-error {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 60px;
    height: 60px;
    opacity: 0.5;
    margin-bottom: 50px;
  }

  p {
    color: rgba(0, 0, 0, 0.8);
  }
}
.btn-describe {
  color: rgba(0, 0, 0, 0.8);
  margin-top: 15px;
  margin-bottom: 40px;
  border: none;
  background: none;
  font-size: 18px;
  line-height: 30px;

  &:hover {
    color: $link-hover-color;
  }

  &:active {
    color: $link-active-color;
  }

  &::before {
    content: "";
    background-image: url("@/assets/icons/describe.svg");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;

    display: block;
    width: 24px;
    height: 30px;
    float: left;
    margin: 0 6px 0 0;
  }

  &:focus {
    outline: none;
    border: none;
  }

  &.disabled {
    opacity: 0.5;
    color: rgba(0, 0, 0, 0.8);
  }
}
.content-text {
  opacity: 1;
  transition: opacity 0.3s;
}

.btn-copy-code {
  position: fixed;
  right: 30px;
  top: 90px;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  background: none;
  font-size: 18px;
  line-height: 30px;
  opacity: 0.5;

  &:hover {
    color: $link-hover-color;
    opacity: 1;
  }

  &:active {
    color: $link-active-color;
  }

  &::before {
    content: "";
    background-image: url("@/assets/icons/copy-url-icon.svg");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;

    display: block;
    width: 24px;
    height: 30px;
    float: right;
    margin: 0 0 0 6px;
  }

  &:focus {
    outline: none;
    border: none;
  }
}

.code-content {
  font-size: 16px;
  width: 100%;
  height: 100%;
  cursor: text;
  overflow: visible;
  pre {
    height: 100%;
    overflow: visible;
    white-space: pre-wrap;
    code {
      overflow: visible;
    }
    * {
      font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
    }
  }
}
.normal-button.small {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 0px 10px 10px 0px !important;
}
.modal.info-modal {
  .modal-header {
    position: relative;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 18px 60px 18px 30px;

    justify-content: start;

    .close-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 24px;
      height: 30px;
      padding: 0;
      margin-right: 20px;

      &::before {
        content: "";
        background-image: url("../../assets/icons/return-arrow.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    h5.modal-title {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 30px;
      color: #000000;

      padding: 0;
      margin: 0;
      position: relative;
    }
  }
  .modal-content {
    border-radius: 2px;
    border: none;
    background: white;
    height: 100%;
  }
  .modal-body {
    padding: 30px 30px;
    height: 100%;
    position: relative;

    a {
      color: rgba(0, 0, 0, 0.8);
      text-decoration: none;

      &:hover {
        color: $link-hover-color;
      }

      &:active {
        color: $link-active-color;
      }
    }
  }
  .modal-footer {
    border: none;
    box-shadow: 0px -5px 20px -5px rgba(8, 84, 150, 0.15);
    padding: 18px 30px;

    justify-content: space-between;

    .normal-button.small {
      margin-bottom: 0 !important;
    }
  }
}
.modal.describe-modal {
  .modal-dialog {
    margin: 0;
    min-height: 100vh;
    min-width: 100vw;
  }

  .modal-header {
    position: relative;
    box-shadow: 0px 5px 20px -5px rgba(8, 84, 150, 0.15);
    border: none;
    padding: 18px 30px;

    justify-content: start;

    .help-icon {
      position: absolute;

      content: "";
      background-image: url("../../assets/icons/help.svg");
      opacity: 0.4;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 24px 24px;
      top: 0;
      right: 30px;
      width: 30px;
      height: 100%;

      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }

    .close-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 24px;
      height: 30px;
      padding: 0;
      margin-right: 20px;

      &::before {
        content: "";
        background-image: url("../../assets/icons/return-arrow.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
      }
    }

    h5.modal-title {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 30px;
      color: #000000;

      padding: 0;
      margin: 0;
      position: relative;
    }
  }
  .modal-content {
    border-radius: 2px;
    border: none;
    background: white;
    height: 100%;
  }
  .modal-body {
    padding: 15px 15px;
    height: 100%;
    position: relative;
  }
}
.btn-describe {
  margin-top: 0 !important;
}

@media (max-width: 991px) {
  .btn-describe {
    color: rgba(0, 0, 0, 0.8);
    margin-top: 15px;
    margin-bottom: 40px;
    border: none;
    background: none;
    font-size: 18px;
    line-height: 30px;

    &:hover {
      color: $link-hover-color;
    }

    &:active {
      color: $link-active-color;
    }

    &::before {
      content: "";
      background-image: url("@/assets/icons/describe.svg");
      background-repeat: no-repeat;
      background-size: 24px;
      background-position: center;

      display: block;
      width: 24px;
      height: 30px;
      float: right;
      margin: 0 0 0 6px;
    }

    &:focus {
      outline: none;
      border: none;
    }
  }
}
</style>
