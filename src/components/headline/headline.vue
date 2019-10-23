<template>
  <component
    class="styled-headline"
    :is="headlineType"
    :class="`styled-headline__${headlineType}`"
  >
    <span
      class="styled-headline--background"
      :class="[invertedColor ? 'styled-headline--background__inverted' : '']"
      >{{ headlineText }}
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    headlineText: {
      type: String
    },
    headlineType: {
      type: String,
      default: "h1"
    },
    invertedColor: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.styled-headline {
  /* Positioning */
  /* Box-model */
  overflow: hidden;
  /* Typography */
  /* Visual */
  /* Misc */
}

.styled-headline__h1 {
  /* Positioning */
  /* Box-model */
  padding: var(--h1__padding) 0;
  /* Typography */
  line-height: var(--h1__lineHeight);
  font-size: var(--h1__fontSize);

  /* Visual */

  /* Misc */
}

.styled-headline__h2 {
  /* Positioning */
  /* Box-model */
  padding: var(--h2__padding) 0;
  /* Typography */
  line-height: var(--h2__lineHeight);
  font-size: var(--h2__fontSize);

  /* Visual */

  /* Misc */
}
.styled-headline--background {
  /* Positioning */

  /* Box-model */
  padding: var(--fourthbase) var(--halfbase);
  /* Typography */

  /* Visual */
  background-color: var(--grey-100);

  /* Misc */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

@media (min-width: 90em) {
  .styled-headline--background {
    /* Positioning */

    /* Box-model */
    padding: var(--halfbase) var(--4base);
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .styled-headline__h2 .styled-headline--background {
    /* Positioning */

    /* Box-model */
    padding: var(--halfbase) var(--2base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.styled-headline--background__inverted {
  /* Positioning */
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: var(--grey-800);
  color: var(--grey-0);
  /* Misc */
}

.styled-headline i {
  /* Positioning */
  /* Box-model */
  /* Typography */
  font-style: normal;
  font-size: var(--1base);
  /* Visual */
  /* Misc */
}

.styled-headline--background__inverted i {
  /* Positioning */
  /* Box-model */
  /* Typography */
  /* Visual */
  color: var(--grey-0);
  /* Misc */
}
</style>
