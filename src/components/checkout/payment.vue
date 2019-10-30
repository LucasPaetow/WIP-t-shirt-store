<template>
  <section class="payment">
    <form class="payment--options ">
      <header class="payment-options--header">
        <h3 class="header--headline">
          Your payment option for the 60$
        </h3>
        <p class="header--subline">for the soon-to-be-yours t-shirts</p>
      </header>

      <div class="recap-wrapper">
        <recap
          headline="Credit card"
          :radioMode="true"
          radioValue="credit"
          @radiorecapevent="changeRadio"
          :radioExtended="activeRadio === 'credit' ? true : false"
        >
          <div class="payment--choice--credit">
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
        </recap>
        <recap
          headline="Paypal"
          :radioMode="true"
          radioValue="paypal"
          @radiorecapevent="changeRadio"
          :radioExtended="activeRadio === 'paypal' ? true : false"
        >
          <div class="payment--choice--credit">
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
        </recap>
        <recap
          headline="Gift card"
          :last="true"
          :radioMode="true"
          radioValue="gift"
          @radiorecapevent="changeRadio"
          :radioExtended="activeRadio === 'gift' ? true : false"
        >
          <div class="payment--choice--credit">
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
        </recap>
      </div>
    </form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import inputField from "@/components/inputs/InputDefault.vue";
import pageTransition from "@/components/transitions/transition.vue";
import styledHeadline from "@/components/headline/headline.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    inputField,
    totalAmount,
    buttonSimple,
    pageTransition,
    styledHeadline,
    recap
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutpayment",
  data() {
    return {
      activeRadio: "credit",
      credit: {
        number: "",
        date: "",
        code: ""
      },
      gift: ""
    };
  },
  methods: {
    changeRadio(radioValue) {
      this.activeRadio = radioValue;
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
  padding: 5vh var(--2base);
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
