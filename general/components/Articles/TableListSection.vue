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
          <h2><a :href="item.title_link">{{ item.title }}</a></h2>
          <div class="short-description" v-html="$md.render(item.subtitle || '')">
          </div>
        </div>

        <div class="table-box__column long-description" v-html="$md.render(item.description || '')">
        </div>
        <div class="table-box__column mobile-visit-btn">
          <button
            type="button"
            class="btn normal-button"
            @click="routerGoTo('/OWL')"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableListSection',
  props: [ 'sectionItem' ],
  methods: {
  },
  computed: {
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
      text-align: justify;
    }
  }
}
</style>
