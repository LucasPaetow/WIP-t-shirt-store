<template>
  <article class="home">
    <section class="above-the-fold">
      <div class="images">
        <div class="coathanger">
          <picture>
            <img src="" alt="" />
          </picture>
        </div>
      </div>
      <div class="search-color"></div>
      <div class="previous-color"></div>
      <div></div>
    </section>
    <section class="value-preposition"></section>
    <section class="social-proof"></section>
    <footer></footer>
  </article>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "home",
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

<style scoped lang="scss">
.home {
  min-height: 100%;
}

.above-the-fold {
  height: 100%;
  display: grid;
  padding: var(--padding-top) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: 7rem;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
}
</style>
