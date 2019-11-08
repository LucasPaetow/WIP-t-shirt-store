<template>
  <div class="option-selection--inputs">
    <p class="amount--description inputs--description">
      <b>Amount:</b>
    </p>
    <div class="amount--inputs inputs">
      <button
        class="amount--button amount--increase default-input-style"
        @click="$emit('inputamountevent', 'decrease')"
      >
        -
      </button>
      <p class="amount--number default-input-style">
        {{ amount }}
      </p>
      <button
        class="amount--button amount--decrease default-input-style"
        @click="$emit('inputamountevent', 'increase')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    amount: Number
  },
  name: "inputAmount",
  data() {
    return {};
  },

  methods: {},
  computed: {},

  mounted() {},
  //same check for route-view keep-alive
  activated() {}
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
}
</style>
