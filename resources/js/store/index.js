import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import router from "../router";

// this is user store
export const useUserStore = defineStore('user', () => {

    const authUser = ref([])

    const loading = ref(false);
    const msg = ref(null);
    const error = ref(null)

    const user = ref([])
    const users = ref([])


    const authUserInfo = async () => {
        try {
            const response = await axios.get('/api/user');
            authUser.value = response.data
        } catch (err) {
            error.value = err
            console.error(err);
        }
    }

    const UpdateAuthUserInfo = async (form) => {
        try {
            const response = await axios.post('/api/update-profile',form);
            authUser.value = response.data.user
            msg.value = response.data.message
        } catch (err) {
            error.value = err.response.data
            console.info(error.value)
        }
    }

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get('api/users/' + userId)
            user.value = response.data.data
            return response.data.data
        } catch (err) {
            error.value = err
        } finally {
            console.info('user fetched successfully')
        }
    }

    const fetchUsers = async () => {
        loading.value = true
        try {
            const response = await axios.get('api/users')
            users.value = response.data.data
        } catch (err) {
            error.value = err.response.data
        } finally {
            loading.value = false;
        }
    }



    const createUser = async (form) => {
        try {
            const response = await axios.post('api/users', form)
            msg.value = response.data.message
        } catch (err) {
            // error.value = err.response.data
            msg.value = err.response.data.msg
        } finally {
            console.log('user created successfully.')
            router.push({ name: 'users' })
        }
    }

    const updateUser = async (userId, form) => {
        try {
            const response = await axios.put('api/users/' + userId, form)
            msg.value = response.data.message;
        } catch (err) {
            // error.value = err.response.data
            msg.value = err.response.data.msg
        } finally {
            fetchUsers();
            console.info('User updated successfully')
            router.push({ name: 'users' })
        }
    }

    const deleteUser = async (userId) => {
        if (window.confirm("Are You Sure You want to Delete This User")) {
            try {
                const response = await axios.delete('api/users/' + userId)
                console.log(response.data.message);
            } catch (err) {
                msg.value = err.response.data.msg
                // error.value = err.response.data
            }
        }

    }

    onMounted(() => {
        authUserInfo();
    })

    return { authUser, msg, loading, error, user, users, authUserInfo, UpdateAuthUserInfo, fetchUsers, fetchUser, createUser, updateUser, deleteUser }
});

// this is post store
export const usePostStore = defineStore('post', () => {
    const msg = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const posts = ref([]);

    const post = ref([])

    const fetchPost = async (postId) => {
        try {
            const response = await axios.get('api/posts/' + postId);
            post.value = response.data.data
        } catch (err) {
            console.error(err.response.data.error)
        }
    }

    const fetchPosts = async () => {
        try {
            loading.value = true;
            const response = await axios.get('api/posts')
            posts.value = response.data.data
        } catch (err) {
            error.value = err.response.data
        } finally {
            loading.value = false;
        }
    }

    const createPost = async (form) => {
        try {
            const response = await axios.post('api/posts', form);
            msg.value = response.data.msg
            router.replace({ name: 'posts' })
            console.info('Post Uploaded')
        } catch (err) {
            // error.value = err.response.data
            msg.value = err.response.data.msg
        } finally {
            form.reset();
        }
    }

    const updatePost = async (postId, form) => {
        try {
            const response = await axios.put('api/posts/' + postId, form)
            msg.value = response.data.msg;
            console.log(response.data.msg);
        } catch (err) {
            // error.value = err.response.data
            msg.value = err.response.data.msg
        } finally {
            console.info('Post updated successfully')
            router.push({ name: 'posts' })
        }
    }

    const deletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await axios.delete('api/posts/' + postId);
                msg.value = response.data.msg
            } catch (err) {
                // error.value = err.response.data
                msg.value = err.response.data.msg
            }
        }
    }

    return { msg, error, loading, posts, post, fetchPost, fetchPosts, createPost, updatePost, deletePost }
});


// this is role store
export const useRoleStore = defineStore('role', () => {
    const msg = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const role = ref([])
    const roles = ref([]);

    const fetchRole = async (roleId) => {
        try {
            const response = await axios.get('api/admin/roles/' + roleId);
            role.value = response.data.data
        } catch (err) {
            console.error(err)
        }
    }

    const fetchRoles = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/admin/roles')
            roles.value = response.data.data
        } catch (err) {
            error.value = err.response.data;
            console.error(err.response.data.error);
        } finally {
            loading.value = false
        }
    }

    const createRole = async (form) => {
        try {
            const response = await axios.post('api/admin/roles', form)
            msg.value = response.data.message
        } catch (err) {
            console.error(err)
        } finally {
            console.log('Role created successfully.')
            router.push({ name: 'roles' })
        }
    }

    const updateRole = async (postId, form) => {
        try {
            const response = await axios.put('api/admin/roles/' + postId, form)
            msg.value = response.data.msg;
            console.log(response.data.msg);
        } catch (err) {
            error.value = err
        } finally {
            console.info('Role updated successfully')
            router.push({ name: 'roles' })
        }
    }

    const deleteRole = async (roleId) => {
        if (window.confirm("Are You Sure You want to Delete This Role")) {
            try {
                const response = await axios.delete('api/admin/roles/' + roleId)
                msg.value = response.data.message
                console.log(response.data.message);
            } catch (err) {
                msg.value = err.response.data.msg
                console.error(err.response.data.msg);
            } finally {
                fetchRoles();
            }
        }

    }

    return { role, roles, error, loading, fetchRole, fetchRoles, createRole, updateRole, deleteRole }
})

export const usePermissionStore = defineStore('permission', () => {
    const permissions = ref([]);
    const error = ref(null);
    const loading = ref(false);
    const fetchPermissions = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/admin/permissions')
            permissions.value = response.data.data
        } catch (err) {
            error.value = err.response.data.error;
            console.error(err.response.data.error);
        } finally {
            loading.value = false
        }
    }

    return { permissions, error, loading, fetchPermissions }
})