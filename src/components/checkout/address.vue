<template>
  <section class="product-images address-content ">
    <div class="address--identity" v-if="userProfile">
      <h3 class="address--headline">
        Welcome Back, {{ userProfile.name }}. Ready to stun everyone again?
      </h3>

      <div class="different-reciver">
        <inputField
          class="place--name z-index-1"
          v-model="identity.name"
          :input="{
            label: 'Your Name',
            type: 'text',
            placeholder: 'Forname Name',
            id: 'identity-name'
          }"
        />
        <div
          class="input-overlay z-index-2"
          @click="differentReciver = false"
          v-if="differentReciver"
        >
          <p class="input-overlay--text">changed your mind?</p>
        </div>
      </div>
    </div>

    <div class="address--identity" v-else>
      <h3 class="address--headline">
        About you, the future member of the being-stunningly-well-dressed-club:
      </h3>

      <inputField
        class="identity--name"
        v-model="identity.name"
        :input="{
          label: 'Your Name',
          type: 'text',
          placeholder: 'Forname Name',
          id: 'identity-name'
        }"
      />
      <inputField
        class="identity--email"
        v-model="identity.email"
        :input="{
          label: 'Your Email',
          type: 'email',
          placeholder: 'forname.name@email.com',
          id: 'identity-email'
        }"
      />
    </div>

    <div
      class="address--place address--section"
      v-if="previousAddressAvailable"
    >
      <h3 class="place--headline">
        The last time, we shipped your order to this address:
      </h3>

      <ul class="place--address__compact">
        <li>{{ previousAddress.name }}</li>
        <li>{{ previousAddress.street }}</li>
        <li>{{ previousAddress.city }}, {{ previousAddress.zp }}</li>
      </ul>

      <button-simple
        class="address--button__reuse"
        :buttonText="'Use it again'"
        @simplebuttonevent="nextStep('historyAddress')"
      />
      <button-simple
        class="address--button__discard"
        :buttonText="'use a different address'"
        @simplebuttonevent="previousAddressAvailable = false"
      />
    </div>
    <div class="address--place address--section" v-else>
      <h3 class="place--headline">Where should we ship your t-shirts to?</h3>

      <div class="different-reciver">
        <inputField
          class="place--name z-index-1"
          v-model="address.name"
          :input="{
            label: 'Name of the reciver',
            type: 'text',
            placeholder: 'Forname Name',
            id: 'address-name'
          }"
        />
        <div
          class="input-overlay z-index-2"
          @click="differentReciver = true"
          v-if="!differentReciver"
        >
          <p class="input-overlay--text">Is this for somebody else?</p>
        </div>
      </div>

      <inputField
        class="place--street"
        v-model="address.street"
        :input="{
          label: 'Your Street',
          type: 'text',
          placeholder: 'Street',
          id: 'place-street'
        }"
      />

      <div class="small-input-wrapper">
        <inputField
          class="place--zip"
          v-model="address.zip"
          :input="{
            label: 'Zip code',
            type: 'text',
            placeholder: '12345',
            id: 'place-zip'
          }"
        />
        <inputField
          class="place--city"
          v-model="address.city"
          :input="{
            label: 'Your City',
            type: 'text',
            placeholder: 'city',
            id: 'place-city'
          }"
        />
      </div>
    </div>

    <section class="address--buttons">
      <button-simple
        v-if="!previousAddressAvailable"
        class="address--button-cta"
        :buttonText="'Show my shipping options'"
        @simplebuttonevent="nextStep('newAddress')"
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
      address: {
        name: "",
        street: "",
        zip: "",
        city: ""
      },
      previousAddress: {
        name: "",
        street: "",
        zip: "",
        city: ""
      },
      previousAddressAvailable: false,
      differentReciver: false
    };
  },
  methods: {
    nextStep(address) {
      //validate entrys
      //check for guest or user
      if (this.guestStatus) {
        //upload guest data
        this.$store.dispatch("authModule/AUTH_updateUserInfo", {
          name: this.identity.name,
          email: this.identity.email
        });
      }

      if (!this.guestStatus) {
        //check if a different name was used for a user and update if needed

        if (this.identity.name !== this.userProfile.name)
          this.$store.dispatch("authModule/AUTH_updateUserInfo", {
            name: this.identity.name,
            email: this.identity.email
          });
      }

      //set address info to the store
      //add the name to it

      let updatedAdress = { ...this.address };
      //check if a different reciver was entered
      if (!this.differentReciver) {
        //if not, the user ordert this for himself
        updatedAdress[name] = this.identity.name;
      }

      this.$store
        .dispatch("userModule/USER_setCurrentData", {
          type: "address",
          data: updatedAdress
        })
        .then(() => {
          //go to shipping
          this.$router.push({ name: "shipping" });
        });
    },

    updateUserData(hook) {
      //check if the user profile is present
      if (this.userProfile) {
        this.identity.name = this.userProfile.name;
        this.identity.email = this.userProfile.email;
      }
      //check if there is existing store data
      if (this.userAddress) {
        this.address.name = this.userAddress.name;
        this.address.street = this.userAddress.street;
        this.address.zip = this.userAddress.zip;
        this.address.city = this.userAddress.city;
      }

      //check if there is existing history data
      //only show this once
      if (this.historyAddress && hook === "mounted") {
        this.previousAddress.name = this.userAddressHistory.name;
        this.previousAddress.street = this.userAddressHistory.street;
        this.previousAddress.zip = this.userAddressHistory.zip;
        this.previousAddress.city = this.userAddressHistory.city;
        this.previousAddressAvailable = true;
      }
    }
  },
  computed: {
    ...mapGetters({
      userProfile: "authModule/getUserProfile",
      userAddress: "userModule/getAddress",
      userAddressHistory: "userModule/getAddressHistory",
      guestStatus: "authModule/getGuestStatus"
    })
  },
  mounted() {
    this.updateUserData("mounted");
    //console.log(this);
  },
  //same check for route-view keep-alive
  activated() {
    this.updateUserData("activated");
  }
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
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
  /* Box-model */
  padding: 3vh 0;

  /* Typography */

  /* Visual */

  /* Misc */
}

.different-reciver {
  /* Positioning */

  display: grid;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.place--name {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/2;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.input-overlay {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Box-model */

  /* Typography */

  /* Visual */
  background-color: hsla(0, 0%, 100%, 0.95);
  /* Misc */
}

.input-overlay--text {
  /* Positioning */

  /* Box-model */

  /* Typography */
  font-weight: bold;
  /* Visual */

  /* Misc */
}

.small-input-wrapper {
  /* Positioning */

  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-column-gap: var(--1base);
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
