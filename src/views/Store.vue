<template>
  <article class="store main" id="store">
    <header class="store--header main--header" id="looks-great">
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
    <aside class="store--background main--background"></aside>
    <section class="product-info main--sidebar">
      <div class="product-info__sticky main--sidebar__sticky">
        <div class="recap-wrapper">
          <recap headline="About the color" :alreadyExpanded="true">
            <div class="product-info--color">
              <p>{{ currentColor[0] }}</p>
              <p>add to wishlist</p>
            </div>
          </recap>
          <recap headline="Materials">
            <ul class="product-info--Material">
              <li>- 10% luck, 20% skill</li>
              <li>- 15% concentrated power of will</li>
              <li>- 5%pleasure, 50% percent cotton</li>
              <li>
                And a 100% reason to remember the tshirt (actually 100% cotton,
                too)
              </li>
            </ul>
          </recap>
          <recap headline="Available Sizes">
            <div class="product-info--sizes">
              <p>S, M, L, XL</p>
              <p>see size chart</p>
            </div>
          </recap>
          <recap :last="true" headline="Price for every t-shirt">
            <div class="product-info--price">
              <p class="price--wrapper">
                <span class="headline__background ">For 20$</span>
              </p>
            </div>
          </recap>
        </div>

        <button-simple
          class="product-info--cta"
          :buttonText="'choose your size'"
          @simplebuttonevent="goTo('sizeOptions')"
        />
      </div>
    </section>
    <section class="product-images main--content" v-if="randomProductData">
      <productImage
        v-for="(product, index) in randomProductData"
        :key="'randomProductImage' + index"
        :product="product"
        :index="index"
        :currentColor="currentColor"
        @productimageevent="chooseSize()"
      >
      </productImage>
    </section>

    <storeFooter class="footer__layout main--footer" />

    <router-link
      :to="{
        name: 'sizeOptions',
        params: {}
      }"
      class="size-options z-index-3"
    >
      <p class="size-options--text">Choose Size</p>
    </router-link>

    <page-transition propTransitionName="full-slide">
      <router-view />
    </page-transition>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import storeFooter from "@/components/footer/footer.vue";
import pageTransition from "@/components/transitions/transition.vue";
import productImage from "@/components/homepage/productImage.vue";
import styledHeadline from "@/components/headline/headline.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    buttonSimple,
    storeFooter,
    pageTransition,
    productImage,
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
.product-images {
  /* Positioning */
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 5vh;
  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 45em) {
  .product-images {
    /* Positioning */
    display: grid;
    grid-auto-flow: row;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.product-info--cta {
  /* Positioning */
  display: none;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 45em) {
  .product-info--cta {
    /* Positioning */
    display: block;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.header--subline {
  /* Positioning */
  /* Box-model */
  /* Typography */
  font-size: var(--h3--fontsize__fixed);
  /* Visual */
  /* Misc */
}

.size-options {
  /* Positioning */
  position: fixed;
  bottom: 0;
  left: 0;
  display: grid;
  /* Box-model */
  height: 5rem;
  width: 100%;
  /* Typography */
  /* Visual */
  background-color: hsla(0, 0%, 30%, 0.75);
  text-decoration-color: var(--grey-0);
  /* Misc */
}
.size-options--text {
  /* Positioning */
  justify-self: center;
  align-self: center;
  /* Box-model */
  /* Typography */
  font-size: var(--2base);
  font-weight: bold;
  /* Visual */
  color: var(--grey-0);

  /* Misc */
}

@media (min-width: 45em) {
  .size-options {
    /* Positioning */
    display: none;
    /* Box-model */

    /* Typography */
    /* Visual */

    /* Misc */
  }
}
</style>
