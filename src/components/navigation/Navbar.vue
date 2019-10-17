<template>
  <nav class="navbar" id="nav" v-if="hideNavbar">
    <navbar-basic v-if="showBasicNavbar" />
    <navbar-full v-else />
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import navbarBasic from "@/components/navigation/NavbarBasic.vue";
import navbarFull from "@/components/navigation/NavbarFull.vue";

export default {
  components: { navbarFull, navbarBasic },
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
      let routes = ["start", "legal", "about"];

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
  height: var(--7base);
  background-color: white;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  width: 100vw;
  overflow: hidden;
}
</style>
