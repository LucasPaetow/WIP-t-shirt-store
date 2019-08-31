<template>
  <nav
    class="navbar"
    id="nav"
    v-if="$route.name !== 'login' && $route.name !== 'signup'"
  >
    <navbar-basic
      v-if="
        $route.name === 'start' ||
          $route.name === 'legal' ||
          $route.name === 'about'
      "
    />
    <navbar-full v-else />
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import navbarBasic from "@/components/navigation/NavbarBasic.vue";
import navbarFull from "@/components/navigation/NavbarFull.vue";

export default {
  components: { navbarFull, navbarBasic },
  name: "navBar"
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
}
</style>
