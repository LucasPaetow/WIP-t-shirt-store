<template>
  <article class="checkout default-view layout">
    <header class="checkout--header default-header">
      <div class="checkout--progress z-index-3">
        <router-link
          :to="{ name: 'address' }"
          class="checkout--progress-link checkout--progress-link1 active"
          id="progress-address"
          ><p class="link-text z-index-3">1. address</p>
        </router-link>
        <router-link
          :to="{ name: 'shipping' }"
          class="checkout--progress-link checkout--progress-link2"
          :class="activeProgressLink"
          id="progress-shipping"
          ><p class="link-text z-index-3">2. shipping</p>
        </router-link>
        <router-link
          :to="{ name: 'payment' }"
          class="checkout--progress-link checkout--progress-link3"
          id="progress-payment"
          ><p class="link-text z-index-3">3. payment</p>
        </router-link>
      </div>
    </header>

    <aside class="checkout--background default-background"></aside>

    <section class="checkout--content layout--span1__center">
      <page-transition>
        <router-view />
      </page-transition>
    </section>

    <section class="layout--span1__right">
      <div class="checkout-recap recap-wrapper">
        <recap headline="Amount"><totalAmount></totalAmount></recap>
        <recap headline="Address"> </recap>
        <recap headline="Shipping"></recap>
        <recap :last="true" headline="Payment"></recap>
      </div>
    </section>

    <footer class="footer default-footer layout layout--full">
      <h4 class="footer--headline layout--span1__center">
        This is only a mockup
      </h4>
      <p class="footer--body layout--span1__center">
        You can not order a real product so please don't input your real
        information
      </p>
    </footer>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";
import totalAmount from "@/components/cart/totalAmount.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    pageTransition,
    totalAmount,
    recap
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkout",
  data() {
    return {};
  },
  methods: {
    //navigation
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  },
  computed: {
    ...mapGetters({}),
    activeProgressLink() {
      return this.$route.name === "payment" ? "active" : "";
    }
  },
  mounted() {
    console.log(this.$route.name);
  },
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.checkout-recap {
  /* Positioning */

  /* Box-model */
  max-width: 30rem;
  /* Typography */
  /* Visual */

  /* Misc */
}

.checkout--content {
  /* Positioning */
  /* Box-model */
  max-width: 30rem;
  /* Typography */
  /* Visual */

  /* Misc */
}

.checkout--progress {
  /* Positioning */

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  align-self: start;
  /* Box-model */
  height: var(--6base);
  /* Typography */

  /* Visual */

  /* Misc */
}

.checkout--progress-link {
  /* Positioning */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Box-model */
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  border: 2px solid var(--grey-500);
  border-right: transparent;
  /* Typography */

  /* Visual */

  /* Misc */
}

.checkout--progress-link:last-of-type {
  /* Positioning */
  /* Box-model */
  border-right: 2px solid var(--grey-500);
  /* Typography */

  /* Visual */

  /* Misc */
}

.active .link-text,
.router-link-exact-active .link-text {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  color: var(--grey-0);
  /* Misc */
}

.checkout--progress-link::after {
  /* Positioning */
  position: absolute;
  top: 0;
  left: 0;
  /* Box-model */
  content: " ";
  width: 100%;
  height: 100%;
  z-index: 1;

  /* Typography */

  /* Visual */
  background-color: var(--green-700);
  transition: opacity 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  opacity: 0;
  /* Misc */
}

.router-link-exact-active.checkout--progress-link::after,
.active.checkout--progress-link::after {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  transition: opacity 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  opacity: 1;
  /* Misc */
}

.link-text {
  font-size: var(--halfbase);
}

@media (min-width: 22.5em) {
  .link-text {
    font-size: var(--1base);
  }
}

.footer {
  /* Positioning */
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: var(--4base);
  /* Box-model */
  padding-bottom: 5vh;
  /* Typography */

  /* Visual */
  background-color: grey;
  /* Misc */
}

.footer--headline {
  /* Positioning */
  /* Box-model */
  margin-bottom: var(--halfbase);
  /* Typography */
  font-size: var(--h2__fontSize);
  /* Visual */

  /* Misc */
}

.footer--body {
  /* Positioning */
  display: flex;
  flex-direction: column;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
