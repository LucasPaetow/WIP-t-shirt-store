<template>
  <section class="cart-entry-first">
    <header>
      <h4 class="header--headline">
        Your awesome {{ entry.color[0] }} t-shirt ({{ entry.size }})
      </h4>
    </header>

    <section class="cart-entry-first--product">
      <image-overlay
        :image_full="require('@/assets/images/kA9asUxmVka.png')"
        :image_regular="require('@/assets/images/kA9asUxmVka.png')"
        :image_small="require('@/assets/images/kA9asUxmVka.png')"
        :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
        :svg="supportData[3].svg"
        :alt_description="supportData[3].alt_description"
        :overlay_color="entry.color || ['white', '#ffffff']"
        class="image-overlay product--image"
      />
      <div class="product--price">
        <styledHeadline
          :headlineText="`${entry.amount * 20}`"
          :headlineType="responsiveHeadline"
          :invertedColor="true"
          class="product--headline"
        >
          <i>$</i></styledHeadline
        >
        <p
          class="product--shipping-label"
          v-if="!shoppingCartCalulations.freeShipping"
        >
          +shipping
        </p>
      </div>
    </section>

    <div class="product--info">
      <p class="product--description">Color:</p>
      <p class="product--color">
        <b>{{ entry.color[0] }}</b>
      </p>
      <p class="product--description">Size:</p>
      <p class="product--size">
        <b>{{ entry.size }}</b>
      </p>
      <p class="product--description">Amount:</p>
      <p class="product--amount">
        <b>{{ entry.amount }}</b>
      </p>
    </div>

    <section>
      <buttonSimple
        class="cart-entry-first--cta"
        :buttonText="`delete`"
        buttonType="secondary"
        @simplebuttonevent="$emit('entryfirstdeleteevent')"
      />
      <buttonSimple
        class="cart-entry-first--cta"
        :buttonText="'edit'"
        @simplebuttonevent="$emit('entryfirsteditevent')"
      />
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    buttonSimple,
    imageOverlay,
    styledHeadline
  },

  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  name: "cartEntryFirst",
  data() {
    return {};
  },

  methods: {},
  computed: {
    ...mapGetters({
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor",
      allColors: "productModule/getColorPalette",
      shoppingCartCalulations: "userModule/getShoppingCartCalulations"
    }),
    responsiveHeadline() {
      if (window.innerWidth > 700) {
        return "h2";
      }
      return "h1";
    }
  },
  mounted() {
    console.log("entryFirst: " + this.entry);
  }
};
</script>

<style scoped>
.cart-entry-first {
  /* Positioning */
  display: grid;
  grid-row-gap: var(--halfbase);
  /* Box-model */
  max-width: 30rem;
  padding: var(--halfbase);
  /* Typography */

  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  /* Visual */

  /* Misc */
}

.cart-entry-first--product {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-column-gap: var(--halfbase);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--image {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: end;
  /* Box-model */
  max-width: 6rem;
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
  display: grid;
  grid-template-columns: 0.61fr 1fr;
  grid-auto-rows: min-content;
  grid-column-gap: var(--1base);
  /* Box-model */
  padding: var(--halfbase);
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
