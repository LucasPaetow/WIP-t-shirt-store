<template>
  <article class="navbar-basic" id="nav-basic">
    <router-link class="link1 link--navbar-basic" :to="{ name: 'start' }"
      >Titel</router-link
    >
    <button-simple
      v-if="!userProfile"
      class="button-layout"
      buttonText="Save my searches"
      @simplebuttonevent="goTo('login')"
    />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: { buttonSimple },
  name: "navbarBasic",
  methods: {
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  },
  computed: {
    ...mapGetters({
      userProfile: "authModule/getUserProfile"
    })
  }
};
</script>

<style scoped>
.navbar-basic {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  padding: 0 var(--1base);
}

.link--navbar-basic {
  align-self: center;
}

.link1 {
  grid-column: 1/2;
}

.button-layout {
  grid-column: 3/4;
  height: var(--5base);
}

.nav-border {
  position: relative;
}

.nav-border::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: grey;
  transition: all 0.5s ease;
  opacity: 0;
}

.nav-active.nav-border::after {
  opacity: 1;
}
</style>
