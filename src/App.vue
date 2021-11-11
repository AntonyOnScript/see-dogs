<template>
  <div class="app">
    <div class="nav">
      <views-menu :links="links" />
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from "./router/routes"
import Menu from "./components/Menu.vue"

export default {
  components: {
    "views-menu": Menu
  },
  data() {
    return {
      links: routes
    }
  }
}
</script>

<style>
</style>
