<template>
    <ul>
        <li v-for="link of links" :key="link">
            <router-link :to="link">{{ link.name }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        links: {
            required: true,
            type: Array
        }
    }
}
</script>