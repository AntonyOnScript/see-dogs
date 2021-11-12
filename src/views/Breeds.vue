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
      } else {
        this.preSearch = ''
        this.dogsCategory()
      }
    },
    dogsByBreed(breed) {
      this.images = []
      this.$http.get("https://dog.ceo/api/breed/"+breed+"/images")
      .then(response => {
        for(let i = 0; i <= 10; i++) {
          if(i === 10) break;
          console.log("DEBUG: "+ response.body.message[i])
          this.images.push(response.body.message[i])
        }
      })
    },
    dogsCategory() {
      this.images = []
      for(let i = 0; i <= 10; i++) {
        if(i === 10) break;
        let breed = this.breeds[i]
        this.$http.get("https://dog.ceo/api/breed/"+breed+"/images")
        .then(response => {
          let categoryImage = response.body.message[0]
          this.images.push(categoryImage)
        })
      }
      console.log(this.images)
    }
  },
  created() {
    this.$http.get("https://dog.ceo/api/breeds/list/all")
    .then(response => {
      this.breeds = Object.keys(response.body.message)
      this.dogsCategory()
    })
  }
}
</script>