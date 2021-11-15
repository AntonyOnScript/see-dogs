<template>
    <ul>
        <transition-group name="showing">
            <li v-for="image of images" :key="image" v-show="isLoaded">
              <img :src="image" alt="">
            </li>
        </transition-group>
    </ul>
</template>

<script>
export default {
    props: {
        images: {
            required: true
        }
    },
    data() {
        return {
            isLoaded: false
        }
    },
    beforeMount() {
        this.isLoaded = true
    }
}
</script>

<style scoped>

    .showing-enter-active {
        animation: showing 1.5s;
    }


    @keyframes showing {
        from { margin-top: 20px; opacity: 0; }
        to { margin-top: 0px; opacity: 1; }
    }

    ul {
        max-width: 100%;
        padding: 0px;
    }

    ul span {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        max-width: 100%;
    }

    li {
        display: flex;
        flex-direction: column;
        padding: 30px;
        max-width: 100%;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.100);
    }

    li img {
        width: 300px;
        height: 300px;
    }
    
</style>