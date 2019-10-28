<template>
  <article class="store main">
    <header class="store--header main--header">
      <styledHeadline headlineText="Header"></styledHeadline>
    </header>

    <aside class="store--background main--background"></aside>

    <section class="main--sidebar">
      <div class="main--sidebar__sticky"></div>
    </section>
    <section class="product-images main--content"></section>

    <storeFooter class="footer__layout main--footer" />
  </article>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: {},
  name: "yikes",
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
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
