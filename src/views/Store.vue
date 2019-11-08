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
        <h1 class="product-images--headline">
          {{ product.description.headline }}
        </h1>
        <styled-headline
          v-if="product.description.subline"
          :headlineText="product.description.subline"
          :headlineType="responsiveSubline"
          :invertedColor="true"
        />
        <div class="recap-content" v-if="index === 1">
          <h4 class="recap-content--headline">Material</h4>
          <ul class="materials--list">
            <li class="materials--list__item">10% luck, 20% skill</li>
            <li class="materials--list__item">
              15% concentrated power of will
            </li>
            <li class="materials--list__item">
              5%pleasure, 50% percent cotton
            </li>
            <li class="materials--list__item">
              And a 100% reason to remember the tshirt (actually 100% cotton,
              too)
            </li>
          </ul>
        </div>
        <div class="recap-content" v-else-if="index === 2">
          <h4 class="recap-content--headline">Available Sizes</h4>
          <p>S,M,L,XL</p>
        </div>
        <div class="recap-content" v-else-if="index === 3">
          <h4 class="recap-content--headline">Price for every t-shirt</h4>
          <styled-headline
            headlineText="20$"
            headlineType="h3"
            :invertedColor="true"
          />
        </div>
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
        :fullHeight="80"
        class="z-index-1"
        :class="[
          product.width / product.height >= 1 ? `layout--wide` : `layout--small`
        ]"
      />

      <div
        class="recap-wrapper recap--layout z-index-3"
        v-for="(product, index) in randomProductData"
        :key="'product-store-recap' + index"
        :class="[
          product.width / product.height >= 1
            ? `layout--wide__recap`
            : `layout--small__recap`
        ]"
      >
        <recap
          :last="true"
          headline="Choose a size"
          class="layout--recap"
          @recapevent="clearContent"
        >
          <pageTransition>
            <content-choose
              v-if="addedToCard === 'choose'"
              id="content-choose"
              :key="'beforeAddingToCart'"
              @contentfirstevent="addToCard"
            />

            <content-review
              :key="'afterAddingToCart'"
              id="content-review"
              v-else-if="addedToCard === 'review'"
              @sizecontentreviewevent="changeSizeContent"
            />
            <content-community
              :key="'afterAddingToCart'"
              id="content-community"
              v-else
            />
          </pageTransition>
        </recap>
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
import contentChoose from "@/components/homepage/sizeContentChoose.vue";
import contentReview from "@/components/homepage/sizeContentReview.vue";
import contentCommunity from "@/components/homepage/sizeContentCommunity.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    storeFooter,
    imageOverlay,
    styledHeadline,
    recap,
    contentChoose,
    contentReview,
    contentCommunity,
    pageTransition
  },
  props: [],
  name: "store",
  data() {
    return {
      scrollPosition: 0,
      addedToCard: "choose",
      product: {
        amount: null,
        size: null,
        color: null
      }
    };
  },
  methods: {
    productClass(selector) {
      let layoutList = document.querySelectorAll(`.layout--${selector}`);
      layoutList.forEach((item, index) => {
        item.classList.add(`${selector}${index}`);
      });

      let layoutListRecap = document.querySelectorAll(
        `.layout--${selector}__recap`
      );
      layoutListRecap.forEach((item, index) => {
        item.classList.add(`${selector}${index}`);
      });
    },
    addToCard(productInfo) {
      let product = {
        amount: productInfo.amount,
        size: productInfo.size,
        color: this.currentColor,
        timestamp: Date.now()
      };
      this.product = product;
      this.$store
        .dispatch("userModule/PRODUCT_addToShoppingCart", product)
        .then(() => {
          this.addedToCard = productInfo.nextStep;
        });
    },
    changeSizeContent(nextStep) {
      this.addedToCard = nextStep.nextStep;
    },
    clearContent() {
      this.addedToCard = "choose";
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
  grid-row-gap: 5vh;
  position: relative;
  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

.product-images--headline {
  padding-bottom: var(--halfbase);
  line-height: 130%;
}

@media (min-width: 30em) {
  .product-images {
    /* Positioning */
    grid-row-gap: 10vh;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.recap-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: hsla(0, 0%, 80%, 1);
  display: grid;
  padding: var(--halfbase) 2vw;
}

@media (min-width: 22.5em) {
  .recap-container {
    padding: var(--halfbase) var(--column-spacing);
  }
}

@media (min-width: 30em) {
  .recap-container {
    padding: var(--halfbase) calc(var(--column-spacing) + 2vw);
  }
}

@media (min-width: 56em) {
  .recap-container {
    grid-row: 1/2;
    position: sticky;
    top: 20%;
    grid-template-columns: 1fr;
    background-color: hsla(0, 0%, 100%, 0.85);
    height: min-content;
  }
  .recap-container {
    padding: 0;
  }
}

.recap-content--headline {
  padding: var(--1base) 0 var(--fourthbase) 0;
  font-size: var(--2base);
}

.recap-content--link {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.recap-content--wishlist {
  text-decoration: underline;
  font-style: normal;
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
  grid-row: 5/6;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small2 {
  /* Positioning */
  grid-column: 2/4;
  grid-row: 9/10;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small3 {
  /* Positioning */
  grid-column: 3/4;
  grid-row: 11/12;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small.small4 {
  /* Positioning */
  grid-column: 3/5;
  grid-row: 15/16;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide0 {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide1 {
  /* Positioning */
  grid-column: 3/5;
  grid-row: 7/8;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide.wide2 {
  /* Positioning */
  grid-column: 2/5;
  grid-row: 13/14;
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

.recap--layout {
  /* Positioning */
  grid-column: 3/4;
  /* Box-model */
  align-self: end;
  justify-self: center;
  min-width: 19rem;
  width: 99%;

  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 56em) {
  .recap--layout {
    /* Positioning */

    /* Box-model */

    transform: translateY(-5%);
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.layout--small__recap.small0 {
  /* Positioning */
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__recap.small1 {
  /* Positioning */
  grid-row: 5/6;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__recap.small2 {
  /* Positioning */
  grid-row: 9/10;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__recap.small3 {
  /* Positioning */
  grid-row: 11/12;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--small__recap.small4 {
  /* Positioning */
  grid-row: 15/16;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__recap.wide0 {
  /* Positioning */
  grid-row: 3/4;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__recap.wide1 {
  /* Positioning */
  grid-row: 7/8;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.layout--wide__recap.wide2 {
  /* Positioning */
  grid-row: 13/14;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
