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
      <div class="recap-fake layout--span1__right"></div>
      <productImage
        v-for="(product, index) in randomProductData"
        :key="'randomProductImage' + index"
        :product="product"
        :index="index"
        :currentColor="currentColor"
        :class="productClass(product)"
      >
      </productImage>
    </section>

    <storeFooter class="footer__layout default-footer" />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import storeFooter from "@/components/footer/footer.vue";
import productImage from "@/components/homepage/productImage.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    storeFooter,
    productImage,
    styledHeadline
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
    productClass(product) {
      let aspectRatio = product.width / product.height >= 1;

      return aspectRatio >= 1 ? `layout--wide` : `layout--small`;
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
    })
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
  grid-row-gap: 15vh;
  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

.recap-fake {
  width: 25rem;
  height: 30rem;
  background-color: grey;
  grid-row: 1/2;
}

.layout--small:first-of-type {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small:nth-of-type(2) {
  /* Positioning */
  grid-column: 2/4;
  grid-row: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small:nth-of-type(3) {
  /* Positioning */
  grid-column: 3/5;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small:nth-of-type(3) {
  /* Positioning */
  grid-column: 2/4;
  grid-row: 5/6;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small:nth-of-type(4) {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 6/7;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide:first-of-type {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide:nth-of-type(3) {
  /* Positioning */
  grid-column: 3/5;
  grid-row: 4/5;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide:nth-of-type(2) {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 7/8;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
