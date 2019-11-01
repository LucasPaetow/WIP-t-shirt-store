<template>
  <article class="confirmation">
    <section class="confirmation--buttons">
      <button-simple
        class="confirmaton--button-cta"
        :buttonText="'order my t-shirts'"
        @simplebuttonevent="confirmOrder()"
      />
    </section>
  </article>
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
  name: "checkoutpayment",
  data() {
    return {};
  },
  methods: {
    confirmOrder() {}
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
.confirmation {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-row-gap: 3vh;
  /* Box-model */
  padding: 3vh 0 10vh 0;
  min-height: 100vh;
  width: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.confirmation--buttons {
  /* Positioning */
  grid-column: 2/3;
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
