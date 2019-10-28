<template>
  <button
    v-if="error"
    class="button button-error"
    @click="$emit('simplebuttonevent')"
  >
    error
  </button>
  <button
    v-else
    class="button"
    :class="buttonType"
    @click="$emit('simplebuttonevent')"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "buttonSimple",
  props: {
    buttonText: String,
    error: String,
    buttonType: {
      type: String,
      default: "primary"
    }
  }
  /*props: ["buttonText", "error", "secondary", "tertiary"]*/
};
</script>

<style scoped>
/*layout*/
.button {
  height: 100%;
  padding: var(--1base);
  border-radius: var(--fourthbase);
  position: relative;
  cursor: pointer;
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}

@media (min-width: 22.5em) {
  .button {
    padding: var(--1base) var(--2base);
    font-size: var(--halfbase);
  }
}

@media (min-width: 37.5em) {
  .button {
    padding: var(--1base) var(--3base);
  }
}

@media (min-width: 45em) {
  .button {
    padding: var(--1base) var(--5base);
  }
}

@media (min-width: 64em) {
  .button {
    padding: var(--1base) var(--6base);
  }
}

.button::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 500ms;
  border-radius: var(--thirdbase);
}

.button:hover::before {
  opacity: 1;
}

.button,
.button:focus {
  outline: none;
  outline-style: none;
  border: none;
}

.button:active {
  transform: translateY(0.1rem);
}

.primary {
  color: white;
  background-color: var(--grey-800);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
}

.secondary {
  color: var(--grey-800);
  background-color: var(--grey-300);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
}

.tertiary {
  color: var(--grey-800);
  background-color: transparent;
}

.choose-size {
  color: white;
  background-color: var(--grey-700);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  max-width: 8rem;
  height: var(--6base);
}

.no-styling {
  color: var(--grey-800);
  background-color: transparent;
  min-width: 0;
  max-width: 10rem;
  padding: 0;
  margin: 0;
  border-radius: var(--fourthbase);
  position: static;
  cursor: pointer;
  font-size: var(--1base);
  text-transform: none;
  font-family: "Poppins", sans-serif;
  font-weight: normal;
}

.button-error {
  color: white;
  background-color: var(--red-700);
}
</style>
