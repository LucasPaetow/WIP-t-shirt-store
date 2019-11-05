<template>
  <pageTransition propTransitionName="navigation">
    <nav class="navbar" id="nav" v-if="hideNavbar">
      <pageTransition propTransitionName="navigation">
        <navbar-basic key="basic-navbar" v-if="showBasicNavbar" />
        <navbar-minimal
          key="full-navbar"
          v-else-if="!showBasicNavbar && showMinimalNavbar"
        />
        <navbar-full key="full-navbar" v-else />
      </pageTransition>
    </nav>
  </pageTransition>
</template>

<script>
import { mapGetters } from "vuex";
import navbarBasic from "@/components/navigation/NavbarBasic.vue";
import navbarFull from "@/components/navigation/NavbarFull.vue";
import navbarMinimal from "@/components/navigation/NavbarMinimal.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: { navbarFull, navbarBasic, pageTransition, navbarMinimal },
  name: "navBar",
  computed: {
    ...mapGetters({}),
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
    },
    showMinimalNavbar() {
      let name = this.$route.path.split("/");
      if (name[1] === "checkout") {
        return true;
      }
      return false;
    }
  },
  mounted() {}
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
  padding: 0 var(--column-spacing);
}
</style>
