<template>
  <div>
    <h1 v-if="sectionItem.title">{{ sectionItem.title }}</h1>
    <div
      class="table-container"
      v-for="item in sectionItem.items"
      :key="item.id"
    >
      <div class="table-box">
        <div class="table-box__column title">
          <h2 v-if="item.title_link"><a :href="item.title_link">{{ item.title }}</a></h2>
          <h2 v-else>{{ item.title }}</h2>
          <div class="short-description" v-html="$md.render(item.subtitle || '')">
          </div>
        </div>

        <div class="table-box__column long-description" v-html="$md.render(item.description || '')">
        </div>
        <div class="table-box__column mobile-visit-btn">
          <button
            type="button"
            class="btn normal-button"
            v-if="item.title_link"
            @click="visit(item.title_link)"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { outboundClick, outboundLinkClick } from "../../helpers/ga";

export default {
  name: 'TableListSection',
  props: [ 'sectionItem' ],
  methods: {
  },
  computed: {
    outboundClick,
    outboundLinkClick,
    visit(url) {
      this.outboundClick(url);
      const aElement = document.createElement("a");
      aElement.setAttribute("href", url);
      aElement.setAttribute("target", "_blank");
      aElement.style.display = "none";
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    },
  }
}
</script>

<style scoped lang="scss">
.table-box {
  min-height: 150px;
}

.table-container .table-box .table-box__column {
  &.mobile-visit-btn {
    display: none;
  }

  &.title {
    flex: 30%;

    h2 a {
      text-decoration: none;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .short-description {
      p {
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  &.long-description {
    flex: 60%;
  }
}

@media (max-width: 991px) {
  .table-container .table-box .table-box__column {
    &.mobile-visit-btn {
      display: block;
    }

    &.title {
      h2 {
        text-align: center;
      }
      .short-description {
        text-align: center;
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    &.long-description {
      text-align: center;
    }
  }
}
</style>
