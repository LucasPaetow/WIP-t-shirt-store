<template>
  <pageTransition propTransitionName="navigation">
    <nav class="navbar" id="nav" v-if="hideNavbar">
      <pageTransition propTransitionName="navigation">
        <navbar-basic key="basic-navbar" v-if="showBasicNavbar" />
        <navbar-full key="full-navbar" v-else />
      </pageTransition>
    </nav>
  </pageTransition>
</template>

<script>
import { mapGetters } from "vuex";
import navbarBasic from "@/components/navigation/NavbarBasic.vue";
import navbarFull from "@/components/navigation/NavbarFull.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: { navbarFull, navbarBasic, pageTransition },
  name: "navBar",
  computed: {
    hideNavbar() {
      let routes = ["login", "signup", "sizeOptions"];

      if (routes.includes(this.$route.name)) {
        return false;
      }
      return true;
    },
    showBasicNavbar() {
      let routes = ["home", "legal", "about"];

      if (routes.includes(this.$route.name)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  height: var(--navbar__height);
  background-color: white;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  width: 100vw;
}
</style>
