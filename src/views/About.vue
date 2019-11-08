<template>
  <article class="about default-view layout">
    <header class="about--header default-header">
      <styledHeadline headlineText="Header"></styledHeadline>
    </header>

    <aside class="about--background default-background"></aside>

    <section class="about--main-content layout--span1__right">
      <div class="main--sidebar__sticky">
        <router-link :to="{ name: 'about' }">about X</router-link>
        <router-link :to="{ name: 'about' }">about X</router-link>
        <router-link :to="{ name: 'about' }">about X</router-link>
        <router-link :to="{ name: 'about' }">about X</router-link>
        <router-link :to="{ name: 'about' }">about X</router-link>
        <router-link :to="{ name: 'about' }">about X</router-link>
      </div>
    </section>
    <section class=" layout--span1__center">
      <div class="about--shirt">
        <styledHeadline
          headlineText="About the shirt"
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
      <div class="about--shipping">
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
      <div class="about--us">
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

    <storeFooter class="default-footer" />
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
  name: "about",
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
.about--main-content {
  /* Positioning */
  /* Box-model */
  grid-row: 2/3;
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
