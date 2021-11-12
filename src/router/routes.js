import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Breeds from '../views/Breeds.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/breeds',
        name: 'Breeds',
        component: Breeds
    }
]