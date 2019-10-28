<template>
  <article class="legal main">
    <header class="legal--header main--header">
      <styledHeadline headlineText="Header"></styledHeadline>
    </header>

    <aside class="legal--background main--background"></aside>

    <section class="main--sidebar">
      <div class="main--sidebar__sticky">
        <router-link :to="{ name: 'legal' }">legal X</router-link>
        <router-link :to="{ name: 'legal' }">legal X</router-link>
        <router-link :to="{ name: 'legal' }">legal X</router-link>
        <router-link :to="{ name: 'legal' }">legal X</router-link>
        <router-link :to="{ name: 'legal' }">legal X</router-link>
        <router-link :to="{ name: 'legal' }">legal X</router-link>
      </div>
    </section>
    <section class=" main--content">
      <div class="legal--shirt">
        <styledHeadline
          headlineText="legal the shirt"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
        <styledHeadline headlineText="Sizes" headlineType="h3"></styledHeadline>
        <styledHeadline
          headlineText="Quality"
          headlineType="h3"
        ></styledHeadline>
        <styledHeadline
          headlineText="Wash and care instructions"
          headlineType="h3"
        ></styledHeadline>
      </div>
      <div class="legal--shipping">
        <styledHeadline
          headlineText="Shipping and returns"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
        <styledHeadline headlineText="Sizes" headlineType="h3"></styledHeadline>
        <styledHeadline
          headlineText="Order tracking"
          headlineType="h3"
        ></styledHeadline>
      </div>
      <div class="legal--us">
        <styledHeadline
          headlineText="Our Story"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
        <styledHeadline headlineText="Sizes" headlineType="h3"></styledHeadline>
        <styledHeadline
          headlineText="Impressum"
          headlineType="h3"
        ></styledHeadline>
        <styledHeadline
          headlineText="Privacy"
          headlineType="h3"
        ></styledHeadline>
      </div>
    </section>

    <storeFooter class="footer__layout main--footer" />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    styledHeadline
  },
  //if the basics are being edited, this array contains existing basic information
  props: {},
  name: "legal",
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
