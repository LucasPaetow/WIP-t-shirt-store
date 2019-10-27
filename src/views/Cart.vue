<template>
  <article class="cart main" v-if="shoppingCart.length">
    <header class="cart--header main--header">
      <h2 class="header--headline">
        You have {{ shoppingCart.length }}
        {{ shoppingCart.length > 1 ? "items" : "item" }} in your cart
      </h2>
    </header>
    <aside class="cart--background main--background"></aside>
    <section class="cart--entries main--content">
      <cartEntry
        v-for="(entry, index) in shoppingCart"
        :key="'shoppingEntry' + index"
        :entry="entry"
        :index="index"
      />
    </section>
    <section class="cart-sidebar main--sidebar">
      <div class="product-info main--sidebar__sticky">
        <totalAmount class="payment--amount__layout" />
        <div class="cart--button-wrapper">
          <button-simple
            class="cart--button-cta"
            :buttonText="'checkout and login'"
            @simplebuttonevent="goTo('address')"
          />
          <button-simple
            class="cart--button-cta"
            :buttonText="'checkout as guest'"
            buttonType="secondary"
            @simplebuttonevent="goTo('address')"
          />
        </div>
      </div>
    </section>
    <section class="cart--total-amount"></section>
  </article>
  <article class="cart-empty" v-else>
    <header class="cart--header">
      <h2 class="header--headline">You dont have any items in your cart</h2>
      <p class="header--subline">
        If you saved you favourit tshirt on another device before, you can log
        in to restore it
      </p>
    </header>
    <section class="cart--button-wrapper">
      <button-simple
        class="cart--button-cta"
        :buttonText="'login'"
        @simplebuttonevent="goTo('login')"
      />
      <button-simple
        class="cart--button-cta"
        :buttonText="'choose a color'"
        buttonType="secondary"
        @simplebuttonevent="goBack()"
      />
    </section>
    <section class="cart--upsell z-index-2">
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
    </section>
    <aside class="cart--upsell__background z-index-1"></aside>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";
import modalLayout from "@/components/modal/modalLayout.vue";
import styledHeadline from "@/components/headline/headline.vue";
import cartEntry from "@/components/cart/cartEntry.vue";
import totalAmount from "@/components/cart/totalAmount.vue";

export default {
  components: {
    buttonSimple,
    imageOverlay,
    modalLayout,
    styledHeadline,
    cartEntry,
    totalAmount
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "cart",
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
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    },
    goBack() {
      if (this.currentColor) {
        this.goTo("store", {
          color: this.currentColor[0],
          colorArray: this.currentColor
        });
        return;
      }
      this.goTo("home");
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: "userModule/getShoppingCart",
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor"
    })
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.cart--entries {
  /* Positioning */

  /* Box-model */
  padding: 0 0 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.cart--button-wrapper {
  /* Positioning */
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: var(--1base);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.cart-empty .cart--upsell {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 5vh 0;

  /* Typography */

  /* Visual */

  /* Misc */
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

.cart-empty .cart--upsell__background {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 3/4;
  /* Box-model */
  height: 100%;
  /* Typography */
  background-color: hsla(0, 0%, 90%, 1);
  /* Visual */
}
</style>
