<template>
  <article class="main main__small signup">
    <aside class="home--background main--background"></aside>

    <header class="signup--header  main--header">
      <div class="signup--logo">
        <logo></logo>
      </div>

      <styledHeadline headlineText="Create your free account"></styledHeadline>
      <p class="subheadline">
        Create a free account to revisit your searches and your
        purchases/wishlist. Already famous here?
        <router-link :to="{ name: 'login', params: { nextPage } }"
          ><b>Login!</b></router-link
        >
      </p>
    </header>
    <page-transition>
      <section class="main--sidebar" v-if="emailConfirmation">
        <div class="signup--features"></div>
      </section>
      <section class="main--sidebar" v-else>
        <div class="signup--features">
          <styledHeadline
            headlineText="Whats new"
            headlineType="h3"
            :invertedColor="true"
          ></styledHeadline>
          <div class="checkout-recap recap-desktop recap-wrapper">
            <recap headline="We added new colors!">
              <p>
                Nature begged us to use some of their stunning colors just to be
                in the same sentence with us
              </p></recap
            >
            <recap :last="true" headline="Comming soon">
              <p>
                See athletes cry in a 6 hour compilation after losing to our
                t-shirts in the sport you like
              </p></recap
            >
          </div>
        </div>
      </section>
    </page-transition>
    <page-transition>
      <section
        class="email-confirmation main--content"
        v-if="emailConfirmation"
      >
        <header class="email-confirmation--header">
          <styledHeadline
            headlineText="Good job!"
            headlineType="h2"
          ></styledHeadline>
          <p class="subheadline">
            You are doing great
          </p>
        </header>
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
        <div class="button-field">
          <button-simple
            buttonText="Continue"
            primary="true"
            class="button-layout--single-button"
            @simplebuttonevent="navigateToTheLastPage()"
          />
        </div>
      </section>
      <section class="inputs main--content" v-else>
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
        <div class="button-field">
          <!--buttons with additional error handling -->
          <button-functional
            buttonText="Create account"
            @buttonfunctionalevent="userSignup"
            :loading="loading"
            :success="success"
            :error="Object.values(inputError).some(entry => entry)"
            :invalidAuth="Object.values(invalidAuth).some(entry => entry)"
          />
          <button-simple
            buttonText="back"
            secondary="true"
            @simplebuttonevent="goTo('home')"
          />

          <!-- Get the values of the error object as array, check this array if there is a truthy value in there-->
        </div>
      </section>
    </page-transition>
  </article>
</template>

<script>
const helper = require("@/misc/helper.js");

import inputDefault from "@/components/inputs/InputDefault.vue";
import buttonFunctional from "@/components/buttons/ButtonFunctional.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import pageTransition from "@/components/transitions/transition.vue";
import styledHeadline from "@/components/headline/headline.vue";
import logo from "@/components/icons/logo.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    inputDefault,
    buttonFunctional,
    buttonSimple,
    pageTransition,
    styledHeadline,
    logo,
    recap
  },
  props: {
    nextPage: String
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
          .then(() => {
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
      return this.authData.password.length >= 8 ? true : false;
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
  padding-top: 0;
  padding-bottom: 10vh;
}

.signup--logo {
  height: var(--h1--fontsize__fixed);
  width: auto;
  margin-bottom: var(--1base);
}

@media (min-width: 45em) {
  .signup--logo {
    height: var(--h2--fontsize__fixed);
  }
}

.signup--header {
  padding: calc(7.5vh + var(--navbar__height)) 0 5vh 0;
}

.subheadline {
  max-width: 30rem;
}

.inputs {
  grid-column: 2/3;
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
  display: grid;
  grid-row-gap: var(--1base);
  height: var(--6base);
  margin-bottom: var(--2base);
}

/*Part 2: Email Confirmation*/

.email-confirmation {
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
