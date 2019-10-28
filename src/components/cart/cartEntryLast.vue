<template>
  <modal-layout class="cart-entry-last">
    <template #header>
      <styledHeadline
        headlineText="What do you want to change?"
        :headlineType="responsiveHeadline"
        :invertedColor="true"
      />
    </template>
    <template #main>
      <section class="cart-entry-last--product__layout">
        <div class="cart-entry-last--inputs">
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
            <p class="amount--number default-input-style">
              {{ amount }}
            </p>
            <button
              class="amount--button amount--decrease default-input-style"
              @click="changeAmount('increase')"
            >
              +
            </button>
          </div>
        </div>
      </section>
    </template>
    <template #buttons>
      <buttonSimple
        class="cart-entry-last--cta"
        :buttonText="`back`"
        @simplebuttonevent="$emit('entrylastevent', { amount, size })"
      />
    </template>
  </modal-layout>
</template>

<script>
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import modalLayout from "@/components/modal/modalLayout.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    buttonSimple,
    modalLayout,
    styledHeadline
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  name: "cartEntryLast",
  data() {
    return {
      amount: 1,
      size: "M",
      sizes: ["S", "M", "L", "XL"]
    };
  },

  methods: {
    changeAmount(mode) {
      if (mode === "decrease") {
        if (this.amount > 1) {
          this.amount -= 1;
          return;
        }
        return;
      }

      this.amount += 1;
    }
  },
  computed: {
    responsiveHeadline() {
      if (window.innerWidth > 700) {
        return "h2";
      }
      return "h1";
    }
  },

  mounted() {
    console.log("entryLast: " + this.entry);
    (this.amount = this.entry.amount), (this.size = this.entry.size);
  },
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
@media (min-width: 64em) {
  .cart-entry-last {
    /* Positioning */
    /* Box-model */
    max-width: 30rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.cart-entry-last--product__layout {
  display: grid;
  grid-row-gap: 5vh;
}

@media (min-width: 45em) {
  .cart-entry-last--product__layout {
    grid-row-gap: 3vh;
  }
}

.cart-entry-last--inputs {
  /* Positioning */

  display: grid;
  grid-auto-flow: row;
  grid-template-rows: min-content 1fr;
  grid-column-gap: var(--halfbase);

  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 30em) {
  .cart-entry-last--inputs {
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
  margin-bottom: 3vh;
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

@media (min-width: 30em) {
  .inputs--description {
    /* Positioning */
    justify-self: center;
    align-self: center;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.cart-entry-last--promotion {
  /* Positioning */
  grid-column: 1/3;

  /* Box-model */
  margin-top: -2vh;
  /* Typography */
  color: var(--red-700);
  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  font-size: var(--h2__fontSize);
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
</style>
