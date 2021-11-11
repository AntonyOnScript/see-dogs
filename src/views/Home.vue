<template>
  <div>
    <h1>{{ title }}</h1>
    <hr>
    <div class="dogs-container">
      <image-container :images="images"></image-container>
    </div>
  </div>
</template>

<script>
import ImageContainer from "../components/ImageContainer.vue"

export default {
  components: {
    "image-container": ImageContainer
  },
  data() {
    return {
      title: "Home",
      images: []
    }
  },
  methods: {
    randomDogs(quantity) {
      this.$http.get("https://dog.ceo/api/breeds/image/random/"+quantity)
      .then(response => {
        this.images = response.body.message
      })
    }
  },
  created() {
    this.randomDogs(10)
  }
}
</script>