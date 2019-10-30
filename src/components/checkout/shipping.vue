<template>
  <form class="shipping--options shipping--section">
    <header class="shipping-options--header">
      <h3 class="header--headline">
        Your best option
      </h3>
      <p class="header--subline">for the adress you gave us</p>
    </header>

    <label for="shipping-option-1" class="shipping--label">
      <input
        type="radio"
        id="shipping-option-1"
        value="regular"
        v-model="shipping"
        class="label--indicator"
      />
      <h4 class="label--headline">Regular Shipping</h4>

      <p class="label--text">
        Takes 1 day if you order in the next 3 h and 42 min.
      </p>
    </label>

    <header class="shipping-options--header">
      <h3 class="header--headline">
        Your other shipping option
      </h3>
      <p class="header--subline">for the adress you gave us</p>
    </header>

    <label for="shipping-option-2" class="shipping--label">
      <input
        type="radio"
        id="shipping-option-2"
        value="express"
        v-model="shipping"
        class="label--indicator"
      />
      <h4 class="label--headline">Express Shipping</h4>
      <p class="label--text">
        Will be at your place at 9 AM so you are ready to rock
      </p>
    </label>

    <label for="shipping-option-3" class="shipping--label">
      <input
        type="radio"
        id="shipping-option-3"
        value="custom"
        v-model="shipping"
        class="label--indicator"
      />
      <h4 class="label--headline">Custom Shipping</h4>
      <p class="label--text">
        Will be at your place at a date of your choosing between 20th and 27th
      </p>
      <input
        type="date"
        id="date-picker"
        class="label--date-picker"
        value="21.11.2019"
        min="21.11.2019"
        max="28.11.2019"
      />
    </label>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    totalAmount,
    buttonSimple,
    styledHeadline
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutShipping",
  data() {
    return {
      shipping: "regular"
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
.shipping {
  /* Positioning */
  /* Box-model */
  padding: 0;
  padding-bottom: 10vh;
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap--address {
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

.shipping--options {
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

.shipping-options--header {
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

.shipping--amount__layout {
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

.label--date-picker {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.shipping--buttons {
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
