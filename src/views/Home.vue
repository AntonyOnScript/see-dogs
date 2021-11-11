<template>
  <div>
    <h1>{{ title }}</h1>
    <hr>
    <input type="text" @input="typeSearch($event)" placeholder="Search by breed">
    <p v-if="preSearch">Search suggest: {{ preSearch }}</p>
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
      images: [],
      breeds: [],
      filter: '',
      preSearch: ''
    }
  },
  methods: {
    randomDogs(quantity) {
      this.$http.get("https://dog.ceo/api/breeds/image/random/"+quantity)
      .then(response => {
        this.images = response.body.message
      })
    },
    typeSearch($event) {
      let value = $event.target.value
      this.filter = value
      if(this.filter) {
        let regex = new RegExp(this.filter, "i")
        this.breeds.forEach(breed => {
          if(regex.test(breed) && breed.indexOf(this.filter) === 0) {
            this.preSearch = breed
            this.dogsByBreed(this.preSearch)
          }
        })
      }
      console.log(this.preSearch)
    },
    dogsByBreed(breed) {
      this.$http.get("https://dog.ceo/api/breed/"+breed+"/images/random/3")
      .then(response => {
        this.images = response.body.message
      })
    }
  },
  created() {
    this.randomDogs(3)
    this.$http.get("https://dog.ceo/api/breeds/list/all")
    .then(response => {
      this.breeds = Object.keys(response.body.message)
    })
  }
}
</script>