import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, roleCheck, RoleBasedRedirect } from '../utils/auth';
import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';
const router = createRouter({
    linkActiveClass: 'text-blue-700',
    linkExactActiveClass: 'text-blue-700',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../Pages/HomeView.vue'),
            children: [
                {
                    path: 'posts/:id',
                    name: 'postview',
                    component: () => import('../Pages/PostView.vue'),
                    props: true,
                }]
        },
        {
            path: '/',
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    meta: { requiresNonNormalUser: true },
                    component: () => import('../Pages/admin/DashboardView.vue')
                },
                {
                    path: 'posts', name: 'posts', component: () => import('../Pages/admin/posts/PostsView.vue'),
                    meta: { requiresNonNormalUser: true },
                    beforeEnter: async (to, from) => {
                        const store = useUserStore();
                        await store.authUserInfo();
                        const { authUser } = storeToRefs(store)
                        if (authUser.value.permissions.includes('read-post')) {
                            return true;
                        }
                        RoleBasedRedirect();
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'postcreate',
                            component: () => import('../Pages/admin/posts/PostCreate.vue'),
                            beforeEnter: async (to, from) => {
                                const store = useUserStore();
                                await store.authUserInfo();
                                const { authUser } = storeToRefs(store)
                                return authUser.value.permissions.includes('create-post')
                            },
                        },
                        {
                            path: ':id',
                            name: 'postedit',
                            component: () => import('../Pages/admin/posts/PostEdit.vue'),
                            props: true,
                        }
                    ]
                },
                {
                    path: 'users', name: 'users', component: () => import('../Pages/admin/users/UsersView.vue'),
                    meta: { requiresNonNormalUser: true },
                    beforeEnter: async (to, from) => {
                        const store = useUserStore();
                        await store.authUserInfo();
                        const { authUser } = storeToRefs(store)
                        if (authUser.value.permissions.includes('read-user')) {
                            return true;
                        }
                        RoleBasedRedirect();
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'usercreate',
                            component: () => import('../Pages/admin/users/UserCreate.vue'),
                            beforeEnter: async (to, from) => {
                                const store = useUserStore();
                                await store.authUserInfo();
                                const { authUser } = storeToRefs(store)
                                return authUser.value.permissions.includes('create-user')
                            },
                        },
                        {
                            path: ':id',
                            name: 'useredit',
                            component: () => import('../Pages/admin/users/UserEdit.vue'),
                            props: true,
                        }
                    ]
                },
                {
                    path: 'roles', name: 'roles', component: () => import('../Pages/admin/roles/RolesView.vue'),
                    meta: { requiresAdmin: true },
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
                { path: 'permissions', name: 'permissions', meta: { requiresAdmin: true }, component: () => import('../Pages/admin/permissions/PermissionsView.vue') }

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
    switch (to.meta.requiresAdmin) {
        case true:
            const role = await roleCheck();
            if (role === 'admin') {
                next()
            }
            else {
                next({ name: 'dashboard' })
            }
            break;
        default:
            next();
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
