<template>
  <div class="option-selection--inputs">
    <p class="inputs--description">
      <b>Your size:</b>
    </p>
    <div class="sizes--inputs inputs">
      <input
        class="sizes--inputs__input "
        v-for="(clothingSize, index1) in propSizes"
        :key="clothingSize + index1 + 'sizeContentFirst1'"
        :id="`size-${clothingSize}`"
        type="radio"
        :value="clothingSize"
        v-model="size"
        @change="$emit('change', $event.target.value)"
      />
      <label
        v-for="(clothingSize, index2) in propSizes"
        :key="clothingSize + index2 + 'sizeContentFirst2'"
        :for="`size-${clothingSize}`"
        class="sizes--inputs__label default-input-style"
        :class="[propValue === clothingSize ? 'active' : '']"
        >{{ clothingSize }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    propSizes: Array,
    propValue: String
  },
  name: "inputSize",
  data() {
    return {
      size: null
    };
  },
  methods: {},
  computed: {},

  mounted() {}
};
</script>

<style scoped>
.option-selection--inputs {
  /* Positioning */

  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-column-gap: var(--halfbase);
  grid-row-gap: 5vh;
  /* Box-model */
  max-width: 30rem;
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

.inputs--description {
  /* Positioning */
  justify-self: center;
  align-self: center;
  /* Box-model */

  /* Typography */

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
