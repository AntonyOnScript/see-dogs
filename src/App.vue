<template>
  <div class="app">
    <div class="nav">
      <views-menu :links="links" :title="currentRouteName" />
    </div>
    <router-view @theBreed="setBreedAtTitle($event)" />
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
      links: routes,
      title: ''
    }
  },
  computed: {
    currentRouteName() {
      return {
        route: this.$route.name,
        title: this.title
      }
    }
  },
  methods: {
    setBreedAtTitle(breed) {
      this.title = breed
    }
  },
  watch:{
    $route (){
      this.title = ''
    }
  } 
}
</script>

<style>
</style>
