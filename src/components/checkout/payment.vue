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
          :radioExtended="paymentData.type === 'credit' ? true : false"
        >
          <div class="payment--choice--credit">
            <h2>Credit to you</h2>
            <p>
              For becoming too good looking
            </p>

            <inputField
              class="credit--number"
              v-model="paymentData.credit.number"
              :input="{
                label: 'Card number',
                type: 'number',
                placeholder: 'xxxx-xxxx-xxxx-xxxx',
                id: 'credit-number'
              }"
            />
            <inputField
              class="credit--name"
              v-model="paymentData.credit.name"
              :input="{
                label: 'Card name',
                type: 'text',
                placeholder: 'name name',
                id: 'credit-name'
              }"
            />
            <div class="small-input-wrapper">
              <inputField
                class="credit--date"
                v-model="paymentData.credit.date"
                :input="{
                  label: 'Expires in',
                  type: 'text',
                  placeholder: 'MM/YYYY',
                  id: 'credit-date'
                }"
              />
              <inputField
                class="credit--code"
                v-model="paymentData.credit.code"
                :input="{
                  label: 'Code',
                  type: 'password',
                  placeholder: '***',
                  id: 'credit-code'
                }"
              />
            </div>
          </div>
        </recap>
        <recap
          headline="Paypal"
          :radioMode="true"
          radioValue="paypal"
          @radiorecapevent="changeRadio"
          :radioExtended="paymentData.type === 'paypal' ? true : false"
        >
          <div class="payment--choice--credit">
            <h2>Pay with paypal</h2>
            <p>
              After checking your order you will be redirected to log into your
              paypal account. They will gratulate your looking divine.
            </p>
          </div>
        </recap>
        <recap
          headline="Gift card"
          :last="true"
          :radioMode="true"
          radioValue="gift"
          @radiorecapevent="changeRadio"
          :radioExtended="paymentData.type === 'gift' ? true : false"
        >
          <div class="payment--choice--credit">
            <h2>Awesome gift</h2>
            <p>
              People thought of you and wanted to increase your appeal from
              expert to mastery
            </p>
            <inputField
              class="credit--name"
              v-model="paymentData.gift.number"
              :input="{
                label: 'Giftcard number',
                type: 'number',
                placeholder: 'xxxx-xxxx-xxxx-xxxx',
                id: 'gift-number'
              }"
            />
          </div>
        </recap>
      </div>
    </form>
    <div class="payment--buttons">
      <button-simple
        class="payment--button-cta"
        :buttonText="'check my order'"
        @simplebuttonevent="nextStep()"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import inputField from "@/components/inputs/InputDefault.vue";
import recap from "@/components/checkout/recap.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    inputField,
    recap,
    buttonSimple
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutpayment",
  data() {
    return {
      paymentData: {
        type: "credit",
        credit: {
          name: "",
          number: "",
          date: "",
          code: ""
        },
        gift: {
          number: ""
        }
      }
    };
  },
  methods: {
    changeRadio(radioValue) {
      this.paymentData.type = radioValue;
    },
    nextStep() {
      //add the shipping data to the store
      console.log(this.paymentData);
      this.$store
        .dispatch("userModule/USER_setCurrentData", {
          type: "payment",
          data: this.paymentData
        })
        .then(result => {
          //go to shipping
          this.$router.push({ name: "confirmation" });
        });
    },
    setPayment() {
      //check if there is data present, if not return early
      if (!this.getPayment) {
        return;
      }

      this.paymentData.type = this.getPayment.type;

      //check for a credit entry
      if (this.getPayment.type === "credit") {
        this.paymentData.credit.number = this.getPayment.credit.number;
        this.paymentData.credit.name = this.getPayment.credit.name;
        this.paymentData.credit.date = this.getPayment.credit.date;
        this.paymentData.credit.code = this.getPayment.credit.code;
      }
      //check for a gift card entry
      if (this.getPayment.type === "gift") {
        this.paymentData.gift.number = this.getPayment.gift.number;
      }
    }
  },
  computed: {
    ...mapGetters({
      getPayment: "userModule/getPayment"
    })
  },
  mounted() {
    this.setPayment();
  },
  activated() {
    this.setPayment();
  }
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

  grid-template-rows: min-content;
  grid-gap: var(--1base);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.small-input-wrapper {
  /* Positioning */

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--1base);
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
