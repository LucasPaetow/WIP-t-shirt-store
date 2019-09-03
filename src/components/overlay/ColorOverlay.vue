<template>
  <section class="overlay">
    <picture class="picture-svg--tshirt picture">
      <img class="svg--tshirt" src="@/assets/overlays/kA9asUxmVka.svg" alt="" />
    </picture>
    <picture class="picture--tshirt picture">
      <img class="image--tshirt" src="@/assets/images/kA9asUxmVka.png" alt="" />
    </picture>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "colorOverlay",
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
  min-height: 100%;
  display: grid;
  padding: var(--padding-top) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: 7rem;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
}

.picture {
  height: auto;
  width: 100%;
}
.description {
  text-align: center;
  padding-bottom: var(--2base);
}

.picture-svg--tshirt {
  position: absolute;
  z-index: 3;
  mix-blend-mode: multiply;
}

.picture--tshirt {
  position: absolute;
  z-index: 2;
}

.image--tshirt {
  height: auto;
  width: 100%;
  object-fit: contain;
}

.svg--tshirt {
  height: auto;
  width: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}
</style>
