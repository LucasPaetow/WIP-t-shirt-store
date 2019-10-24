<template>
  <section class="payment"></section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "checkoutPayment",
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
.payment {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  padding: var(--7base) 0 10vh 0;
  height: 100vh;
  width: 100vw;
  /* Typography */

  /* Visual */
  background-color: var(--grey-500);
  /* Misc */
}

/* Positioning */

/* Box-model */

/* Typography */

/* Visual */

/* Misc */
</style>
