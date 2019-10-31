<template>
  <section class="shipping--options shipping--section">
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
        v-model="shippingType"
        class="label--indicator"
      />
      <h4 class="label--headline">
        Regular Shipping - {{ pricingData.shipping.regular }}$
      </h4>

      <p class="label--text">
        Takes {{ getItTomorrow ? "1 day" : "2 days" }} if you order in the next
        {{ shippingTime.hours }}h and {{ shippingTime.minutes }} min.
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
        v-model="shippingType"
        class="label--indicator"
      />
      <h4 class="label--headline">
        Express Shipping - {{ pricingData.shipping.express }}$
      </h4>
      <p class="label--text">
        Will be at your place at 9 AM so you are ready to rock
      </p>
    </label>

    <label for="shipping-option-3" class="shipping--label">
      <input
        type="radio"
        id="shipping-option-3"
        value="custom"
        v-model="shippingType"
        class="label--indicator"
      />
      <h4 class="label--headline">
        Custom Shipping - {{ pricingData.shipping.custom }}$
      </h4>
      <p class="label--text">
        Will be at your place next week at a date of your choosing between
        {{ getXDaysFromNow(2) + dateEnding(getXDaysFromNow(2)) }}
        and
        {{ getXDaysFromNow(9) + dateEnding(getXDaysFromNow(9)) }}
      </p>
      <input
        type="date"
        id="date-picker"
        class="label--date-picker"
        v-model="customDate"
        :min="getXDatesFromNow(2)"
        :max="getXDatesFromNow(9)"
      />
    </label>

    <div class="shipping--buttons">
      <button-simple
        class="shipping--button-cta"
        :buttonText="'Show my payment options'"
      />
      <buttonClose></buttonClose>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    buttonSimple
  },
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutShipping",
  data() {
    return {
      shippingType: "regular",
      customDate: ""
    };
  },
  methods: {
    nextStep() {
      let inputElement = document.getElementById("date-picker");

      console.log(this.customDate);
      console.log(inputElement);

      /*let customDateCheck =
        this.shippingType === "custom" && this.customDate.length > 0;

      this.$store
        .dispatch("userModule/USER_setCurrentData", {
          type: "shipping",
          data: {
            type: this.shippingType,
            customDate: customDateCheck ? this.customDate : ""
          }
        })
        .then(result => {
          //go to shipping
          console.log(result);
          //this.$router.push({ name: "payment" });
      });*/
    },
    setDate() {
      //check if there is data present
      //if this doesnt work it needs to be set with vue.set()
      if (this.getShipping) {
        this.shippingType = this.getShipping.type;
      }

      //check for a custom date

      if (this.getShipping.customDate) {
        this.customDate = this.getShipping.customDate;
        return;
      }

      //if not accessed by previous functions, set to current day
      this.customDate = this.getXDatesFromNow(2);
    },

    dateEnding(day) {
      if (day === "01") {
        return "st";
      } else if (day === "02") {
        return "nd";
      } else if (day === "03") {
        return "rd";
      } else {
        return "th";
      }
    }
  },
  computed: {
    ...mapGetters({
      getItTomorrow: "timeModule/getItTomorrow",
      shippingTime: "timeModule/getShippingDeadline",
      getXDatesFromNow: "timeModule/getXDatesFromNow",
      getXDaysFromNow: "timeModule/getXDaysFromNow",
      pricingData: "productModule/getPricingData",
      getShipping: "userModule/getShipping"
    })
  },
  mounted() {
    this.setDate();
  },
  //same check for route-view keep-alive
  activated() {
    this.setDate();
  }
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
  grid-auto-rows: 5rem 5rem;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;
  /* Typography */

  /* Visual */
  background-color: grey;
  /* Misc */
}

.shipping--button-cta {
  /* Positioning */
  grid-row: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
