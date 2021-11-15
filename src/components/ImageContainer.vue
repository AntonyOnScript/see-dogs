<template>
    <ul>
        <li v-for="image of images" :key="image">
          <img :src="image" alt="">
          <button @click="consol(images)"></button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        images: {
            required: true
        }
    },
    methods: {
        consol(image) {
            console.log(image)
        }
    }
}
</script>