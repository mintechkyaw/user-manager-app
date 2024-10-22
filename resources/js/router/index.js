import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, roleCheck } from '../utils/auth';
const router = createRouter({
    linkActiveClass: 'text-blue-700',
    linkExactActiveClass: 'text-blue-700',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../Pages/HomeView.vue'),
        },
        {
            path: '/admin',
            meta: { requiresAuth: true, requiresAdmin:true},
            children: [
                { path: 'dashboard', name: 'dashboard', component: () => import('../Pages/admin/DashboardView.vue') },
                { path: 'posts', name: 'posts', component: () => import('../Pages/admin/PostsView.vue') },
                { path: 'users', name: 'users', component: () => import('../Pages/admin/UsersList.vue') },
                { path: 'roles', name: 'roles', component: () => import('../Pages/admin/RolesView.vue') },
                { path: 'permissions', name: 'permissions', component: () => import('../Pages/admin/PermissionsView.vue') }

            ],
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../Pages/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../Auth/LoginView.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../Auth/RegisterView.vue'),
            meta: { requiresAuth: false }
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    switch (to.meta.requiresAdmin) {
        case true:
            const role = await roleCheck();
            if (role !== 'user') {
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
