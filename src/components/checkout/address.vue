<template>
  <section class="product-images address-content ">
    <div class="address--identity">
      <h3 class="address--headline">About you</h3>

      <inputField
        class="identity--name"
        v-model="identity.name"
        :input="{
          label: 'Your Password',
          type: 'text',
          placeholder: 'Name',
          id: 'identity-name'
        }"
      />
      <inputField
        class="identity--email"
        v-model="identity.email"
        :input="{
          label: 'Your Password',
          type: 'text',
          placeholder: 'Name',
          id: 'identity-email'
        }"
      />
    </div>

    <div class="address--place address--section">
      <h3 class="place--headline">Where should we ship your t-shirts to?</h3>
      <inputField
        class="place--street"
        v-model="place.street"
        :input="{
          label: 'Your Street',
          type: 'text',
          placeholder: 'Street',
          id: 'place-street'
        }"
      />
      <inputField
        class="place--zip"
        v-model="place.zip"
        :input="{
          label: 'Zip code',
          type: 'text',
          placeholder: '12345',
          id: 'place-zip'
        }"
      />
      <inputField
        class="place--city"
        v-model="place.city"
        :input="{
          label: 'Your City',
          type: 'text',
          placeholder: 'city',
          id: 'place-city'
        }"
      />
    </div>

    <section class="address--buttons">
      <button-simple
        class="address--button-cta"
        :buttonText="'Show my shipping options'"
        @simplebuttonevent="goTo('shipping')"
      />
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import inputField from "@/components/inputs/InputDefault.vue";
import totalAmount from "@/components/cart/totalAmount.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    inputField,
    totalAmount,
    buttonSimple,
    styledHeadline
  },
  //if the basics are being edited, this array contains existing basic information
  props: {
    position: Number
  },
  name: "checkoutAddress",
  data() {
    return {
      identity: {
        name: "",
        email: ""
      },
      place: {
        street: "",
        zip: "",
        city: ""
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
.address {
  /* Positioning */
  /* Box-model */
  padding: 0;
  padding-bottom: 10vh;
  /* Typography */

  /* Visual */

  /* Misc */
}

.address--identity {
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

.address--place {
  /* Positioning */

  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  grid-column-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;

  /* Typography */

  /* Visual */

  /* Misc */
}
.place--headline {
  /* Positioning */
  grid-column: 1/3;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.place--street {
  /* Positioning */
  grid-column: 1/3;
  grid-row: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.address--buttons {
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
