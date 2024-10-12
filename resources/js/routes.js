import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './Auth/LoginView.vue';
import RegisterView from './Auth/RegisterView.vue';
import axios from 'axios';
import AdminDashboard from './Pages/AdminDashboard.vue';
import HomeView from './Pages/HomeView.vue';
import ProfileView from './Pages/ProfileView.vue';

const router = createRouter({
    linkActiveClass: 'text-blue-700',
    linkExactActiveClass: 'text-blue-700',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            async beforeEnter(to, from, next) {
                const auth = await isAuthenticated();
                if (auth) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: AdminDashboard,
            async beforeEnter(to, from, next) {
                // const admin = await isAdmin();
                const auth = await isAuthenticated();
                if (auth) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            async beforeEnter(to, from, next) {
                const auth = await isAuthenticated();
                if (auth) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            async beforeEnter(to, from, next) {
                const auth = await isAuthenticated();
                if (!auth) {
                    next()
                } else {
                    next('/home')
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            async beforeEnter(to, from, next) {
                const auth = await isAuthenticated();
                if (!auth) {
                    next()
                } else {
                    next('/home')
                }
            }
        },

    ]
})

const isAuthenticated = async () => {
    try {
        const response = await axios.get('api/user');
        return response.data.user !== null;
    } catch (error) {
        console.error(error.response.data.message);
        return false;
    }
};

// const isAdmin = async () => {
//     try {
//         const response = await axios.get('api/user');
//         console.log(response.data.user)
//     } catch (err) {
//         console.info(err)
//     }
// }



export default router;
