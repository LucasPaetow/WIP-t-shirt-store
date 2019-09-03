<template>
  <article class="home" v-if="!loadingState">
    <above-the-fold></above-the-fold>
  </article>
  <article class="home" v-else>
    <h1>loading</h1>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import aboveTheFold from "@/components/homepage/aboveTheFold.vue";

export default {
  components: {
    aboveTheFold
  },
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
    ...mapGetters({
      loadingState: "initModule/getLoadingState"
    })
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.home {
  min-height: 100%;
  padding: var(--padding-top) 0 0 0;
}
</style>
