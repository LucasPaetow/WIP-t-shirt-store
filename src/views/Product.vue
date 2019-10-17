<template>
  <article class="product">
    <section class="images" v-for="(product, index) in productArray">
      <div class="main-image" v-if="index === activeImage">
        <image-overlay
          :image_full="product.urls.full"
          :image_regular="product.urls.regular"
          :image_small="product.urls.small"
          :image_thumb="product.urls.thumb"
          :svg="product.svg"
          :alt_description="product.alt_description"
          :overlay_color="currentColor || ['white', '#ffffff']"
          :minHeight="75"
          :aspectRation="product.width / product.height"
          class="overlay-layout"
        />
        <buttonClose class="button-layout" @closebuttonevent="closeProduct()" />
      </div>
    </section>

    <section class="visible-menu menu">
      <div class="visible-menu--preview-wrapper">
        <button
          class="preview-container"
          :class="[index === activeImage ? 'active' : '']"
          v-for="(product, index) in productArray"
          @click="nextImage(index)"
        ></button>
      </div>
      <h3 class="visible-menu--headline">
        Your perferct {{ currentColor[0] }} t-shirt
      </h3>
      <div class="input-wrapper">
        <p class="description--input"><b>Your size:</b></p>
        <div class="inputs">
          <input
            v-for="clothingSize in sizes"
            type="radio"
            :id="`size-${clothingSize}`"
            :value="clothingSize"
            v-model="size"
            class="input"
          />
          <label
            v-for="clothingSize in sizes"
            :for="`size-${clothingSize}`"
            class="label"
            :class="[size === clothingSize ? 'active' : '']"
            >{{ clothingSize }}</label
          >
        </div>
      </div>
      <div class="button-wrapper">
        <buttonSimple
          buttonText="more"
          buttonType="secondary"
          @simplebuttonevent="toggleHiddenMenu"
        />
        <buttonSimple
          :buttonText="`Add ${orderAmount} to card for ${orderAmount * 20}$`"
          buttonType="primary"
        />
      </div>
    </section>
    <!--<section class="hidden-menu menu" id="bottom-menu">
      <div class="add-tshirts"></div>
      <ul class="material">
        <h3>Material</h3>
        <li>10% luck, 20% skill</li>
        <li>15% concentrated power of will</li>
        <li>5% pleasure, 50% pain</li>
        <li>& a 100% reason to remember the tshirt</li>
        <li>(actually 100% cotton)</li>
      </ul>
  </section> -->
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import imageOverlay from "@/components/overlay/ImageOverlay";
import buttonClose from "@/components/buttons/ButtonClose.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    imageOverlay,
    buttonClose,
    buttonSimple
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  name: "product",
  data() {
    return {
      activeImage: 0,
      orderAmount: 1,
      size: "M",
      sizes: ["S", "M", "L", "XL"],
      hiddenMenuVisible: false,
      productArray: false
    };
  },
  methods: {
    //navigation
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    },
    closeProduct() {
      this.goTo("store");
    },
    toggleHiddenMenu() {
      let hiddenMenu = document.getElementById("bottom-menu");
      console.log(this.productArray);
    },
    combineProductData() {
      if (this.productArray) {
        return;
      }
      let combinedArray = this.supportData;

      combinedArray.unshift(this.data);
      this.productArray = combinedArray;
    },
    nextImage(index) {
      this.activeImage = index;
    }
  },
  computed: {
    ...mapGetters({
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor"
    })
  },
  created() {
    if (!this.$route.params.data) {
      this.goTo("store");
    }
    if (this.productArray) {
      return;
    }
    this.combineProductData();
  },
  //same check for route-view keep-alive
  activated() {
    if (!this.$route.params.data) {
      this.goTo("store");
    }
    if (this.productArray) {
      return;
    }
    this.combineProductData();
  }
};
</script>

<style scoped>
.product {
  /* Positioning */
  display: grid;
  padding: 0 0 0 0;
  grid-template-rows: 70vh minmax(30vh, auto) 1fr;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  position: relative;
  /* Box-model */
  height: 100vh;
  /* Typography */

  /* Visual */

  /* Misc */
}
.images {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/2;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
  z-index: 2;
}

.main-image {
  /* Positioning */
  position: relative;
  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 5rem 2fr 1fr;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.overlay-layout {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.button-layout {
  /* Positioning */
  z-index: 7;
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  align-self: center;
  justify-self: center;
  /* Typography */

  /* Visual */

  /* Misc */
}

.menu {
  /* Positioning */
  /* Box-model */
  /* Typography */

  /* Visual */
  background-color: white;
  /* Misc */
}

.visible-menu {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-template-rows: 1.5rem;
  grid-row-gap: 4vh;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
  z-index: 10;
}

.visible-menu--preview-wrapper {
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transform: translateY(-100%);
}

.preview-container {
  content: " ";
  height: 3rem;
  width: 3rem;
  background-color: grey;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.25);
  color: var(--grey-800);
  border: none;
  min-width: 0;
  cursor: pointer;
  font-size: var(--1base);
  text-transform: none;
  font-family: "Poppins", sans-serif;
  font-weight: normal;
}

.preview-container::after {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* Box-model */
  content: " ";
  height: 3rem;
  width: 3rem;
  /* Typography */

  /* Visual */
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
  background-color: transparent;

  /* Misc */
  opacity: 0;
  transition: opacity 500ms;
}
.active.preview-container::after {
  opacity: 1;
}

.visible-menu--headline {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.input-wrapper {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-column-gap: var(--1base);

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.input {
  /* Positioning */
  display: none;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.label {
  /* Positioning */
  position: relative;
  /* Box-model */
  padding: var(--halfbase) var(--1base);
  margin: 0 var(--fourthbase);
  /* Typography */

  /* Visual */
  border-radius: var(--fourthbase);
  color: var(--grey-800);
  background-color: transparent;
  /* Misc */
}

.label::after {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* Box-model */
  content: " ";
  min-width: 2rem;
  /* Typography */

  /* Visual */
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  border-radius: var(--fourthbase);
  /* Misc */
  opacity: 0;
  transition: opacity 500ms;
}

.active.label::after {
  opacity: 1;
}

.active {
  background-color: var(--grey-400);
}

.description--input {
}

.button-wrapper {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-column-gap: var(--1base);
  align-self: start;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.hidden-menu {
  /* Positioning */
  grid-row: 2/3;
  grid-column: 1/4;
  display: grid;
  grid-template-columns: var(--3base) 1fr var(--3base);
  /* Box-model */
  /* Typography */

  /* Visual */
  /* Misc */
}

.hide-menu {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  transition: transform 0.2s ease-in;
  transform: translateY(100%);
  /* Misc */
}

.show-menu {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  transition: transform 0.2s ease-in;
  transform: translateY(0);
  /* Misc */
}

.material {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
