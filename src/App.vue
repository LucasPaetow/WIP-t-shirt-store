<template>
  <div id="app">
    <navbar />
    <page-transition propTransitionRouter="true">
      <keep-alive>
        <!--main view -->
        <router-view />
      </keep-alive>
    </page-transition>
  </div>
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
  --grey-100: #f7fafc;
  --grey-200: #edf2f7;
  --grey-300: #e2e8f0;
  --grey-400: #cbd5e0;
  --grey-500: #a0aec0;
  --grey-600: #718096;
  --grey-700: #4a5568;
  --grey-800: #2d3748;
  --grey-900: #1a202c;

  /*signaling*/
  --red-700: #c53030;
  --green-700: #2f855a;

  /*spacing*/
  /*padding*/
  --padding-top: var(--7base);
  --padding-main: var(--1base);
  --padding-rows: var(--5base);

  /*views*/
  --view-main: 1fr;
}

@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap");

/*Borderbox*/
*,
:after,
:before {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
}

body,
html,
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Poppins", sans-serif;
  background-color: white;
}

h1 {
  font-size: var(--4base);
  color: var(--grey-900);
  line-height: 125%;
  padding-bottom: var(--1base);
}

h2 {
  font-size: var(--3base);
  color: var(--grey-900);
  padding-bottom: var(--halfbase);
}

h3 {
  font-size: var(--2base);
  color: var(--grey-900);
}

p,
a,
i,
li,
textarea,
select {
  font-size: var(--1base);
  line-height: 150%;
  color: var(--grey-800);
}

a {
  cursor: pointer;
  text-decoration: underline;
}

ul {
  list-style: none;
}
</style>
