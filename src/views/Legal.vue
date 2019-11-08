<template>
  <article class="legal default-view layout">
    <header class="legal--header default-header">
      <styledHeadline headlineText="Header"></styledHeadline>
    </header>

    <aside class="legal--background default-background"></aside>

    <section class="legal--features layout--span1__right">
      <div class="legal--features__sticky">
        <router-link :to="{ name: 'legal' }">Track your order</router-link>
        <router-link :to="{ name: 'legal' }">Change your address</router-link>
        <router-link :to="{ name: 'legal' }"
          >Change account information</router-link
        >
        <router-link :to="{ name: 'legal' }">delete accout</router-link>
      </div>
    </section>
    <section class="legal--content layout--span1__center">
      <div class="legal--current">
        <styledHeadline
          headlineText="Your open orders"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="legal--orders">
        <styledHeadline
          headlineText="Your order history"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="legal--wishlist">
        <styledHeadline
          headlineText="Your addresses"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="legal--addresses">
        <styledHeadline
          headlineText="Your addresses"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>
    </section>

    <storeFooter class="default-footer" />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import styledHeadline from "@/components/headline/headline.vue";
import storeFooter from "@/components/footer/footer.vue";

export default {
  components: {
    styledHeadline,
    storeFooter
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
