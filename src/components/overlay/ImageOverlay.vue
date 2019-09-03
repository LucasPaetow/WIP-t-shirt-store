<template>
  <section class="overlay">
    <div class="text">
      <h2 class="soundbite headline" v-if="soundbite">
        <span class="background--soundbite">{{ soundbite.headline }}</span>
      </h2>
      <h2 class="soundbite subline" v-if="soundbite">
        <span class="background--soundbite">{{ soundbite.subline }}</span>
      </h2>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :fill-rule="svg.fillRoule"
      :stroke-linejoin="svg.strokeLinejoin"
      :stroke-miterlimit="svg.strokeMiterlimit"
      :clip-rule="svg.clipRule"
      :viewBox="svg.viewBox"
      class="svg"
    >
      <path :fill="svg.path1.fill" :d="svg.path1.d" />
      <path :fill="overlay_color" :d="svg.path2.d" />
    </svg>
    <picture class="picture--tshirt picture">
      <!--  <img class="image--tshirt" :src="image_min" :alt="alt_description" />
      <img class="image--tshirt" :src="image_regular" :alt="alt_description" /> -->
      <img class="image--tshirt" :src="image_max" :alt="alt_description" />
    </picture>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: {
    svg: Object,
    image_min: String,
    image_regular: String,
    image_max: String,
    alt_description: String,
    soundbite: Object,
    overlay_color: String
  },
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
.overlay {
  height: auto;
  width: 100%;
  position: relative;
}

.picture {
  height: auto;
  width: 100%;
}
.text {
  text-align: center;
  padding-bottom: var(--2base);
}

.svg {
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
