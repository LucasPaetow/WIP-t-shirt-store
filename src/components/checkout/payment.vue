<template>
  <article class="payment main">
    <header class="payment--header main--header">
      <styledHeadline headlineText="Your payment option"></styledHeadline>
    </header>

    <aside class="payment--background main--background"></aside>

    <section class="main--content">
      <div class="recap--shipping">
        <h4 class="recap--headline">Your shipping choice</h4>
        <router-link class="recap--change" :to="{ name: 'shipping' }"
          >(change)</router-link
        >
        <label for="shipping-option-recap" class="payment--label">
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
      </div>

      <form class="payment--options ">
        <header class="payment-options--header">
          <h2 class="header--headline">
            Your payment option for the 60$
          </h2>
          <p class="header--subline">for the soon-to-be-yours t-shirts</p>
        </header>

        <label for="payment-option-1" class="payment--label">
          <input
            type="radio"
            id="payment-option-1"
            value="paypal"
            v-model="payment"
            class="label--indicator"
          />
          <div class="label--icon">
            <svg class="icon" width="80" height="60" viewBox="0 0 80 60"></svg>
          </div>
        </label>

        <label for="payment-option-2" class="payment--label">
          <input
            type="radio"
            id="payment-option-2"
            value="credit"
            v-model="payment"
            class="label--indicator"
          />
          <div class="label--icon">
            <svg class="icon" width="80" height="60" viewBox="0 0 80 60"></svg>
            <svg class="icon" width="80" height="60" viewBox="0 0 80 60"></svg>
          </div>
        </label>

        <label for="payment-option-3" class="payment--label">
          <input
            type="radio"
            id="payment-option-3"
            value="gift"
            v-model="payment"
            class="label--indicator"
          />
          <h4 class="label--headline">Gift card</h4>
          <p class="label--text">From the awesome people close to you</p>
        </label>
      </form>

      <div class="payment--choices">
        <page-transition>
          <div class="payment--choice--credit" v-if="payment === 'credit'">
            <inputField
              class="credit--name"
              v-model="credit.number"
              :input="{
                label: 'Card number',
                type: 'number',
                placeholder: 'xxxx-xxxx-xxxx-xxxx',
                id: 'credit-name'
              }"
            />
            <inputField
              class="credit--date"
              v-model="credit.date"
              :input="{
                label: 'Expires in',
                type: 'text',
                placeholder: 'MM/YYYY',
                id: 'credit-date'
              }"
            />
            <inputField
              class="credit--code"
              v-model="credit.code"
              :input="{
                label: 'Code',
                type: 'password',
                placeholder: '***',
                id: 'credit-code'
              }"
            />
          </div>
          <div class="payment--choice--paypal" v-else-if="payment === 'paypal'">
            <h4 class="paypal--headline">Pay with paypal</h4>
            <p class="paypal--text">
              You will get redirected to paypal once you confirm your order
            </p>
          </div>
          <div class="payment--choice--gift" v-else>
            <h4 class="gift--headline"></h4>
            <p class="gift--body"></p>
            <inputField
              class="credit--name"
              v-model="gift"
              :input="{
                label: 'Gift card number',
                type: 'number',
                placeholder: 'xxxx-xxxx-xxxx-xxxx',
                id: 'gift-number'
              }"
            />
          </div>
        </page-transition>
      </div>
    </section>

    <section class="main--sidebar">
      <div class="main--sidebar__sticky">
        <totalAmount class="payment--amount__layout" />
        <section class="payment--buttons">
          <button-simple
            class="payment--button-cta"
            :buttonText="'Check my order'"
            @simplebuttonevent="goTo('confirmation')"
          />
        </section>
      </div>
    </section>
    <section class="product-images main--content"></section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import inputField from "@/components/inputs/InputDefault.vue";
import pageTransition from "@/components/transitions/transition.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    inputField,
    totalAmount,
    buttonSimple,
    pageTransition,
    styledHeadline
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutpayment",
  data() {
    return {
      payment: "credit",
      recap: "recap",
      credit: {
        number: "",
        date: "",
        code: ""
      },
      gift: ""
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
.payment {
  /* Positioning */

  /* Box-model */
  padding: 0;
  padding-bottom: 10vh;
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap--shipping {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.payment--options {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.payment-options--header {
  /* Positioning */
  /* Box-model */
  padding: 0 0 var(--1base) 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */

  /* Box-model */
  padding: 0 0 var(--fourthbase) 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.payment--label {
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

.label--icon {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 1/3;
  display: flex;
  flex-direction: row;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.label--icon svg {
  /* Positioning */

  /* Box-model */
  margin-right: var(--1base);
  /* Typography */

  /* Visual */

  background-color: var(--grey-600);
  /* Misc */
}

.payment--choices {
  /* Positioning */

  /* Box-model */
  padding: 5vh var(--column-spacing);
  min-height: 18em;
  /* Typography */

  /* Visual */
  background-color: var(--grey-300);
  /* Misc */
}

.payment--choice--credit {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  grid-gap: var(--1base);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.credit--name {
  /* Positioning */
  grid-column: 1/3;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.payment--buttons {
  /* Positioning */
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
