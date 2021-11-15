<template>
  <div>
    <h1>{{ title }}{{ breedTitle }}</h1>
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
      title: "Breeds",
      images: [],
      breeds: [],
      filter: '',
      preSearch: '',
      breedTitle: ''
    }
  },
  methods: {
    setPreSearch(value) {
      this.preSearch = value
      if(value === '') {
        this.breedTitle = value
      } else {
        this.breedTitle = ` - ${value}`
      }
    },
    typeSearch($event) {
      let value = $event.target.value
      this.filter = value
      if(this.filter) {
        let regex = new RegExp(this.filter, "i")
        this.breeds.forEach(breed => {
          if(regex.test(breed) && breed.indexOf(this.filter) === 0) {
            this.setPreSearch(breed)
            setTimeout(() => {
              this.dogsByBreed(this.preSearch, 10, 0, false)
            }, 200)
          }
        })
      } else {
        this.setPreSearch('')
        this.dogsCategory()
      }
    },
    dogsByBreed(breed, length = 10, since = 0, update = false) { // it loads photos of one specific breed
      if(!update) this.images = []
      this.$http.get("https://dog.ceo/api/breed/"+breed+"/images")
      .then(response => {
        for(let i = since; i <= length; i++) {
          if(i === length) break;
          if(!response.body.message[i]) break;
          if(this.images.indexOf(response.body.message[i]) !== -1) continue;
          this.images.push(response.body.message[i])
        }
      })
    },
    dogsCategory(length = 10, since = 0, update = false) { // it loads a photo of each breed
      if(!update) this.images = []
      for(let i = since; i <= length; i++) {
        if(i === length) break;
        if(!this.breeds[i]) break;
        let breed = this.breeds[i]
        this.$http.get("https://dog.ceo/api/breed/"+breed+"/images")
        .then(response => {
          let categoryImage = response.body.message[0]
          if(this.images.indexOf(categoryImage) !== -1) return;
          this.images.push(categoryImage)
        })
      }
    }
  },
  created() {
    this.$http.get("https://dog.ceo/api/breeds/list/all") // it defines breeds list and call dogsCategory method, wich loads 10 categories by default
    .then(response => {
      this.breeds = Object.keys(response.body.message)
      this.dogsCategory()
    })
  },
  mounted() {
    window.onscroll = () => {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;

      if (offset >= height) {
        if(!this.preSearch) {
          this.dogsCategory(this.images.length+10, this.images.length, true)
        } else {
          this.dogsByBreed(this.preSearch, this.images.length+10, this.images.length, true)
        }
      }
    }
  }
}
</script>