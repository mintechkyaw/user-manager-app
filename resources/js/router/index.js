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
            path: '/',
            meta: { requiresAuth: true, requiresNonNormalUser: true },
            children: [
                { path: 'dashboard', name: 'dashboard', component: () => import('../Pages/admin/DashboardView.vue') },
                {
                    path: 'posts', name: 'posts', component: () => import('../Pages/admin/posts/PostsView.vue'),
                    children: [
                        {
                            path: 'create',
                            name: 'postcreate',
                            component: () => import('../Pages/admin/posts/PostCreate.vue')
                        },
                        {
                            path: ':id/edit',
                            name: 'postedit',
                            component: () => import('../Pages/admin/posts/PostEdit.vue'),
                            props: true
                        }
                    ]
                },
                {
                    path: 'users', name: 'users', component: () => import('../Pages/admin/users/UsersView.vue'),
                    children: [
                        {
                            path: 'create',
                            name: 'usercreate',
                            component: () => import('../Pages/admin/users/UserCreate.vue')
                        },
                        {
                            path: ':id/edit',
                            name: 'useredit',
                            component: () => import('../Pages/admin/users/UserEdit.vue'),
                            props: true
                        }
                    ]
                },
                {
                    path: 'roles', name: 'roles', component: () => import('../Pages/admin/roles/RolesView.vue'),
                    children: [
                        {
                            path: 'create',
                            name: 'rolecreate',
                            component: () => import('../Pages/admin/roles/RoleCreate.vue')
                        },
                        {
                            path: ':id/edit',
                            name: 'roleedit',
                            component: () => import('../Pages/admin/roles/RoleEdit.vue'),
                            props: true
                        }
                    ]
                },
                { path: 'permissions', name: 'permissions', component: () => import('../Pages/admin/permissions/PermissionsView.vue') }

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
    switch (to.meta.requiresNonNormalUser) {
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
