<template>
  <modal-layout class="option-selection">
    <template #header>
      <styledHeadline
        headlineText="What is your closing size, champion?"
        :headlineType="responsiveHeadline"
        :invertedColor="true"
      />
      <p class="header--subline">
        Get it by tomorrow, if you order in the next XXh YYmin
      </p>
    </template>
    <template #main>
      <section class="option-selection--product__layout">
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
          <p class="option-selection--promotion">
            If you buy 3 or mor shirts, you get the shipping for free
          </p>
        </div>
        <!--<div class="option-selection--materials">
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
      </div> -->
      </section>
    </template>
    <template #buttons>
      <buttonSimple
        class="option-selection--cta"
        :buttonText="`Add ${amount} to card for ${amount * 20}$`"
        @simplebuttonevent="$emit('contentfirstevent', { amount, size })"
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
  props: {},
  name: "sizeOptions",
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
    responsiveHeadline() {
      if (window.innerWidth > 700) {
        return "h2";
      }
      return "h1";
    }
  },

  mounted() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
@media (min-width: 70em) {
  .option-selection {
    /* Positioning */
    /* Box-model */
    max-width: 30rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.option-selection--product__layout {
  display: grid;
  grid-row-gap: 5vh;
}

@media (min-width: 45em) {
  .option-selection--product__layout {
    grid-row-gap: 3vh;
  }
}

.option-selection--inputs {
  /* Positioning */

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
