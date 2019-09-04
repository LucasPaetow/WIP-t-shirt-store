<template>
  <button
  :class="[success ? 'success' : '', error ? 'error' : '', invalidAuth ? 'error' : '']"
    class="button button-continue"
    @click="$emit('buttonfunctionalevent')"
  >
    <div class="loading-state spinner" v-if="loading" key="loading">
      <div class="bounce1 bounce"></div>
      <div class="bounce2 bounce"></div>
      <div class="bounce3 bounce"></div>
    </div>
    <div class="error-state" v-else-if="error" key="error">
      <p class="button-text">Input problems!</p>
    </div>
    <div class="error-state" v-else-if="invalidAuth" key="error">
      <p class="button-text">Account problems!</p>
    </div>
    <div class="success-state" v-else-if="success" key="success">
      <p class="button-text">Lets go!</p>
    </div>
    <div class="default-state button-layout" v-else key="defaultState">
      <p class="button-text">{{ buttonText }}</p>
      <arrow-icon />
    </div>

  </button>

  </button>
</template>

<script>
import arrowIcon from "@/components/icons/arrow.vue";


export default {
    components:{arrowIcon},
  name: "buttonFunctional",
  props: ["buttonText", "loading", "error", "success", "invalidAuth"]
};
</script>

<style scoped>
/*----general button style-----*/

.button-continue {
    color: white;
    background-color: var(--grey-800);
}

.button {
    width: 100%;
    min-width: 8rem;
    height: 100%;
    padding: var(--halfbase) var(--1base);
    margin: var(--halfbase) 0;
    border-radius: var(--fourthbase);
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
    position: relative;
    cursor: pointer;
    font-size: var(--halfbase);
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
}


@media (min-width: 25em) {
  .button {
    max-width: 13.5rem;
  }
}

@media (min-width: 28em) {
  .button {
    max-width: 14.5rem;
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

/*----default state-----*/

.default-state {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button-text {
  color: hsl(0, 0%, 100%);
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  padding-right: 0;
}

@media (min-width: 22.5em) {
    .button-text {
      padding-right: var(--halfbase);
    }
}

/*-----error/success----*/

.error {
  color: white;
  background-color: var(--red-700);
}

.success {
  color: hsl(0, 0%, 100%);
  background-color: var(--green-700);
}

/*----loading-----*/

.spinner {
  text-align: center;
}

.bounce {
  width: 0.75rem;
  height: 0.75rem;
  background-color: white;
  margin: 0 0.1rem;
  border-radius: 100%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
