<template>
    <div>
        <h1>{{ title.route }}{{ title.title }}</h1>
        <ul>
            <li v-for="link of links" :key="link">
                <router-link :to="link">{{ link.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        links: {
            required: true,
            type: Array
        },
        title: {
            default: ''
        }
    }
}
</script>

<style scoped>
    ul {
        display: flex;
    }

    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
    }

    li {
        list-style: none;
        padding: 0px 10px;
    }

    a {
        color: #41B883;
    }

    h1 {
        color: #34495E;
    }
</style>