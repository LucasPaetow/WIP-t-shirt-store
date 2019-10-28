<template>
  <article class="profile main">
    <header class="profile--header main--header">
      <styledHeadline headlineText="Header"></styledHeadline>
    </header>

    <aside class="profile--background main--background"></aside>

    <section class="main--sidebar">
      <div class="main--sidebar__sticky">
        <router-link :to="{ name: 'profile' }">Track your order</router-link>
        <router-link :to="{ name: 'profile' }">Change your address</router-link>
        <router-link :to="{ name: 'profile' }"
          >Change account information</router-link
        >
        <router-link :to="{ name: 'profile' }">delete accout</router-link>
      </div>
    </section>
    <section class=" main--content">
      <div class="profile--current">
        <styledHeadline
          headlineText="Your open orders"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="profile--orders">
        <styledHeadline
          headlineText="Your order history"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="profile--wishlist">
        <styledHeadline
          headlineText="Your addresses"
          headlineType="h2"
          :invertedColor="true"
        ></styledHeadline>
      </div>

      <div class="profile--addresses">
        <styledHeadline
          headlineText="Your addresses"
          headlineType="h2"
          :invertedColor="true"
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
  name: "profile",
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
