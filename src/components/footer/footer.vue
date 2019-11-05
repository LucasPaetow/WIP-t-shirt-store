<template
  ><footer class="footer layout">
    <div class="footer--section">
      <h2 class="footer--section__headline">About the shirt</h2>
      <router-link
        :to="{ name: 'about', hash: '#sizes' }"
        class="footer--section__link"
        >Sizes</router-link
      >
      <router-link
        :to="{ name: 'about', hash: '#quality' }"
        class="footer--section__link"
        >Quality</router-link
      >
      <router-link
        :to="{ name: 'about', hash: '#care' }"
        class="footer--section__link"
        >Wash and care instructions</router-link
      >
    </div>
    <div class="footer--section">
      <h2 class="footer--section__headline">About shipping</h2>
      <router-link
        :to="{ name: 'about', hash: '#shipping' }"
        class="footer--section__link"
        >Shipping and returns</router-link
      >
      <router-link
        :to="{ name: 'about', hash: '#tracking' }"
        class="footer--section__link"
        >Order Tracking</router-link
      >
    </div>
    <div class="footer--section">
      <h2 class="footer--section__headline">About us</h2>
      <router-link
        :to="{ name: 'about', hash: '#us' }"
        class="footer--section__link"
        >Our Story</router-link
      >
      <router-link
        :to="{ name: 'legal', hash: '#impressum' }"
        class="footer--section__link"
        >Impressum</router-link
      >
      <router-link
        :to="{ name: 'legal', hash: '#privacy' }"
        class="footer--section__link"
        >Privacy</router-link
      >
    </div>
  </footer></template
>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.footer {
  /* Positioning */
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: var(--4base);
  /* Box-model */
  padding-bottom: 10vh;
  margin-top: 10vh;
  /* Typography */

  /* Visual */
  background-color: var(--grey-300);
  /* Misc */
}

.footer--section {
  /* Positioning */
  grid-column: 3/5;
  display: flex;
  flex-direction: column;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.footer--section__headline {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--halfbase);
  /* Typography */
  /* Visual */

  /* Misc */
}

.footer--section__link {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--fourthbase);
  /* Typography */

  /* Visual */
  color: var(--grey-800);
  /* Misc */
}

@media (min-width: 22.5em) {
  .footer--section__link {
    /* Positioning */

    /* Box-model */
    margin-bottom: var(--fourthbase);
    /* Typography */
    font-size: var(--2base);
    /* Visual */

    /* Misc */
  }
}

@media (min-width: 30em) {
  .footer--section {
    /* Positioning */
    grid-column: 3/4;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 48em) {
  .footer {
    /* Positioning */
    grid-template-columns: var(--column-spacing) 1fr 1fr 1fr var(
        --column-spacing
      );
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .footer--section {
    /* Positioning */
    justify-self: center;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .footer--section:nth-of-type(1) {
    /* Positioning */
    grid-column: 2/3;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .footer--section:nth-of-type(2) {
    /* Positioning */
    grid-column: 3/4;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .footer--section:nth-of-type(3) {
    /* Positioning */
    grid-column: 4/5;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}
</style>
