<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="input.id" v-if="input.label">
      {{ input.label }}
    </label>
    <p v-show="error" class="error-layout">{{ error }}</p>
    <span class="input-wrapper input--shadow">
      <input
        class="input--form"
        :class="[error ? 'error' : '', invalidAuth ? 'error' : '']"
        :type="input.type"
        :placeholder="input.placeholder"
        :id="input.id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('defaultfocusevent')"
      />
    </span>
    <button
      class="show-password"
      v-if="input.type === 'password'"
      @click="togglePassword()"
    >
      show
    </button>
  </form>
</template>

<script>
export default {
  name: "inputField",
  props: {
    value: String,
    input: Object,
    error: Object,
    index: Number,
    invalidAuth: String
  },
  methods: {
    togglePassword() {
      let input = document.getElementById(`${this.input.id}`);
      if (input.type === "text") {
        input.type = "password";
      } else {
        input.type = "text";
      }
    }
  }
};
</script>

<style scoped>
.form {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: 1.5fr 1fr;
  width: 100%;
  position: relative;
}

.label--form {
  grid-column: 1/2;
  grid-row: 1/2;
  margin-bottom: var(--halfbase);
  font-size: var(--1base);
  font-weight: bold;
  color: var(--grey-800);
}

.input-wrapper {
  grid-column: 1/3;
  grid-row: 2/3;
  position: relative;
}

.input--form {
  width: 100%;
  padding: var(--1base);
  line-height: 150%;
  font-size: var(--1base);
  border-radius: var(--fourthbase);
  border: 1px solid var(--grey-500);
  color: var(--grey-800);
  position: relative;
  z-index: 2;
  background-color: var(--grey-200);
}

.input--form:focus {
  border: 1px solid var(--green-700);
}

.input--form::placeholder {
  font-size: var(--1base);
  color: var(--grey-600);
}

.error {
  border: 1px solid var(--red-700);
}

.error-layout {
  grid-column: 2/3;
  grid-row: 1/2;
  color: var(--red-700);
  font-weight: bold;
  margin-bottom: var(--halfbase);
  text-align: right;
}

.show-password {
  grid-column: 2/3;
  grid-row: 2/3;
  font-size: calc(var(--1base) * 0.8);
  font-weight: bold;
  color: var(--grey-600);
  text-decoration: underline;
  border: none;
  background-color: transparent;
  margin: 0;
  padding-right: var(--1base);
  justify-self: end;
  align-self: center;
  position: relative;
  z-index: 3;
}

.show-password:active {
  transform: translateY(0.1rem);
}

/*shadow hover effect*/

.input--shadow::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: var(--fourthbase);
}

.input--shadow:hover::before {
  opacity: 1;
}

.input--shadow:focus-within::before {
  opacity: 1;
}

.input--form,
.input--form:focus,
.button-search,
.button-search:focus,
.show-password,
.show-password:focus {
  outline: none;
  outline-style: none;
}
</style>
