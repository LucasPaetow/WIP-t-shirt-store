<template>
  <article class="store">
    <section class="search" id="search-store">
      <search />
    </section>
    <header class="header" id="headline-store">
      <h1 class="headline">This is how cool you look in 2 days</h1>
      <p class="subline">If you order in the next 3h</p>
    </header>
    <section class="product-images"></section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";

export default {
  components: {
    search,
    imageOverlay
  },
  props: [],
  name: "store",
  data() {
    return {};
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
/* Positioning */
/* Box-model */
/* Typography */
/* Visual */
/* Misc */

.store {
  /* Positioning */
  display: grid;
  padding: var(--padding-top) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: 7rem;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
  /* Box-model */
  min-height: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

/* Positioning */

/* Box-model */

/* Typography */

/* Visual */

/* Misc */
</style>
