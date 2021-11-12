<template>
    <ul>
        <li v-for="image of images" :key="image">
          <img :src="image" alt="">
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        images: {
            required: true
        }
    }
}
</script>