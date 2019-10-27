<template>
  <article class="template"></article>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "componentTemplate",
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
.template {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  padding: var(--7base) 0 10vh 0;
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
