<template>
  <section class="overlay">
    <div
      class="soundbite"
      v-if="soundbite !== undefined"
      :style="{
        left: textPosition[0],
        top: textPosition[1],
        transform: `translate(-${textPosition[0]}, -${textPosition[1]})`
      }"
    >
      <h1 class="soundbite--headline" v-if="soundbite.headline">
        <span class="soundbite--headline__background">{{
          soundbite.headline
        }}</span>
      </h1>
      <h2 class="soundbite--subline" v-if="soundbite.subline">
        <span class="soundbite--subline__background">{{
          soundbite.subline
        }}</span>
      </h2>
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
      :style="{
        minHeight: minHeight + 'vh',
        height: fullHeight + 'vh'
      }"
    >
      <path :fill="svg.path1.fill" :d="svg.path1.d" />
      <path :fill="overlay_color[1]" :d="svg.path2.d" class="fill--tshirt" />
    </svg>

    <v-lazy-image
      :src="responsiveWidth"
      :src-placeholder="image_thumb"
      class="image--tshirt"
      :style="{
        minHeight: minHeight + 'vh',
        height: fullHeight + 'vh'
      }"
    />
  </section>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";

export default {
  components: {
    VLazyImage
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
    overlay_color: Array,
    minHeight: { type: Number, default: 2 },
    fullHeight: Number,
    aspectRatio: Number,
    textPosition: { type: Array, default: () => ["0%", "100%"] }
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
      if (width > 340 && this.aspectRatio > 1) {
        return this.image_regular;
      }

      return this.image_small;
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
  /* Box-model */
  height: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
  /* Typography */

  /* Visual */

  /* Misc */
}

.soundbite {
  position: absolute;
  z-index: 4;
  padding: var(--column-spacing);
}

.soundbite--headline {
  /* Positioning */
  /* Box-model */
  padding: var(--h1__padding) 0;
  /* Typography */
  line-height: var(--h1__lineHeight);
  font-size: 4vw;

  /* Visual */

  /* Misc */
}

.soundbite--subline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  font-size: 3vw;
  line-height: 190%;
  /* Visual */
  /* Misc */
}

.soundbite--headline__background,
.soundbite--subline__background {
  /* Positioning */

  /* Box-model */
  padding: var(--fourthbase) var(--halfbase);
  /* Typography */

  /* Visual */
  background-color: var(--grey-0);

  /* Misc */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.soundbite--subline__background {
  /* Positioning */
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: var(--grey-800);
  color: var(--grey-0);
  /* Misc */
}

.svg--tshirt,
.image--tshirt {
  height: auto;
  width: 100%;
  object-fit: cover;
  grid-column: 1/2;
  grid-row: 1/2;
}

.svg--tshirt {
  position: absolute;
  z-index: 3;
  mix-blend-mode: multiply;
}
</style>
