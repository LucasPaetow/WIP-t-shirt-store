<template>
  <article class="status">
    <header class="status--header">
      <h2 class="status--headline">
        Nice!
      </h2>
      <p class="status--headline">
        We send you a confirmation message and your recipt to your email adress:
      </p>
      <p class="status--headline"><b>firstname.lastname@mail.com</b></p>
    </header>

    <section class="recap--cart">
      <div class="cart--entry"></div>
      <div class="cart--entry"></div>
    </section>

    <section class="status--buttons">
      <button-simple
        class="status--button-cta"
        :buttonText="'Track my order'"
        @simplebuttonevent="goTo('check')"
      />
      <p class="button-text">
        It can take up to 2h until you can track your order. If you dont see it,
        please wait a little longer
      </p>
      <button-simple
        class="status--button-cta"
        :buttonText="'Go back'"
        @simplebuttonevent="goTo('home')"
      />
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import inputField from "@/components/inputs/InputDefault.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    inputField,
    totalAmount,
    buttonSimple,
    pageTransition
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
.status {
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

.status--header {
  /* Positioning */
  grid-column: 2/3;

  /* Box-model */
  padding: 3vh 0;
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

.status--buttons {
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
