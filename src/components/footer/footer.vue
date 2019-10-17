<template
  ><footer class="footer">
    <div class="footer--section">
      <h3 class="footer--section__headline">About the shirt</h3>
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Sizes</router-link
      >
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Quality</router-link
      >
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Wash and care instructions</router-link
      >
    </div>
    <div class="footer--section">
      <h3 class="footer--section__headline">About shipping</h3>
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Shipping and returns</router-link
      >
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Order Tracking</router-link
      >
    </div>
    <div class="footer--section">
      <h3 class="footer--section__headline">About us</h3>
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Our Story</router-link
      >
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Impressum</router-link
      >
      <router-link :to="{ name: '' }" class="footer--section__link"
        >Privacy</router-link
      >
    </div>
  </footer></template
>

<script>
export default {};
</script>

<style scoped>
.footer {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: var(--4base);
  /* Box-model */
  padding: 10vh 0;
  /* Typography */

  /* Visual */
  background-color: grey;
  /* Misc */
}

.footer--headline {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */

  /* Typography */
  font-size: var(--h1__fontSize);
  /* Visual */

  /* Misc */
}

.footer--section {
  /* Positioning */
  grid-column: 2/3;
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
  font-size: var(--h2__fontSize);
  /* Visual */

  /* Misc */
}

.footer--section__link {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--fourthbase);
  /* Typography */

  /* Visual */
  color: var(--grey-200);
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

@media (min-width: 45em) {
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
