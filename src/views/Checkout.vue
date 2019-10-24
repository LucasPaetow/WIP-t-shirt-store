<template>
  <article class="checkout">
    <section class="checkout--progress">
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
    </section>
    <section class="checkout--view">
      <page-transition>
        <router-view />
      </page-transition>
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: { pageTransition },
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
      if (this.$route.name === "payment") {
        return "active";
      }
      return;
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
.checkout {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-template-rows: 3rem;
  grid-auto-rows: min-content;
  /* Box-model */
  padding: var(--7base) 0 0 0;
  min-height: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.checkout--progress {
  /* Positioning */

  grid-column: 1/4;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  /* Box-model */

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
  /* Typography */

  /* Visual */
  background-color: var(--grey-300);
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

.checkout--view {
  /* Positioning */
  grid-column: 1/4;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
