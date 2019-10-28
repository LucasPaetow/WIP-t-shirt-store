<template>
  <modal-layout class="option-completion" :extraContent="true">
    <template #header>
      <h2 class="header--headline">
        Well done!
      </h2>
      <p class="header--subline">
        Your added this sweet t-shirt to your shopping cart
      </p>
    </template>
    <template #main>
      <section class="option-completion--product__layout">
        <image-overlay
          :image_full="require('@/assets/images/kA9asUxmVka.png')"
          :image_regular="require('@/assets/images/kA9asUxmVka.png')"
          :image_small="require('@/assets/images/kA9asUxmVka.png')"
          :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
          :svg="supportData[3].svg"
          :alt_description="supportData[3].alt_description"
          :overlay_color="currentColor || ['white', '#ffffff']"
          :fullHeight="25"
          class="image-overlay product--image"
        />
        <div class="product--price">
          <styledHeadline
            :headlineText="`${product.amount * 20}`"
            :headlineType="responsiveHeadline"
            :invertedColor="true"
            class="product--headline"
          >
            <i>$</i></styledHeadline
          >

          <p class="product--shipping-label">+shipping</p>
        </div>

        <div class="product--info">
          <p class="product--description">Color:</p>
          <p class="product--color">
            <b>{{ product.color[0] }}</b>
          </p>
          <p class="product--description">Size:</p>
          <p class="product--size">
            <b>{{ product.size }}</b>
          </p>
          <p class="product--description">Amount:</p>
          <p class="product--amount">
            <b>{{ product.amount }}</b>
          </p>
        </div>
      </section>
    </template>
    <template #buttons>
      <buttonSimple
        class="option-completion--cta"
        :buttonText="'view cart'"
        @simplebuttonevent="goTo('cart')"
    /></template>
    <template #extra>
      <h4 class="more-shirts--headline">
        Here are some community favourites, you might be interested in
      </h4>
      <div class="more-shirts--shirts">
        <div
          class="shirt-wrapper"
          v-for="color in communityColors"
          @click="changeToCommunityColor(color)"
        >
          <image-overlay
            :image_full="require('@/assets/images/kA9asUxmVka.png')"
            :image_regular="require('@/assets/images/kA9asUxmVka.png')"
            :image_small="require('@/assets/images/kA9asUxmVka.png')"
            :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
            :svg="supportData[3].svg"
            :alt_description="supportData[3].alt_description"
            :overlay_color="color || ['white', '#ffffff']"
            class="image-overlay more-shirts--image"
          />
          <h4 class="shirt--headline ">{{ color[0] }}</h4>
        </div>
      </div>
    </template>
  </modal-layout>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";
import modalLayout from "@/components/modal/modalLayout.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    buttonSimple,
    imageOverlay,
    modalLayout,
    styledHeadline
  },
  props: {
    product: {
      type: Object,
      default: () => ({
        amount: 1,
        size: "M",
        color: ["darkslategray", "#2F4F4F"]
      })
    }
  },
  name: "sizeOptions",
  data() {
    return {
      communityColors: [["darkslategray", "#2F4F4F"], ["lavender", "#E6E6FA"]]
    };
  },

  methods: {
    changeToCommunityColor(color) {
      this.$store
        .dispatch("productModule/COLORS_setCurrent", color)
        .then(() => {
          this.goTo("store", {
            color: color[0],
            colorArray: color
          });
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
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor",
      allColors: "productModule/getColorPalette"
    }),
    responsiveHeadline() {
      if (window.innerWidth > 700) {
        return "h2";
      }
      return "h1";
    },
    randomColor() {
      const colorValues = Object.getOwnPropertyNames(this.allColors);
      const randomValue =
        colorValues[Math.floor(Math.random() * colorValues.length)];
      const color = this.allColors[randomValue];

      return [randomValue, color];
    },
    defaultColor() {}
  }
};
</script>

<style scoped>
@media (min-width: 64em) {
  .option-completion {
    /* Positioning */
    /* Box-model */
    max-width: 36rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.header--headline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  font-size: var(--h2__fontSize);
  /* Visual */

  /* Misc */
}

.option-completion--product__layout {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr 0.61fr;
  grid-template-rows: min-content min-content;
  grid-gap: var(--1base);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--image {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  max-width: 12rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

.product--price {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: center;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--info {
  /* Positioning */
  grid-column: 1/3;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 0.61fr 1fr;
  grid-auto-rows: min-content;
  grid-column-gap: var(--1base);
  /* Box-model */
  padding: var(--1base);
  /* Typography */

  /* Visual */
  border: 1px solid var(--grey-800);
  /* Misc */
}

@media (min-width: 45em) {
  .product--image {
    /* Positioning */
    grid-column: 1/2;
    grid-row: 1/3;
    /* Box-model */
    min-width: 15rem;
    max-width: 15rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--price {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 1/2;
    /* Box-model */
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--info {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 2/3;

    /* Box-model */
    height: min-content;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.more-shirts--shirts {
  /* Positioning */
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-column-gap: var(--1base);
  /* Box-model */
  max-width: 90vw;
  height: 10rem;
  /* Typography */

  /* Visual */
  /* Misc */
}

.shirt-wrapper {
  /* Positioning */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Box-model */
  min-width: 7rem;
  height: 10rem;
  /* Typography */
  text-align: center;

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .more-shirts--shirts {
    /* Positioning */

    /* Box-model */
    max-width: 20rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .shirt-wrapper {
    /* Positioning */

    /* Box-model */
    min-width: 8rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.default-input-style {
  /* Positioning */

  /* Box-model */
  width: var(--5base);
  height: var(--5base);
  padding: var(--thirdbase) 0;
  text-align: center;
  margin: 0 var(--fourthbase);
  /* Typography */
  font-weight: bold;
  /* Visual */
  border-radius: var(--fourthbase);
  color: var(--grey-800);
  /* Misc */
}

@media (min-width: 22.5em) {
  .default-input-style {
    /* Positioning */

    /* Box-model */
    width: var(--6base);
    height: var(--6base);
    padding: var(--halfbase) 0;
    text-align: center;
    margin: 0 var(--fourthbase);
    /* Typography */
    /* Visual */
    border-radius: var(--fourthbase);
    color: var(--grey-800);
    /* Misc */
  }
  .sizes--inputs__label::after {
    /* Positioning */
    /* Box-model */

    width: var(--6base);
    height: var(--6base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}
</style>
