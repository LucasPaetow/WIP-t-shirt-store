<template>
  <main id="app">
    <navbar />
    <page-transition propTransitionRouter="true">
      <keep-alive>
        <!--main view -->
        <router-view />
      </keep-alive>
    </page-transition>
  </main>
</template>

<script>
import navbar from "@/components/navigation/Navbar.vue";
import pageTransition from "@/components/transitions/transition.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    navbar,
    pageTransition
  },
  name: "app",
  computed: {
    ...mapGetters({
      getShoppingCart: "userModule/getShoppingCart",
      getAddress: "userModule/getAddress",
      getPayment: "userModule/getPayment",
      getShipping: "userModule/getShipping",
      loading: "initModule/getCompleteLoadingState"
    })
  },

  watch: {
    getShoppingCart: {
      handler(newValue, oldValue) {
        if (this.loading) {
          //dont watch during initalizing
          return;
        }
        console.log(`changed shoppingcart from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveShoppingCart");
      },
      deep: true
    },
    getAddress: {
      handler(newValue, oldValue) {
        if (this.loading) {
          //dont watch during initalizing
          return;
        }
        console.log(`changed address from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "address");
      },
      deep: true
    },
    getShipping: {
      handler(newValue, oldValue) {
        if (this.loading) {
          //dont watch during initalizing
          return;
        }
        console.log(`changed shipping from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "shipping");
      },
      deep: true
    },
    getPayment: {
      handler(newValue, oldValue) {
        if (this.loading) {
          //dont watch during initalizing
          return;
        }
        console.log(`changed payment from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "payment");
      },
      deep: true
    }
  },

  created() {
    //initalize all the store by fetching data and loading ressources
    this.$store.dispatch("initModule/INIT_store");
  } /*,
  mounted() {
    //watch the shoppingCart for changes

    if (this.loading) {
      //dont watch during initalizing
      console.log(
        "app is initalizing, changes are to restore the previous state"
      );
      return;
    }
    //watch the local shopping cart
    this.$store.watch(
      (state, getters) => this.getShoppingCart,
      (newValue, oldValue) => {
        console.log(`changed shoppingcart from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveShoppingCart");
      }
    );

    //watch the local address state
    this.$store.watch(
      (state, getters) => this.getAddress,
      (newValue, oldValue) => {
        console.log(`changed address from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "address");
      }
    );
    //watch the local payment state
    this.$store.watch(
      (state, getters) => this.getPayment,
      (newValue, oldValue) => {
        console.log(`changed payment from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "payment");
      }
    );
    //watch the local shipping state
    this.$store.watch(
      (state, getters) => this.getShipping,
      (newValue, oldValue) => {
        console.log(`changed shipping from ${oldValue} to ${newValue}`);
        this.$store.dispatch("userModule/PRODUCT_saveCurrentData", "shipping");
      }
    );
}*/
};
</script>

<style>
/*global variabels*/

:root {
  /*16px*/
  --1base: 1rem;
  /*20px*/
  --2base: calc(var(--1base) * 1.25);
  /*25px*/
  --3base: calc(var(--2base) * 1.25);
  /*31.25px*/
  --4base: calc(var(--3base) * 1.25);
  /*39.06px*/
  --5base: calc(var(--4base) * 1.25);
  /*48.83px*/
  --6base: calc(var(--5base) * 1.25);
  /*61.04px*/
  --7base: calc(var(--6base) * 1.25);
  /*76.29px*/
  --8base: calc(var(--7base) * 1.25);

  /*12.80px*/
  --halfbase: calc((var(--1base) / 1.5));
  /*10.24px*/
  --thirdbase: calc((var(--halfbase) / 1.5));
  /*8.19px*/
  --fourthbase: calc((var(--thirdbase) / 1.5));
  /*6.55px*/
  --fifthbase: calc((var(--fourthbase) / 1.5));

  /*colors*/
  /*greys*/
  --grey-0: hsla(0, 0%, 100%, 1);
  --grey-100: hsla(0, 0%, 97%, 1);
  --grey-200: hsla(0, 0%, 95%, 1);
  --grey-300: hsla(0, 0%, 70%, 1);
  --grey-400: hsla(0, 0%, 50%, 1);
  --grey-500: hsla(0, 0%, 35%, 1);
  --grey-600: hsla(0, 0%, 25%, 1);
  --grey-700: hsla(0, 0%, 10%, 1);
  --grey-800: hsla(0, 0%, 8%, 1);
  --grey-900: hsla(0, 0%, 5%, 1);
  --grey-1000: hsla(0, 0%, 3%, 1);

  /*signaling*/
  --red-700: #c53030;
  --green-700: #2f855a;
  --green-200: hsla(128, 26%, 79%, 1);

  /*spacing*/
  --column-spacing: 2.5vw;

  /*Navbar*/
  --navbar__height: var(--7base);

  /*main headline*/

  --h1--fontsize__fixed: var(--3base);
  --h1--padding__fixed: var(--fourthbase);
  --h1--lineHeight-factor__fixed: 0.9rem;
  --h1--lineHeight__fixed: calc(
    var(--h1--fontsize__fixed) + var(--h1--padding__fixed) * 2 +
      var(--h1--lineHeight-factor__fixed)
  );

  --h2--fontsize__fixed: var(--2base);
  --h2--padding__fixed: var(--fourthbase);
  --h2--lineHeight-factor__fixed: 0.75rem;
  --h2--lineHeight__fixed: calc(
    var(--h2--fontsize__fixed) + var(--h2--padding__fixed) * 2 +
      var(--h2--lineHeight-factor__fixed)
  );

  --h3--fontsize__fixed: calc(var(--1base) * 1.1);
  --h3--padding__fixed: var(--fourthbase);
  --h3--lineHeight-factor__fixed: 0.6rem;
  --h3--lineHeight__fixed: calc(
    var(--h3--fontsize__fixed) + var(--h3--padding__fixed) * 2 +
      var(--h3--lineHeight-factor__fixed)
  );
}

@media (min-width: 22.5em) {
  :root {
    --h1--fontsize__fixed: var(--4base);
    --h1--lineHeight-factor__fixed: 1.1rem;
  }
}

@media (min-width: 26em) {
  :root {
  }
}

@media (min-width: 30em) {
  :root {
    --navbar__height: var(--8base);
    --column-spacing: 3vw;
  }
}

@media (min-width: 37.5em) {
  :root {
  }
}
@media (min-width: 48em) {
  :root {
    --h1--fontsize__fixed: var(--5base);
    --h1--lineHeight-factor__fixed: 1.35rem;
    --h2--fontsize__fixed: var(--3base);
    --h2--lineHeight-factor__fixed: 0.9rem;
    --h3--fontsize__fixed: var(--2base);
    --h3--lineHeight-factor__fixed: 0.75rem;
  }
}

@media (min-width: 56em) {
  :root {
  }
}

@media (min-width: 64em) {
  :root {
    --h1--fontsize__fixed: var(--6base);
    --h1--lineHeight-factor__fixed: 1.5rem;
    --h2--fontsize__fixed: var(--4base);
    --h2--lineHeight-factor__fixed: 1.1rem;
    --h3--fontsize__fixed: var(--3base);
    --h3--lineHeight-factor__fixed: 0.9rem;
    --column-spacing: 5vw;
  }
}

@media (min-width: 90em) {
  :root {
    --h1--padding__fixed: var(--halfbase);
    --h1--lineHeight-factor__fixed: 1.6rem;
    --h2--padding__fixed: var(--halfbase);
    --column-spacing: 8vw;
  }
}

@media (min-width: 110em) {
  :root {
    --column-spacing: 15vw;
  }
}

/* Positioning */

/* Box-model */

/* Typography */

/* Visual */

/* Misc */

@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap");

/*Borderbox*/
*,
:after,
:before {
  /* Positioning */
  margin: 0;
  padding: 0;

  /* Box-model */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  /* Typography */
  text-decoration: none;

  /* Visual */

  /* Misc */
}

body,
html,
#app {
  /* Positioning */

  /* Box-model */
  height: 100%;

  /* Typography */
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Visual */
  background-color: var(--grey-0);
  /* Misc */
}

h1 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--1base);
  /* Typography */
  font-size: var(--h1--fontsize__fixed);

  /* Visual */
  color: var(--grey-900);

  /* Misc */
}

h2 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--halfbase);
  /* Typography */
  font-size: var(--h2--fontsize__fixed);
  /* Visual */
  color: var(--grey-900);
  /* Misc */
}

h3 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--halfbase);
  /* Typography */
  font-size: var(--h3--fontsize__fixed);
  /* Visual */
  color: var(--grey-900);
  /* Misc */
}

p,
a,
i,
li,
textarea,
select {
  /* Positioning */

  /* Box-model */

  /* Typography */
  font-size: var(--1base);
  line-height: 150%;
  /* Visual */
  color: var(--grey-800);
  /* Misc */
}

a {
  /* Positioning */

  /* Box-model */

  /* Typography */
  text-decoration: underline;
  /* Visual */
  /* Misc */
  cursor: pointer;
}

ul {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  /* Misc */
  list-style: none;
}

form,
input {
  /* Positioning */

  /* Box-model */
  max-width: 30rem;
  /* Typography */

  /* Visual */
  /* Misc */
  list-style: none;
}

.z-index-1 {
  /* Positioning */
  display: relative;
  /* Box-model */

  /* Typography */

  /* Visual */
  /* Misc */
  z-index: 1;
}

.z-index-2 {
  /* Positioning */
  display: relative;
  /* Box-model */

  /* Typography */

  /* Visual */
  /* Misc */
  z-index: 2;
}

.z-index-3 {
  /* Positioning */
  display: relative;
  /* Box-model */

  /* Typography */

  /* Visual */
  /* Misc */
  z-index: 3;
}

.z-index-4 {
  /* Positioning */
  display: relative;
  /* Box-model */

  /* Typography */

  /* Visual */
  /* Misc */
  z-index: 4;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-scroll {
  overflow-y: scroll;
}

@media (min-width: 48em) {
  .big-text {
    font-size: var(--2base);
  }
}

.recap-wrapper {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  /* Box-model */

  width: 100%;
  border: 2px solid var(--grey-600);
  /* Typography */
  /* Visual */
  /* Misc */
}

/*Site layout*/

/*hero has one main column and side padding*/
/*main has one main column, a sidebar and side padding*/

.layout {
  display: grid;
  grid-template-columns: var(--column-spacing) 0fr 1fr 0fr var(--column-spacing);
  grid-auto-rows: min-content;
}

.layout--full {
  grid-column: 1/6;
}

.layout--span3 {
  grid-column: 2/5;
}

.layout--span2__left {
  grid-column: 2/4;
}

.layout--span2__right {
  grid-column: 3/5;
}
.layout--span1__center,
.layout--span1__right {
  grid-column: 3/5;
}

.row-gap-5 {
  grid-row-gap: 5vh;
}

.default-view {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  min-height: 100%;
  padding-top: var(--navbar__height);

  /* Typography */

  /* Visual */

  /* Misc */
}

.default-background {
  /* Positioning */
  position: relative;
  grid-column: 1/6;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: var(--grey-200);
  /* Misc */
}

.default-header {
  /* Positioning */
  position: relative;
  z-index: 2;
  grid-column: 3/5;
  grid-row: 1/2;
  /* Box-model */
  padding: 7.5vh 0 5vh 0;
  /* Typography */
  /* Visual */
  /* Misc */
}

.default-footer {
  /* Positioning */
  grid-column: 1/6;
  /* Box-model */
  padding: 7.5vh 0 5vh 0;
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 22.5em) {
}

@media (min-width: 30em) {
  .layout {
    /* Positioning */
    grid-template-columns: var(--column-spacing) 1fr 6fr 3fr var(
        --column-spacing
      );
    grid-column-gap: 2vw;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

@media (min-width: 50em) {
  .default-header {
    /* Positioning */
    grid-column: 3/4;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .layout--span1__center {
    grid-column: 3/4;
  }

  .layout--span1__right {
    grid-column: 4/5;
  }
}

@media (min-width: 64em) {
}

@media (min-width: 70em) {
  .layout {
    /* Positioning */
    grid-template-columns: var(--column-spacing) 2fr 5fr 3fr var(
        --column-spacing
      );
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}
</style>
