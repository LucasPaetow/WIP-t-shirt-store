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
    ...mapGetters({})
  },

  created() {
    this.$store.dispatch("initModule/INIT_store");
  }
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

  /*padding*/
  --paddingX: 5vw;

  /*spacing*/
  --column-spacing: 2.5vw;

  /*Navbar*/
  --navbar__height: var(--7base);

  /*main headline*/
  --h1__fontSize: 7vw;
  --h1__padding: var(--fourthbase);
  --h1__lineHeight: calc(var(--h1__fontSize) + var(--h1__padding) * 2 + 3.5vw);

  --h2__fontSize: calc(var(--h1__fontSize) * 0.66);
  --h2__padding: calc(var(--h2__padding) * 0.66);
  --h2__lineHeight: calc(var(--h1__lineHeight) * 0.66);
}

@media (min-width: 22.5em) {
}

@media (min-width: 26em) {
  :root {
    --h1__fontSize: 6vw;
    --h1__padding: var(--thirdbase);
    --h1__lineHeight: calc(var(--h1__fontSize) + var(--h1__padding) * 2 + 3vw);
  }
}

@media (min-width: 30em) {
  :root {
    --navbar__height: var(--8base);
  }
}

@media (min-width: 37.5em) {
  :root {
    --column-spacing: 10vw;
    --h1__fontSize: 5.5vw;
    --h1__padding: var(--fourthbase);
  }
}
@media (min-width: 45em) {
  :root {
    --column-spacing: 2vw;
    --h1__fontSize: 4vw;
    --h1__lineHeight: calc(var(--h1__fontSize) + var(--h1__padding) * 2 + 2vw);
  }
}

@media (min-width: 70em) {
  :root {
    --column-spacing: 12.5vw;
    --h1__fontSize: 4vw;
    --h1__lineHeight: calc(var(--h1__fontSize) + var(--h1__padding) * 2 + 2vw);

    --h2__fontSize: calc(var(--h1__fontSize) * 0.5);
    --h2__lineHeight: calc(var(--h1__lineHeight) * 0.6);
  }
}

@media (min-width: 90em) {
  :root {
    --column-spacing: 15vw;
    --h1__fontSize: 3.25vw;
    --h1__padding: var(--halfbase);
    --h1__lineHeight: calc(
      var(--h1__fontSize) + var(--h1__padding) * 2 + 1.5vw
    );
    --h2__fontSize: calc(var(--h1__fontSize) * 0.4);
    --h2__lineHeight: calc(var(--h1__lineHeight) * 0.55);
  }
}

@media (min-width: 110em) {
  :root {
    --h1__fontSize: 4.5rem;
    --h1__lineHeight: calc(var(--h1__fontSize) + var(--h1__padding) * 2 + 2rem);
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
  background-color: var(--grey-100);
  /* Misc */
}

h1 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--1base);
  /* Typography */
  font-size: var(--5base);
  /* Visual */
  color: var(--grey-900);

  /* Misc */
}

h2 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--halfbase);
  /* Typography */
  font-size: var(--3base);
  /* Visual */
  color: var(--grey-900);
  /* Misc */
}

h3 {
  /* Positioning */

  /* Box-model */
  padding-bottom: var(--thirdbase);
  /* Typography */
  font-size: var(--2base);
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

/*Site layout*/

/*hero has one main column and side padding*/
/*main has one main column, a sidebar and side padding*/

.hero,
.main {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  min-height: 100%;
  padding-top: var(--navbar__height);
  /* Typography */

  /* Visual */

  /* Misc */
}

.main--background,
.hero--background {
  /* Positioning */
  position: relative;
  grid-column: 1/4;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: var(--grey-200);
  /* Misc */
}

.main--header,
.hero--header {
  /* Positioning */
  position: relative;
  z-index: 2;
  grid-column: 2/3;
  grid-row: 1/2;
  /* Box-model */
  padding: 7.5vh var(--paddingX) 5vh var(--paddingX);
  /* Typography */
  /* Visual */
  /* Misc */
}

.main--sidebar {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.main--sidebar__sticky {
  /* Positioning */
  display: grid;
  grid-auto-flow: row;
  /* Box-model */
  grid-row-gap: 3vh;
  padding: 0 var(--paddingX);
  /* Typography */
  /* Visual */
  /* Misc */
}

.main--content {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.main--footer,
.hero--footer {
  /* Positioning */
  grid-column: 1/4;
  /* Box-model */
  padding: 7.5vh var(--paddingX) 5vh var(--paddingX);
  /* Typography */
  /* Visual */
  /* Misc */
}

.hero__center,
.main__center-sidebar,
.main__center-content {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 45em) {
  .main {
    grid-template-columns: var(--column-spacing) 1.66fr 1fr var(
        --column-spacing
      );
    grid-column-gap: var(--2base);
  }

  .main--header {
    /* Positioning */
    grid-column: 2/4;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .main--background,
  .main--footer {
    /* Positioning */
    grid-column: 1/5;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .main--sidebar {
    /* Positioning */
    grid-column: 3/4;
    grid-row: 2/3;
    /* Box-model */
    min-height: 100%;
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .main--sidebar__sticky {
    position: sticky;
    top: var(--navbar__height);
    padding: 5vh var(--1base) 0 var(--1base);
  }

  .main--content {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 2/3;
    /* Box-model */
    min-height: 100%;
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .main__center-sidebar {
    /* Positioning */
    grid-column: 3/4;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

@media (min-width: 70em) {
  .main {
    grid-template-columns: var(--column-spacing) 1.5fr 1fr var(--column-spacing);
  }

  .product-info--sticky {
    padding: 5vh var(--2base) 0 var(--2base);
  }
}
</style>
