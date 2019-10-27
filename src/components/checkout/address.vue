<template>
  <article class="address main">
    <header class="address--header main--header">
      <styledHeadline headlineText="    About you"></styledHeadline>
      <styledHeadline
        headlineText="the future member of the being-stunningly-well-dressed-club:"
        :invertedColor="true"
      ></styledHeadline>
    </header>

    <aside class="store--background main--background"></aside>

    <section class="product-images main--content">
      <div class="address--identity">
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
        <styledHeadline
          class="place--headline"
          headlineText=" Where should we ship your t-shirts to?"
        ></styledHeadline>
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
    <section class="main--sidebar">
      <div class="main--sidebar__sticky">
        <totalAmount class="address--amount__layout" />

        <section class="address--buttons">
          <button-simple
            class="address--button-cta"
            :buttonText="'Show my shipping options'"
            @simplebuttonevent="goTo('shipping')"
          />
        </section>
      </div>
    </section>
  </article>
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
  padding: 0 var(--paddingX);
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
