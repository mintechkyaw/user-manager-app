import axios from "axios";
import { useForm } from "laravel-precognition-vue";
import { defineStore } from "pinia";
import { ref } from "vue";

// this is user store
export const useUserStore = defineStore('user', () => {
    const name = ref('')
    const email = ref('')
    const role = ref('')

    const msg = ref(null);
    const loading = ref(false);
    const error = ref(null)

    const users = ref([])

    const fetchUsers = async () => {
        loading.value = true
        try {
            const response = await axios.get('api/users')
            users.value = response.data.data
        } catch (error) {
            error.value = error
        } finally {
            loading.value = false;
        }
    }
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete('api/users/' + userId)
            msg.value = response.data.message
            console.log(response.data.message);
            fetchUsers();
        } catch (err) {
            console.error(err.response.data.message);
        }
    }


    const getUserInfo = async () => {
        try {
            const response = await axios.get('/api/user');
            name.value = response.data.name
            email.value = response.data.email
            role.value = response.data.role
        } catch (err) {
            error.value = err
            console.error(err);
        }
    }

    return { name, email, role, msg, loading, error,users, getUserInfo, fetchUsers, deleteUser }
});

// this is post store
export const usePostStore = defineStore('post', () => {
    const form = useForm('post', 'api/posts', {
        title: '',
        content: '',
    })
    const success = ref(null);
    const msg = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const posts = ref([]);

    const getPosts = async () => {
        loading.value = true;
        try {
            loading.value = true
            const response = await axios.get('api/posts')
            posts.value = response.data.data
        } catch (err) {
            msg.value = err.response.data
            error.value = err
        } finally {
            loading.value = false;
        }
    }

    const uploadPost = async (form) => {
        try {
            const response = await axios.post('api/posts', form);
            success.value = response.data.msg
        } catch (err) {
            error.value = err
        } finally {
            console.info('Post Uploaded')
            form.reset();
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete('api/posts/' + postId);
            console.info(response.data.msg)
        } catch (err) {
            error.value = err
        } finally {
            console.log('final');
            getPosts();
        }
    }
    return { form, success, msg, error, loading, posts, getPosts, uploadPost, deletePost }
});



export const useRoleStore = defineStore('role', () => {
    const roles = ref(null | []);
    const error = ref(null);
    const loading = ref(false);
    const getRoles = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/admin/roles')
            roles.value = response.data.data
        } catch (err) {
            error.value = err.response.data.error;
            console.error(err.response.data.error);
        } finally {
            loading.value = false
        }
    }

    return { roles, error, loading, getRoles }
})

export const usePermissionStore = defineStore('permission', () => {
    const permissions = ref([]);
    const error = ref(null);
    const loading = ref(false);
    const getPermissions = async () => {
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

    return { permissions, error, loading, getPermissions }
})