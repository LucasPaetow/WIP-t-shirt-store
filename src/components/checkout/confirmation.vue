<template>
  <article class="confirmation">
    <section class="recap--cart">
      <div class="cart--entry"></div>
      <div class="cart--entry"></div>
    </section>

    <section class="recap--address" v-if="true">
      <h4 class="recap--headline">Your address</h4>
      <router-link class="recap--change" :to="{ name: 'address' }"
        >(change)</router-link
      >
      <ul class="recap--address-wrapper">
        <li class="address--name">Name</li>
        <li class="address--street">Streeeeeeeeeeeeeeeeeeeeeeeet</li>
        <li class="address--city-zip">12345, Place</li>
      </ul>
    </section>
    <section class="recap--address no-address" v-else>
      <h4 class="recap--headline">Your address is missing</h4>
      <router-link class="recap--change" :to="{ name: 'address' }"
        >(add)</router-link
      >
    </section>

    <section class="recap--shipping">
      <h4 class="recap--headline">Your shipping choice</h4>
      <router-link class="recap--change" :to="{ name: 'shipping' }"
        >(change)</router-link
      >
      <label for="shipping-option-recap" class="shipping--label">
        <input
          type="radio"
          id="shipping-option-recap"
          value="recap"
          v-model="recap"
          class="label--indicator"
        />
        <h4 class="label--headline">Regular Shipping</h4>

        <p class="label--text">
          Takes 1 day if you order in the next 3 h and 42 min.
        </p>
      </label>
    </section>

    <totalAmount class="confirmation--amount__layout" />

    <section class="confirmation--buttons">
      <button-simple
        class="confirmaton--button-cta"
        :buttonText="'order my t-shirts'"
        @simplebuttonevent="goTo('status')"
      />
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    totalAmount,
    buttonSimple
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutpayment",
  data() {
    return {
      payment: "paypal",
      recap: "recap",
      credit: {
        number: "",
        date: "",
        code: ""
      }
    };
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
    ...mapGetters({})
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.confirmation {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-row-gap: 3vh;
  /* Box-model */
  padding: 3vh 0 10vh 0;
  min-height: 100vh;
  width: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap--cart {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh var(--1base);
  /* Typography */

  /* Visual */
  background-color: var(--grey-300);
  /* Misc */
}

.cart--entry {
  /* Positioning */

  /* Box-model */
  padding: var(--1base);
  height: 10rem;
  /* Typography */

  /* Visual */
  background-color: var(--grey-500);
  /* Misc */
}

.recap--address {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap--shipping {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.confirmation--amount__layout {
  /* Positioning */
  grid-column: 2/3;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.shipping--label {
  /* Positioning */
  display: grid;
  grid-template-columns: 2rem 1fr;
  grid-template-rows: min-content min-content;
  /* Box-model */
  padding: var(--1base);
  /* Typography */

  /* Visual */
  background-color: var(--grey-500);
  /* Misc */
}

.label--indicator {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/3;
  justify-self: start;
  align-self: center;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.label--headline {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 1/2;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.label--text {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 2/3;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.confirmation--buttons {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
