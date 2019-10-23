<template>
  <section class="modal-layout">
    <header class="modal-layout--header">
      <slot name="header"></slot>
    </header>
    <div class="modal-layout--main">
      <slot name="main"></slot>
    </div>
    <div
      class="modal-layout--buttons"
      :style="`justify-content: ${alignButtons}`"
    >
      <slot name="buttons"></slot>
    </div>
    <div class="modal-layout--extra z-index-2" v-if="extraContent">
      <slot name="extra"></slot>
    </div>
    <aside
      class="modal-layout--extra__background z-index-1"
      v-if="extraContent"
    ></aside>
  </section>
</template>

<script>
export default {
  name: "modalLayout",
  props: {
    alignButtons: {
      type: String,
      default: "center"
    },
    extraContent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped>
.modal-layout {
  display: grid;
  grid-template-columns: var(--1base) 1fr var(--1base);
  grid-row-gap: 5vh;
  padding: 5vh 0;
}

@media (min-width: 30em) {
  .modal-layout {
    grid-template-columns: var(--2base) 1fr var(--2base);
    grid-row-gap: 3vh;
    padding: 3vh 0 5vh 0;
  }
}

@media (min-width: 37.5em) {
  .modal-layout {
    grid-template-columns: var(--3base) 1fr var(--3base);
  }
}

@media (min-width: 45em) {
  .modal-layout {
    grid-template-columns: var(--5base) 1fr var(--5base);
    padding: 3vh 0;
  }
}

.modal-layout--header {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 1/2;
  /* Box-model */

  /* Typography */

  /* Visual */
}

.modal-layout--main {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */
}

.modal-layout--buttons {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* Box-model */

  /* Typography */

  /* Visual */
}

.modal-layout--extra {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 4/5;
  /* Box-model */
  padding: 5vh 0 0 0;
  /* Typography */

  /* Visual */
}

.modal-layout--extra__background {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 4/5;
  /* Box-model */
  margin-bottom: -5vh;
  /* Typography */
  background-color: hsla(0, 0%, 90%, 1);
  /* Visual */
}

@media (min-width: 30em) {
  .modal-layout--extra {
    /* Positioning */

    /* Box-model */
    padding: 3vh 0 0 0;
    /* Typography */

    /* Visual */
  }

  .modal-layout--extra__background {
    /* Positioning */

    /* Box-model */
    margin-bottom: -3vh;
    /* Typography */

    /* Visual */
  }
}
</style>
