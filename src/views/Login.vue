<template>
  <article class="login main main__small">
    <aside class="home--background main--background"></aside>

    <header class="login--header  main--header">
      <div class="login--logo">
        <logo></logo>
      </div>
      <styledHeadline headlineText="Welcome back"></styledHeadline>
      <p class="subheadline">
        You need to login so we can fetch your search- and purchase history. The
        first time you visit? Create a
        <router-link :to="{ name: 'signup', params: { nextPage } }"
          ><b>free account!</b></router-link
        >
        and be remembered!
      </p>
    </header>

    <section class="main--sidebar">
      <div class="login--features">
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

    <section class="inputs main--content">
      <input-default
        v-model="authData.email"
        :input="{
          label: 'Your Email',
          type: 'email',
          placeholder: 'YourEmail@provider.com',
          id: 'email-login'
        }"
        @defaultfocusevent="liftError('email')"
      />
      <input-default
        v-model="authData.password"
        :input="{
          label: 'Your Password',
          type: 'password',
          placeholder: '************',
          id: 'password-login'
        }"
        @defaultfocusevent="liftError('password')"
      />
      <button class="button-forgot" @click="toggleForgottenPasswordModal()">
        forgot your password?
      </button>
      <p
        class="auth-error"
        v-if="Object.values(invalidAuth).some(entry => entry)"
      >
        {{ invalidAuth.email || invalidAuth.password || invalidAuth.misc }}
      </p>
      <div class="button-field">
        <button-functional
          buttonText="Log me in"
          @buttonfunctionalevent="userLogin"
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
      </div>
    </section>

    <page-transition>
      <basic-modal
        v-if="forgottenPassword.showModal"
        @closemodalevent="toggleForgottenPasswordModal()"
        @backgroundmodalevent="toggleForgottenPasswordModal()"
      >
        <div class="header--modal-section">
          <h2 class="headline--header">
            Remembering all your passwords is hard
          </h2>
          <p class="subline--header">
            No worries, just type in your email-adress and we send you an email
            to restore it
          </p>
        </div>
        <!-- Modal-body section for saved email input-->
        <div
          class="body--modal-section"
          v-if="authData.email && !forgottenPassword.showInput"
        >
          <p>
            This was the last email typed in: <br />
            <b>{{ authData.email }}</b>
          </p>
          <p>Should we send it there?</p>
          <p class="auth-error" v-if="forgottenPassword.inputError">
            This email has some typos in it. Please type it in manually.
          </p>
          <p class="auth-error" v-if="forgottenPassword.invalidAuth">
            {{ forgottenPassword.invalidAuth }}
          </p>
        </div>
        <!-- Modal-body section for regular email input-->
        <div class="body--modal-section" v-else>
          <input-default
            v-model="forgottenPassword.email"
            :input="{
              label: 'Your Email',
              type: 'email',
              placeholder: 'YourEmail@provider.com',
              id: 'email-forgotten-password'
            }"
            :error="forgottenPassword.inputError"
            :invalidAuth="forgottenPassword.invalidAuth"
            @defaultfocusevent="liftError('inputError')"
          />
          <p class="auth-error" v-if="forgottenPassword.invalidAuth">
            {{ forgottenPassword.invalidAuth }}
          </p>
        </div>
        <!-- Modal-button section for saved email input-->
        <div
          class="buttons--modal-section"
          v-if="authData.email && !forgottenPassword.showInput"
        >
          <button-simple
            buttonText="No, let me type it in"
            tertiary="true"
            @simplebuttonevent="toggleForgottenPasswordEmail()"
          />
          <button-functional
            buttonText="Yes, send it there"
            @buttonfunctionalevent="passwordForgotten(authData.email)"
            :loading="forgottenPassword.loading"
            :success="forgottenPassword.success"
            :error="forgottenPassword.inputError"
            :invalidAuth="forgottenPassword.invalidAuth"
          />
        </div>
        <!-- Modal-body section for regular email input-->
        <div class="buttons--modal-section" v-else>
          <button-simple
            v-if="authData.email"
            buttonText="I think the other email was right"
            tertiary="true"
            @simplebuttonevent="toggleForgottenPasswordModal()"
          />
          <button-functional
            class="button-layout--alone"
            buttonText="Restore my password"
            @buttonfunctionalevent="passwordForgotten(forgottenPassword.email)"
            :loading="forgottenPassword.loading"
            :success="forgottenPassword.success"
            :error="forgottenPassword.inputError"
            :invalidAuth="forgottenPassword.invalidAuth"
          />
        </div> </basic-modal
    ></page-transition>
  </article>
</template>

<script>
const helper = require("@/misc/helper.js");

import { mapGetters } from "vuex";
import inputDefault from "@/components/inputs/InputDefault.vue";
import buttonFunctional from "@/components/buttons/ButtonFunctional.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import pageTransition from "@/components/transitions/transition.vue";
import basicModal from "@/components/modal/basicModal.vue";
import styledHeadline from "@/components/headline/headline.vue";
import logo from "@/components/icons/logo.vue";
import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    inputDefault,
    buttonFunctional,
    buttonSimple,
    pageTransition,
    basicModal,
    styledHeadline,
    logo,
    recap
  },
  name: "login",
  props: {
    nextPage: String
  },
  data() {
    return {
      loading: false,
      success: false,
      //authentication data
      authData: {
        email: "",
        password: ""
      },
      //per field input error messages
      inputError: {
        email: "",
        password: ""
      },
      //firestore auth error messages
      invalidAuth: {
        email: "",
        password: "",
        misc: ""
      },
      previousRoute: null,
      //modal object
      forgottenPassword: {
        showModal: false,
        showInput: false,
        email: "",
        success: false,
        loading: false,
        inputError: "",
        invalidAuth: ""
      }
    };
  },
  //saves the last route to send the user back where he came from after login in
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.previousRoute = from.name;
    });
  },
  methods: {
    userLogin() {
      console.log(this.$route);
      // perform a check
      if (this.checkForm()) {
        //if it returns true, set loading to true while firebase does its thing
        this.loading = true;
        // and dispath the Login vuex call
        this.$store
          .dispatch("authModule/AUTH_login", this.authData)
          //when it returns true
          .then(result => {
            //set loading to false
            this.loading = false;
            // and display a success-green around the button
            this.success = true;
            setTimeout(() => {
              /*for the user to see this, the next step is delayed by 500ms.
               The next step is a set page, going back to the route were the user came from or to go back to the starting page*/
              if (this.nextPage) {
                this.goTo(this.nextPage);
              } else if (
                this.previousRoute &&
                this.previousRoute !== "signup"
              ) {
                this.goTo(this.previousRoute);
              } else {
                this.goTo("store");
              }
              this.success = false;
            }, 500);
          })
          .then(() => {
            //clean the data for usage again
            this.authData = {
              email: "",
              password: ""
            };
          })
          .catch(error => {
            //show an error when firebase returns an error
            console.log(error);
            this.loading = false;
            if (error.search("email")) {
              this.invalidAuth.email = error;
            } else if (error.search("password")) {
              this.invalidAuth.password = error;
            } else {
              this.invalidAuth.misc = error;
            }
          });
      }
    },
    checkForm() {
      //reset all errors
      this.resetErrors();

      //check for an email and than for a valid email adress
      if (!this.authData.email) {
        this.inputError.email = "is required for this";
      } else if (!helper.validateEmail(this.authData.email)) {
        this.inputError.email = "has some typos in it";
      }
      //check for a password
      if (!this.authData.password) {
        this.inputError.password = "is not here :(";
      }
      //check if there is no truthy value in the error array
      //if everything is valid, continue
      if (Object.values(this.inputError).every(error => !error)) {
        return true;
      }
    },
    liftError(errorSection) {
      //lift the error when the user focuses the specific input element
      //for the modal inputs
      if (errorSection === "inputError") {
        this.forgottenPassword.inputError = "";
        this.forgottenPassword.invalidAuth = "";
        return;
      }
      //and the site inputs
      this.inputError[errorSection] = "";
      this.invalidAuth[errorSection] = "";
    },
    resetErrors() {
      //reset all errors
      this.inputError = {
        email: "",
        password: ""
      };
      this.invalidAuth = {
        email: "",
        password: "",
        misc: ""
      };
    },
    toggleForgottenPasswordModal() {
      //resets modal object before closing the modal
      if (this.forgottenPassword.showModal) {
        this.resetModal();
      }
      //toggle the modal
      this.forgottenPassword.showModal = !this.forgottenPassword.showModal;
    },
    toggleForgottenPasswordEmail() {
      //resets modal object before switching input methods
      //leaves the saved email because its not stored in the modal object but in the authData object
      this.resetModal();

      //toggle the input methods
      this.forgottenPassword.showInput = !this.forgottenPassword.showInput;
    },
    resetModal() {
      //resets the modal object besides the toggleParts
      this.forgottenPassword.email = "";
      this.forgottenPassword.success = false;
      this.forgottenPassword.loading = false;
      this.forgottenPassword.inputError = "";
      this.forgottenPassword.invalidAuth = "";
    },
    passwordForgotten(email) {
      //remove errors
      this.forgottenPassword.inputError = "";
      //check if email is there and valid
      if (!email) {
        this.forgottenPassword.inputError = "is required";
        return;
      } else if (!helper.validateEmail(email)) {
        this.forgottenPassword.inputError = "has some typos";
        return;
      }
      //start loading befor sending it to the firebase auth
      this.forgottenPassword.loading = true;
      //dispatch the call and listen to the result
      this.$store
        .dispatch("authModule/AUTH_passwordForgotten", email)
        .then(result => {
          //stop the loading animation and display a success message
          this.forgottenPassword.loading = false;
          this.forgottenPassword.success = true;
          setTimeout(() => {
            //close the modal after 1s so the user can see the success
            this.toggleForgottenPasswordModal();
          }, 1000);
        })
        .catch(error => {
          //show an error when firebase returns an error
          console.log(error);
          this.forgottenPassword.loading = false;
          this.forgottenPassword.invalidAuth = error;
        });
    },
    //programmatic routing
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  }
};
</script>

<style scoped>
.login {
  padding-top: 0;
  padding-bottom: 10vh;
}

.login--header {
  padding: calc(7.5vh + var(--navbar__height)) 0 5vh 0;
}

.login--logo {
  height: var(--h1--fontsize__fixed);
  width: auto;
  margin-bottom: var(--1base);
}

@media (min-width: 45em) {
  .login--logo {
    height: var(--h2--fontsize__fixed);
  }
}

.subheadline {
  max-width: 30rem;
}

.inputs {
  display: grid;
  grid-template-rows: min-content min-content min-content 1fr;
  grid-row-gap: var(--1base);
}

.button-forgot {
  font-size: calc(var(--1base) * 0.8);
  font-weight: bold;
  color: var(--grey-600);
  text-decoration: underline;
  border: none;
  background-color: transparent;
  margin: 0;
  justify-self: start;
  align-self: center;
}

.button-forgot,
.button-forgot :focus {
  outline: none;
  outline-style: none;
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

.button-layout--alone {
  grid-row: 2/3;
}

.buttons--modal-section {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--1base);
  margin-bottom: var(--2base);
}
</style>
