<template>
  <section class="overlay">
    <div class="text" v-if="soundbite !== undefined">
      <h2 class="soundbite headline" v-if="soundbite.headline">
        <span class="background--soundbite">{{ soundbite.headline }}</span>
      </h2>
      <p class="soundbite subline" v-if="soundbite.subline">
        <span class="background--soundbite">{{ soundbite.subline }}</span>
      </p>
      <buttonSimple
        :class="[$route.name === 'product' ? 'hidden' : '']"
        buttonText="Choose size"
        buttonType="choose-size"
        @simplebuttonevent="$emit('overlaybuttonevent')"
      />
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :fill-rule="svg.fillRoule"
      :stroke-linejoin="svg.strokeLinejoin"
      :stroke-miterlimit="svg.strokeMiterlimit"
      :clip-rule="svg.clipRule"
      :viewBox="svg.viewBox"
      class="svg--tshirt"
      preserveAspectRatio="xMidYMid slice"
      :style="{ minHeight: minHeight + 'vh' }"
    >
      <path :fill="svg.path1.fill" :d="svg.path1.d" />
      <path :fill="overlay_color" :d="svg.path2.d" class="fill--tshirt" />
    </svg>

    <v-lazy-image
      :src="responsiveWidth"
      :src-placeholder="image_thumb"
      class="image--tshirt"
      :style="{ minHeight: minHeight + 'vh' }"
    />
  </section>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    VLazyImage,
    buttonSimple
  },
  //if the basics are being edited, this array contains existing basic information
  props: {
    svg: Object,
    image_thumb: String,
    image_small: String,
    image_regular: String,
    image_full: String,
    alt_description: String,
    soundbite: Object,
    overlay_color: String,
    minHeight: { type: Number, default: 2 },
    aspectRation: Number
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
    ...mapGetters({}),
    responsiveWidth() {
      let width = window.innerWidth;
      if (width > 1200) {
        return this.image_full;
      }
      if (width > 700) {
        return this.image_regular;
      }
      if (width > 340 && this.aspectRation > 0) {
        return this.image_regular;
      }
      if (width > 340) {
        return this.image_small;
      }

      return this.image_thumb;
    }
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.overlay {
  /* Positioning */
  display: grid;
  grid-template-rows: 1fr min-content;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
  /* Box-model */
  height: auto;
  width: 100%;
  position: relative;
  /* Typography */

  /* Visual */

  /* Misc */
}

.text {
  position: relative;
  z-index: 4;
  grid-column: 2/3;
  grid-row: 2/3;
}

.soundbite {
  font-weight: bold;
}

.headline {
  padding-bottom: var(--1base);
}

.background--soundbite {
  background-color: white;
  padding: var(--fourthbase);
}

.svg--tshirt,
.image--tshirt {
  height: auto;
  width: 100%;
  object-fit: cover;
  grid-column: 1/4;
  grid-row: 1/3;
}

.svg--tshirt {
  position: absolute;
  z-index: 3;
  mix-blend-mode: multiply;
}

.hidden {
  visibility: hidden;
}
</style>
