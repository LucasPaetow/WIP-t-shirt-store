<template>
  <page-transition>
    <article class="signup" v-if="emailConfirmation">
      <header class="header">
        <h1 class="headline">Good job!</h1>
        <p class="subheadline">
          You are doing great
        </p>
      </header>
      <section class="email-confirmation">
        <p>
          We sent you a confirmation email to:<br />
          {{ authData.email }}
        </p>
        <p>
          Please click the confirmation link in the email we sent you, so you
          dont lose out on features like:
        </p>
        <ul class="reasons--email-confirmation">
          <li class="reason">Saving your search history</li>
          <li class="reason">Access to exclusive deals</li>
        </ul>
        <p class="postphone--email-confirmation">
          If you want to do it later, thats fine. You still can continue now
        </p>
      </section>
      <section class="button-field">
        <!--buttons with additional error handling -->
        <button-simple
          buttonText="Continue"
          primary="true"
          class="button-layout--single-button"
          @simplebuttonevent="navigateToTheLastPage()"
        />
        <!-- Get the values of the error object as array, check this array if there is a truthy value in there-->
      </section>
    </article>
    <article class="signup" v-else>
      <header class="header">
        <h1 class="headline">Create your free account</h1>
        <p class="subheadline">
          Create a free account to revisit your searches and your
          purchases/wishlist. Already famous here?
          <router-link :to="{ name: 'login' }"><b>Login!</b></router-link>
        </p>
      </header>
      <section class="inputs">
        <input-default
          v-model="authData.name"
          :input="{
            label: 'Your Name',
            type: 'name',
            placeholder: 'e.g. Val Kilmer',
            id: 'name-signup'
          }"
          :error="inputError.name"
          :invalidAuth="invalidAuth.misc"
          @defaultfocusevent="liftError('name')"
        />
        <input-default
          v-model="authData.email"
          :input="{
            label: 'Your Email',
            type: 'email',
            placeholder: 'YourEmail@provider.com',
            id: 'email-signup'
          }"
          :error="inputError.email"
          :invalidAuth="invalidAuth.email || invalidAuth.misc"
          @defaultfocusevent="liftError('email')"
        />
        <input-default
          v-model="authData.password"
          :input="{
            label: 'Your Password',
            type: 'password',
            placeholder: '************',
            id: 'password-signup'
          }"
          :error="inputError.password"
          :invalidAuth="invalidAuth.misc"
          @defaultfocusevent="liftError('password')"
        />
        <div class="password-validation">
          <p
            class="criteria"
            :class="[
              lengthValidated ? 'successful-validation' : '',
              inputError.validation === 'length' ? 'error-validation' : ''
            ]"
          >
            At least 8 characters
          </p>
          <p
            class="criteria"
            :class="[
              uppercaseValidated ? 'successful-validation' : '',
              inputError.validation === 'uppercase' ? 'error-validation' : ''
            ]"
          >
            One uppercase letter
          </p>
          <p
            class="criteria"
            :class="[
              numberValidated ? 'successful-validation' : '',
              inputError.validation === 'number' ? 'error-validation' : ''
            ]"
          >
            One number
          </p>
        </div>
        <p
          class="auth-error"
          v-if="Object.values(invalidAuth).some(entry => entry)"
        >
          {{ invalidAuth.email || invalidAuth.password || invalidAuth.misc }}
        </p>
      </section>
      <section class="button-field">
        <!--buttons with additional error handling -->
        <button-simple
          buttonText="back"
          secondary="true"
          @simplebuttonevent="goTo('start')"
        />
        <button-functional
          buttonText="Create account"
          @buttonfunctionalevent="userSignup"
          :loading="loading"
          :success="success"
          :error="Object.values(inputError).some(entry => entry)"
          :invalidAuth="Object.values(invalidAuth).some(entry => entry)"
        />
        <!-- Get the values of the error object as array, check this array if there is a truthy value in there-->
      </section>
    </article>
  </page-transition>
</template>

<script>
const helper = require("@/misc/helper.js");

import { mapGetters } from "vuex";
import inputDefault from "@/components/inputs/InputDefault.vue";
import buttonFunctional from "@/components/buttons/ButtonFunctional.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    inputDefault,
    buttonFunctional,
    buttonSimple,
    pageTransition
  },
  name: "signup",
  data() {
    return {
      loading: false,
      success: false,
      authData: {
        name: "",
        email: "",
        password: ""
      },
      //per field error messages
      inputError: {
        name: "",
        email: "",
        password: "",
        validation: ""
      },
      invalidAuth: {
        email: "",
        misc: ""
      },
      previousRoute: null,
      emailConfirmation: false
    };
  },
  //saves the last route to send the user back where he came from after login in
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.previousRoute = from.name;
    });
  },
  methods: {
    userSignup() {
      // perform a check
      if (this.checkForm()) {
        //if it returns true, set loading to true while firebase does its thing
        this.loading = true;
        // and dispath the signup vuex call
        this.$store
          .dispatch("authModule/AUTH_signup", this.authData)
          //when it returns true
          .then(result => {
            //set loading to false
            this.loading = false;
            // and display a success-green around the button
            this.success = true;
            setTimeout(() => {
              //for the user to see this, the next step is delayed
              this.toggleEmailConfirmation();
              this.success = false;
            }, 1000);
          })
          .catch(error => {
            //show an error when firebase returns an error
            console.log(error);
            this.loading = false;
            if (error.search("email")) {
              this.invalidAuth.email = error;
            } else {
              this.invalidAuth.misc = error;
            }
          });
      }
    },
    toggleEmailConfirmation() {
      this.emailConfirmation = !this.emailConfirmation;
    },
    checkForm() {
      //reset all errors
      this.resetErrors();

      //check for a name
      if (!this.authData.name) {
        this.inputError.name = "sadly, its missing";
      }
      //check for an email and than for a valid email adress
      if (!this.authData.email) {
        this.inputError.email = "is required for this";
      } else if (!helper.validateEmail(this.authData.email)) {
        this.inputError.email = "has some typos in it";
      }
      //check for a password
      if (!this.authData.password) {
        this.inputError.password = "is not here :(";
      } else if (!this.lengthValidated) {
        this.inputError.password = "needs more security";
        this.inputError.validation = "length";
      } else if (!this.uppercaseValidated) {
        this.inputError.password = "needs more security";
        this.inputError.validation = "uppercase";
      } else if (!this.numberValidated) {
        this.inputError.password = "needs more security";
        this.inputError.validation = "number";
      }
      //if everything is valid, continue
      if (Object.values(this.inputError).every(error => !error)) {
        return true;
      }
    },
    liftError(errorSection) {
      //lift the error when the user focuses the specific input element
      this.inputError[errorSection] = "";
      this.invalidAuth.misc = "";
      if (errorSection === "password") {
        this.inputError.validation = "";
      }
      if (errorSection === "email") {
        this.invalidAuth.email = "";
      }
    },
    resetErrors() {
      this.inputError = {
        name: "",
        email: "",
        password: "",
        validation: ""
      };
    },
    navigateToTheLastPage() {
      if (this.previousRoute && this.previousRoute !== "signup") {
        this.goTo(this.previousRoute);
      } else {
        this.goTo("start");
      }
    },
    //programmatic routing
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  },
  computed: {
    lengthValidated() {
      //return true if the length is over 8
      if (this.authData.password.length >= 8) {
        return true;
      }
    },
    uppercaseValidated() {
      //check if the letter is upper case
      let uppercaseCheck = letter => {
        return letter === letter.toUpperCase();
      };
      //spread the word into an array of letters and check them
      return [...this.authData.password].some(
        letter => uppercaseCheck(letter) && isNaN(letter)
      );
    },
    numberValidated() {
      //spread the word into an array of letters and check them
      return [...this.authData.password].some(letter => !isNaN(letter));
    }
  }
};
</script>

<style scoped>
.signup {
  min-height: 100%;
  display: grid;
  padding: var(--7base) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: min-content min-content 1fr;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-row-gap: 3vh;
}

.header {
  grid-column: 2/3;
  grid-row: 2/3;
}

.inputs {
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
}

.password-validation {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.criteria {
  padding-left: var(--2base);
  position: relative;
  opacity: 0.5;
}

.criteria::before {
  content: "";
  position: absolute;
  left: 0;
  transform: translateY(var(--fourthbase));
  height: var(--halfbase);
  width: var(--halfbase);
  border-radius: 50%;
  background-color: var(--grey-800);
  opacity: 0.5;
}

.successful-validation {
  opacity: 1;
}

.successful-validation.criteria::before {
  opacity: 1;
}

.error-validation {
  opacity: 1;
  color: var(--red-700);
}

.error-validation.criteria::before {
  opacity: 1;
  background-color: var(--red-700);
}

.auth-error {
  align-self: end;
  color: var(--red-700);
  font-weight: bold;
}

.button-field {
  grid-column: 2/3;
  grid-row: 4/5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--1base);
  height: var(--6base);
  margin-bottom: var(--2base);
}

/*Part 2: Email Confirmation*/

.email-confirmation {
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: var(--1base);
}

.reasons--email-confirmation {
  padding: var(--1base) 0;
}

.reason {
  font-weight: bold;
  margin: 0 0 var(--halfbase) var(--2base);
  list-style: circle;
}

.button-layout--single-button {
  grid-column: 2/3;
}
</style>
