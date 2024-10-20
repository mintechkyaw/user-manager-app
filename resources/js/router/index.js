import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../Auth/LoginView.vue';
import RegisterView from '../Auth/RegisterView.vue';
import UsersList from '../Pages/admin/UsersList.vue';
import HomeView from '../Pages/HomeView.vue';
import ProfileView from '../Pages/ProfileView.vue';
import { isAuthenticated, roleCheck } from '../utils/auth';
import DashboardView from '../Pages/admin/DashboardView.vue';
import RolesPermissionView from '../Pages/admin/RolesView.vue';
import PostsView from '../Pages/admin/PostsView.vue';
import PermissionsView from '../Pages/admin/PermissionsView.vue';
const router = createRouter({
    linkActiveClass: 'text-blue-700',
    linkExactActiveClass: 'text-blue-700',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/admin',
            meta: { requiresAuth: true, requiresAdmin:true},
            children: [
                { path: 'dashboard', name: 'dashboard', component: DashboardView },
                { path: 'posts', name: 'posts', component: PostsView },
                { path: 'users', name: 'users', component: UsersList },
                { path: 'roles', name: 'roles', component: RolesPermissionView },
                { path: 'permissions', name: 'permissions', component: PermissionsView }

            ],
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { requiresAuth: false }
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    switch (to.meta.requiresAdmin) {
        case true:
            const role = await roleCheck();
            if (role == 'admin') {
                next()
            }
            else {
                next({ name: 'home' })
            }
            break;
        default:
            next()
            break;
    }

})

router.beforeEach(async (to, from, next) => {
    const isauth = await isAuthenticated();
    switch (to.meta.requiresAuth) {
        case true:
            isauth ? next() : next('/login')
            break;
        case false:
            !isauth ? next() : next('/')
            break
        default:
            next()
            break;
    }
});

export default router;
