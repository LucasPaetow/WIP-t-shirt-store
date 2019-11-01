<template>
  <article class="" v-if="!supportData">
    <h1>loading</h1>
  </article>
  <article class="cart main" v-else>
    <page-transition>
      <header class="cart--header main--header" v-if="shoppingCart.length">
        <styledHeadline
          :headlineText="
            `You have ${shoppingCart.length}
            ${shoppingCart.length > 1 ? 'items' : 'item'} in your cart`
          "
        />
      </header>
      <header class="cart--header main--header" v-else>
        <styledHeadline headlineText="Your cart is empty" />
      </header>
    </page-transition>

    <aside class="cart--background main--background"></aside>
    <page-transition>
      <section class="cart--entries main--content" v-if="shoppingCart.length">
        <cartEntry
          v-for="(entry, index) in shoppingCart"
          :key="'shoppingEntry' + index"
          :entry="entry"
          :index="index"
        />
      </section>
      <section class="cart--entries main--content" v-else>
        <p class="header--subline">
          If you saved you favourite t-shirt on another device before, you can
          log in to restore it
        </p>
        <div class="cart--button-wrapper">
          <button-simple
            class="cart--button-cta"
            :buttonText="'login'"
            @simplebuttonevent="checkoutUser()"
          />
          <button-simple
            class="cart--button-cta"
            :buttonText="'choose a color'"
            buttonType="secondary"
            @simplebuttonevent="goBack()"
          />
        </div>

        <div class="product-info">
          <h4 class="more-shirts--headline">
            Here are some community favourites, you might be interested in
          </h4>
          <div class="more-shirts--shirts">
            <div
              class="shirt-wrapper"
              v-for="(color, index) in communityColors"
              :key="'communityColor' + index"
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
        </div>
      </section></page-transition
    >

    <section class="cart-sidebar main--sidebar">
      <div class="product-info main--sidebar__sticky">
        <totalAmount class="payment--amount__layout" />
        <page-transition>
          <div class="cart--button-wrapper" v-if="shoppingCart.length">
            <button-simple
              class="cart--button-cta"
              :buttonText="'checkout and login'"
              @simplebuttonevent="checkoutUser()"
            />
            <button-simple
              class="cart--button-cta"
              :buttonText="'checkout as guest'"
              buttonType="secondary"
              @simplebuttonevent="checkoutGuest()"
            />
          </div>
        </page-transition>
      </div>
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";
import styledHeadline from "@/components/headline/headline.vue";
import cartEntry from "@/components/cart/cartEntry.vue";
import totalAmount from "@/components/cart/totalAmount.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    buttonSimple,
    imageOverlay,
    styledHeadline,
    cartEntry,
    totalAmount,
    pageTransition
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
    checkoutGuest() {
      this.$store.dispatch("authModule/USER_guest").then(() => {
        this.goTo("address");
      });
    },
    checkoutUser() {
      //check if the user is already logged in
      if (this.userProfile) {
        //if so, just go to the checkout
        this.goTo("address");
        return;
      }

      //If not, send him to the login page
      this.goTo("login", { nextPage: "checkout" });
    },

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
    goTo(locationName, params) {
      this.$router.push({
        name: locationName,
        params
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
      currentColor: "productModule/getCurrentColor",
      loading: "initModule/getCompleteLoadingState",
      userProfile: "authModule/getUserProfile"
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
  display: grid;
  grid-row-gap: 3vh;
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
</style>
