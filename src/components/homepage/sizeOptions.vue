<template>
  <article class="choose-size z-index-3">
    <router-link
      :to="{
        name: 'store',
        params: {
          color: this.currentColor[0],
          colorArray: this.currentColor
        }
      }"
      class="close-modal z-index-4"
      :class="[addedToCard ? 'success' : '']"
    >
      <p class="close-modal--text z-index-2">Close</p>
      <aside class="close-modal--background z-index-1"></aside>
    </router-link>
    <section class="forground z-index-4">
      <pageTransition propTransitionName="slide-left">
        <div
          class="option-selection"
          v-if="!addedToCard"
          :key="'beforeAddingToCart'"
        >
          <header class="option-selection--header">
            <h2 class="header--headline">
              <span class="header--headline__background"
                >What is your closing size, champion</span
              >
            </h2>
            <p class="header--subline">
              Get it by tomorrow, if you order in the next XXh YYmin
            </p>
          </header>

          <div class="option-selection--inputs">
            <p class="sizes--description inputs--description">
              <b>Your size:</b>
            </p>
            <div class="sizes--inputs inputs">
              <input
                v-for="clothingSize in sizes"
                type="radio"
                :id="`size-${clothingSize}`"
                :value="clothingSize"
                v-model="size"
                class="sizes--inputs__input "
              />
              <label
                v-for="clothingSize in sizes"
                :for="`size-${clothingSize}`"
                class="sizes--inputs__label default-input-style"
                :class="[size === clothingSize ? 'active' : '']"
                >{{ clothingSize }}</label
              >
            </div>
            <p class="amount--description inputs--description">
              <b>Amount:</b>
            </p>
            <div class="amount--inputs inputs">
              <button
                class="amount--button amount--increase default-input-style"
                @click="changeAmount('decrease')"
              >
                -
              </button>
              <p class="amount--number default-input-style">{{ amount }}</p>
              <button
                class="amount--button amount--decrease default-input-style"
                @click="changeAmount('increase')"
              >
                +
              </button>
            </div>
            <p class="option-selection--promotion">
              If you buy 3 or mor shirts, you get the shipping for free
            </p>
          </div>

          <div class="option-selection--materials">
            <h4 class="materials--headline">Materials</h4>
            <ul class="materials--list">
              <li class="materials--list__item">10% luck, 20% skill</li>
              <li class="materials--list__item">
                15% concentrated power of will
              </li>
              <li class="materials--list__item">
                5%pleasure, 50% percent cotton
              </li>
              <li class="materials--list__item">
                And a 100% reason to remember the tshirt (actually 100% cotton,
                too)
              </li>
            </ul>
          </div>
          <buttonSimple
            class="option-selection--cta"
            :buttonText="`Add ${amount} to card for ${amount * 20}$`"
            @simplebuttonevent="addToCard()"
          />
        </div>
        <div class="option-completion" v-else :key="'afterAddingToCart'">
          <header class="option-completion--header">
            <h2 class="header--headline">
              <span class="header--headline__background">Well done!</span>
            </h2>
            <p class="header--subline">
              Your added this sweet t-shirt to your shopping cart
            </p>
          </header>
          <div class="option-completion--product">
            <image-overlay
              :image_full="require('@/assets/images/kA9asUxmVka.png')"
              :image_regular="require('@/assets/images/kA9asUxmVka.png')"
              :image_small="require('@/assets/images/kA9asUxmVka.png')"
              :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
              :svg="supportData[3].svg"
              :alt_description="supportData[3].alt_description"
              :overlay_color="currentColor || ['white', '#ffffff']"
              :minHeight="5"
              class="image-overlay"
            />
            <h4 class="product--headline">
              {{ amount + `${amount > 1 ? " t-shirts" : " t-shirt"}` }} in:
            </h4>

            <p class="product--color">{{ currentColor[0] }}</p>
            <div class="product--options">
              <div class="product--size product-input-style">
                {{ size }}
              </div>
              <div class="product--price product-input-style">
                {{ amount * 20 }}$
              </div>
            </div>
          </div>
          <buttonSimple
            class="option-completion--cta"
            :buttonText="'view cart'"
            @simplebuttonevent="goTo('cart')"
          />
          <div class="option-completion--more-shirts">
            <h4 class="more-shirts--headline">
              Here are some community favourites, you might be interested in
            </h4>
            <div class="more-shirts--shirts">
              <div
                class="shirt-wrapper"
                v-for="color in communityColors"
                @click="changeToCommunityColor(color)"
              >
                <image-overlay
                  :image_full="require('@/assets/images/kA9asUxmVka.png')"
                  :image_regular="require('@/assets/images/kA9asUxmVka.png')"
                  :image_small="require('@/assets/images/kA9asUxmVka.png')"
                  :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
                  :svg="supportData[3].svg"
                  :alt_description="supportData[3].alt_description"
                  :overlay_color="color || ['white', '#ffffff']"
                  class="image-overlay"
                />
                <h4 class="shirt--headline">{{ color[0] }}</h4>
              </div>
            </div>
          </div>
        </div>
      </pageTransition>
    </section>
    <aside class="background z-index-3"></aside>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";

export default {
  components: {
    pageTransition,
    buttonSimple,
    imageOverlay
  },
  props: {},
  name: "sizeOptions",
  data() {
    return {
      addedToCard: false,
      amount: 1,
      size: "M",
      sizes: ["S", "M", "L", "XL"],
      communityColors: [
        ["darkorange", "#FF8C00"],
        ["darkslategray", "#2F4F4F"],
        ["antiquewhite", "#FAEBD7"],
        ["lavender", "#E6E6FA"]
      ]
    };
  },
  methods: {
    openOptions() {
      this.showOptions = !this.showOptions;
    },
    changeAmount(mode) {
      if (mode === "decrease") {
        if (this.amount > 1) {
          this.amount -= 1;
          return;
        }
        return;
      }

      this.amount += 1;
    },

    addToCard() {
      let product = {
        amount: this.amount,
        size: this.size,
        color: this.currentColor
      };
      this.$store
        .dispatch("userModule/PRODUCT_addToShoppingCart", product)
        .then(() => {
          this.addedToCard = true;
        });
    },
    changeToCommunityColor(color) {
      this.$store
        .dispatch("productModule/COLORS_setCurrent", color)
        .then(() => {
          this.goTo("store", {
            color: color[0],
            colorArray: color
          });
        });
    },
    //navigation
    goTo(locationName, paramObject) {
      this.$router.push({
        name: locationName,
        params: paramObject
      });
    }
  },
  computed: {
    ...mapGetters({
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor"
    })
  },

  mounted() {
    console.log(this.supportData);
    let store = document.getElementById("store");
    store.classList.add("fixed-scroll");
  },
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.choose-size {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr min-content min-content;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  /* Box-model */
  width: 100vw;
  height: 100vh;

  /* Typography */
  /* Visual */
  /* Misc */
  overflow-y: scroll;
}

@media (min-width: 45em) {
  .choose-size {
    /* Positioning */

    grid-template-rows: 1fr min-content 1fr;
    grid-template-columns: 1fr min-content 1fr;
    /* Box-model */

    /* Typography */
    /* Visual */

    /* Misc */
    overflow-y: scroll;
  }
}

.background {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/4;
  /* Box-model */
  width: 100vw;
  height: 100%;
  /* Typography */
  background-color: hsla(0, 0%, 100%, 0.85);
  /* Visual */
  /* Misc */
}

.close-modal {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/2;
  align-self: end;
  display: grid;
  /* Box-model */
  height: 5rem;
  width: 100%;
  /* Typography */
  text-decoration: none;
  /* Visual */
  background-color: transparent;

  /* Misc */
}

@media (min-width: 45em) {
  .close-modal {
    /* Positioning */
    grid-column: 2/3;
    /* Box-model */
    height: 3rem;
    width: 100%;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.close-modal--text {
  /* Positioning */
  justify-self: center;
  align-self: center;
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  font-size: var(--1base);
  font-weight: bold;
  /* Visual */
  color: var(--grey-500);

  /* Misc */
}

.success .close-modal--text {
  /* Positioning */
  /* Box-model */
  /* Typography */

  /* Visual */
  color: var(--grey-0);

  /* Misc */
}

.close-modal--background {
  /* Positioning */
  justify-self: center;
  align-self: center;
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  width: 100%;
  height: 100%;
  /* Typography */
  /* Visual */
  background-color: var(--green-700);
  transform: scaleX(0);
  transform-origin: left;
  opacity: 0;
  /* Misc */
}

.success .close-modal--background {
  /* Positioning */

  /* Box-model */

  /* Typography */
  /* Visual */

  opacity: 1;
  /* Misc */
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1) 0.2s;
  transform: scaleX(1);
}

.forground {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 2/3;

  /* Box-model */

  /* Typography */

  /* Visual */
  background-color: hsla(0, 0%, 100%, 1);
  /* Misc */
}

@media (min-width: 45em) {
  .forground {
    /* Positioning */
    grid-column: 2/3;

    /* Box-model */

    /* Typography */

    /* Visual */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
    /* Misc */
  }
}

.option-selection,
.option-completion {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  padding: 5vh 0;
  /* Typography */
  /* Visual */
  background-color: var(--grey-0);
  /* Misc */
}

@media (min-width: 45em) {
  .option-selection,
  .option-completion {
    /* Positioning */

    grid-template-columns: 5vw 1fr 5vw;

    grid-row-gap: 3vh;
    /* Box-model */
    padding: 7.5vh 0;
    /* Typography */
    /* Visual */

    /* Misc */
  }
}

.option-completion {
  /* Positioning */
  /* Box-model */
  padding: 5vh 0 0 0;
  /* Typography */
  /* Visual */

  /* Misc */
}

.option-selection--header,
.option-completion--header {
  /* Positioning */
  grid-column: 2/3;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .option-selection--header,
  .option-completion--header {
    /* Positioning */

    /* Box-model */
    min-width: 30rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.header--headline__background {
  /* Positioning */

  /* Box-model */
  padding: var(--fourthbase) var(--halfbase);
  /* Typography */

  /* Visual */
  background-color: var(--grey-800);
  color: var(--grey-0);

  /* Misc */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.option-selection--inputs {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-column-gap: var(--halfbase);
  grid-row-gap: 5vh;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 22.5em) {
  .option-selection--inputs {
    /* Positioning */

    grid-template-columns: 6rem 1fr;
    grid-column-gap: var(--1base);

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.inputs {
  /* Positioning */

  justify-self: start;

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.sizes--inputs {
  /* Positioning */
  display: flex;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.sizes--inputs__input {
  /* Positioning */
  display: none;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.sizes--inputs__label {
  /* Positioning */
  position: relative;
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: transparent;
  /* Misc */
}

.sizes--inputs__label::after {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* Box-model */
  content: " ";
  width: var(--5base);
  height: var(--5base);
  /* Typography */

  /* Visual */
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  border-radius: var(--fourthbase);
  /* Misc */
  opacity: 0;
  transition: opacity 500ms;
}

.active.sizes--inputs__label::after {
  opacity: 1;
}

.active.sizes--inputs__label {
  background-color: var(--grey-400);
}

.amount--inputs {
  /* Positioning */

  display: flex;
  justify-content: space-around;
  align-items: center;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.amount--button {
  /* Positioning */
  /* Box-model */

  /* Typography */

  /* Visual */

  background-color: var(--grey-400);

  /* Misc */
}

.amount--number {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.inputs--description {
  /* Positioning */
  justify-self: center;
  align-self: center;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.option-selection--promotion {
  /* Positioning */
  grid-column: 1/3;

  /* Box-model */
  margin-top: -2vh;
  /* Typography */
  color: var(--red-700);
  /* Visual */

  /* Misc */
}

.option-selection--materials {
  /* Positioning */
  grid-column: 2/3;

  /* Box-model */
  margin-bottom: 2vh;
  /* Typography */

  /* Visual */

  /* Misc */
}

.option-selection--cta,
.option-completion--cta {
  /* Positioning */
  grid-column: 2/3;
  justify-self: center;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.option-completion--product {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, min-content);
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.option-completion--product .image-overlay {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/4;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.product--options {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.product--size,
.product--price {
  /* Positioning */
  align-self: center;
  justify-self: start;
  /* Box-model */
  width: var(--6base);
  height: var(--6base);
  padding: var(--halfbase) 0;
  text-align: center;
  margin: 0 var(--fourthbase);
  /* Typography */
  font-weight: bold;
  /* Visual */
  border-radius: var(--fourthbase);
  background-color: var(--grey-400);
  color: var(--grey-800);
  /* Misc */
}

.product--price {
  /* Positioning */
  /* Box-model */

  /* Typography */

  /* Visual */

  background-color: var(--grey-700);
  color: var(--grey-0);
  /* Misc */
}

@media (min-width: 45em) {
  .product--options {
    /* Positioning */

    /* Box-model */
    align-self: start;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--headline {
    /* Positioning */

    /* Box-model */
    align-self: end;
    /* Typography */
    font-size: var(--3base);
    /* Visual */

    /* Misc */
  }

  .product--color {
    /* Positioning */

    /* Box-model */
    align-self: center;
    /* Typography */
    font-size: var(--2base);
    font-weight: bold;
    /* Visual */

    /* Misc */
  }

  .product--size,
  .product--price {
    /* Positioning */
    align-self: center;
    justify-self: start;
    /* Box-model */
    width: var(--7base);
    height: var(--7base);
    padding: var(--1base) 0;

    /* Typography */

    font-size: var(--2base);
    /* Visual */
    /* Misc */
  }
}

.option-completion--more-shirts {
  /* Positioning */
  grid-column: 1/4;
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  padding: 5vh 0;
  /* Typography */
  /* Visual */
  background-color: var(--grey-200);
  /* Misc */
}

@media (min-width: 45em) {
  .option-completion--more-shirts {
    /* Positioning */
    grid-template-columns: 5vw 1fr 5vw;
    grid-auto-rows: min-content;
    grid-row-gap: 3vh;
    /* Box-model */
    padding: 3vh 0;
    /* Typography */
    /* Visual */

    /* Misc */
  }
}

.more-shirts--headline {
  /* Positioning */
  grid-column: 2/3;

  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.more-shirts--shirts {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-auto-columns: 40vw;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-column-gap: var(--1base);
  /* Box-model */
  overflow-x: scroll;
  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .more-shirts--shirts {
    /* Positioning */
    grid-auto-columns: 15vw;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 70em) {
  .more-shirts--shirts {
    /* Positioning */
    grid-auto-columns: 10vw;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.shirt-wrapper {
  /* Positioning */
  display: flex;
  flex-direction: column;

  /* Box-model */
  /* Typography */
  text-align: center;

  /* Visual */

  /* Misc */
}

.default-input-style {
  /* Positioning */

  /* Box-model */
  width: var(--5base);
  height: var(--5base);
  padding: var(--thirdbase) 0;
  text-align: center;
  margin: 0 var(--fourthbase);
  /* Typography */
  font-weight: bold;
  /* Visual */
  border-radius: var(--fourthbase);
  color: var(--grey-800);
  /* Misc */
}

@media (min-width: 22.5em) {
  .default-input-style {
    /* Positioning */

    /* Box-model */
    width: var(--6base);
    height: var(--6base);
    padding: var(--halfbase) 0;
    text-align: center;
    margin: 0 var(--fourthbase);
    /* Typography */
    /* Visual */
    border-radius: var(--fourthbase);
    color: var(--grey-800);
    /* Misc */
  }
  .sizes--inputs__label::after {
    /* Positioning */
    /* Box-model */

    width: var(--6base);
    height: var(--6base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.fixed-scroll {
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: scroll; /* render disabled scroll bar to keep the same width */
}
</style>
