<template>
  <article class="store default-view layout" id="store">
    <header class="store--header default-header" id="looks-great">
      <styledHeadline
        v-if="getItTomorrow"
        class="header--headline__layout"
        headlineText="This is how cool you will look tomorrow"
      ></styledHeadline>

      <styledHeadline
        v-else
        class="header--headline__layout"
        headlineText="This is how cool you will look in 2 days"
      ></styledHeadline>

      <p class="header--subline">
        If you order in the next
        <span v-if="shippingTime.hours > 0">
          <b>{{ shippingTime.hours }}h</b> and</span
        >
        <b> {{ shippingTime.minutes }} min</b>
      </p>
    </header>
    <aside class="store--background default-background "></aside>

    <section
      class="product-images layout layout--full"
      v-if="randomProductData"
    >
      <div class="recap-fake layout layout--span1__right z-index-3">
        <recap
          :last="true"
          headline="Comming soon"
          class="layout--span1__center layout--recap"
        >
          <p>
            See athletes cry in a 6 hour compilation after losing to our
            t-shirts in the sport you like
          </p></recap
        >
        <recap
          :last="true"
          headline="Comming soon"
          class="layout--span1__center layout--recap"
        >
          <p>
            See athletes cry in a 6 hour compilation after losing to our
            t-shirts in the sport you like
          </p></recap
        >
      </div>
      <image-overlay
        v-for="(product, index) in randomProductData"
        :key="'product-store' + index"
        :image_full="product.urls.full"
        :image_regular="product.urls.regular"
        :image_small="product.urls.small"
        :image_thumb="product.urls.thumb"
        :svg="product.svg"
        :alt_description="product.alt_description"
        :overlay_color="currentColor || ['white', '#ffffff']"
        :minHeight="90"
        class="z-index-1"
        :class="[
          product.width / product.height >= 1 ? `layout--wide` : `layout--small`
        ]"
      />
      <div
        class="soundbite z-index-2"
        v-for="(product, index) in randomProductData"
        :key="'product-store-headline' + index"
        :class="[
          product.width / product.height >= 1
            ? `layout--wide__soundbite`
            : `layout--small__soundbite`
        ]"
      >
        <styled-headline
          :headlineText="product.description.headline"
          :headlineType="responsiveHeadline"
        />

        <styled-headline
          v-if="product.description.subline"
          :headlineText="product.description.subline"
          :headlineType="responsiveSubline"
          :invertedColor="true"
        />
      </div>
    </section>

    <storeFooter class="footer__layout default-footer" />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import storeFooter from "@/components/footer/footer.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";
import styledHeadline from "@/components/headline/headline.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    storeFooter,
    imageOverlay,
    styledHeadline,
    recap
  },
  props: [],
  name: "store",
  data() {
    return {
      scrollPosition: 0
    };
  },
  methods: {
    chooseSize() {
      this.goTo("sizeOptions");
    },
    productClass(selector) {
      let layoutList = document.querySelectorAll(`.layout--${selector}`);
      layoutList.forEach((item, index) => {
        item.classList.add(`${selector}${index}`);
      });

      let layoutListSoundbite = document.querySelectorAll(
        `.layout--${selector}__soundbite`
      );
      layoutListSoundbite.forEach((item, index) => {
        item.classList.add(`${selector}${index}`);
      });
    },
    //navigation
    goTo(locationName, paramObject) {
      this.$router.push({
        name: locationName,
        params: paramObject
      });
    }
  },
  computed: {
    ...mapGetters({
      loadingState: "initModule/getLoadingState",
      randomProductData: "productModule/getProduct_random",
      currentColor: "productModule/getCurrentColor",
      productColors: "productModule/getColorPalette",
      getItTomorrow: "timeModule/getItTomorrow",
      shippingTime: "timeModule/getShippingDeadline"
    }),
    responsiveHeadline() {
      let width = window.innerWidth;
      if (width > 1200) {
        return "h2";
      }

      return "h1";
    },
    responsiveSubline() {
      let width = window.innerWidth;
      if (width > 1200) {
        return "h3";
      }

      return "h2";
    }
  },

  created() {
    if (this.currentColor) {
      return;
    }

    if (this.$route.params.colorArray) {
      this.$store.dispatch(
        "productModule/COLORS_setCurrent",
        this.$route.params.colorArray
      );
      return;
    }
    let route = this.$route.fullPath;
    let colorName = route.split("-")[1];
    let colorHex = this.productColors[colorName];
    let colorArray = [colorName, colorHex];
    this.$store.dispatch("productModule/COLORS_setCurrent", colorArray);
  },
  mounted() {
    ["wide", "small"].forEach(item => {
      this.productClass(item);
    });
  }
};
</script>

<style scoped>
.header--subline {
  /* Positioning */
  /* Box-model */
  /* Typography */
  font-size: var(--h3--fontsize__fixed);
  /* Visual */
  /* Misc */
}

.product-images {
  /* Positioning */
  grid-row-gap: 2vh;
  position: relative;
  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 30em) {
  .product-images {
    /* Positioning */
    grid-row-gap: 15vh;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.recap-fake {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 19rem;
  z-index: 5;
  background-color: hsla(0, 0%, 0%, 0.1);
}

@media (min-width: 48em) {
  .recap-fake {
    grid-row: 1/2;
    position: sticky;
    top: 30%;
    grid-template-columns: 1fr;
    background-color: hsla(0, 0%, 0%, 0);
  }
  .layout--recap {
    grid-column: 1/2;
  }
}

.layout--small.small0 {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small1 {
  /* Positioning */
  grid-column: 2/4;
  grid-row: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small2 {
  /* Positioning */
  grid-column: 2/4;
  grid-row: 8/9;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small3 {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 5/6;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small4 {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 6/7;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide0 {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide1 {
  /* Positioning */
  grid-column: 3/5;
  grid-row: 4/5;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide2 {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 7/8;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__soundbite,
.layout--small__soundbite {
  /* Positioning */
  grid-column: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__soundbite.small0 {
  /* Positioning */
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__soundbite.small1 {
  /* Positioning */
  grid-row: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__soundbite.small2 {
  /* Positioning */
  grid-row: 8/9;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__soundbite.small3 {
  /* Positioning */
  grid-row: 5/6;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__soundbite.small4 {
  /* Positioning */
  grid-row: 6/7;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__soundbite.wide0 {
  /* Positioning */
  grid-row: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__soundbite.wide1 {
  /* Positioning */
  grid-row: 4/5;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__soundbite.wide2 {
  /* Positioning */
  grid-row: 7/8;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
