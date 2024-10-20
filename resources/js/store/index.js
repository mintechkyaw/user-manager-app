import axios from "axios";
import { defineStore } from "pinia";
import {  onBeforeMount, onMounted, onRenderTracked, onUpdated, ref } from "vue";

// this is user store
export const useUserStore = defineStore('user', () => {
    const error = ref(null)
    const name = ref('')
    const email = ref('')
    const role = ref('')

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

    return {error, name, email, role, getUserInfo }
});

// this is post store
export const usePostStore = defineStore('post', () => {
    const error = ref(null);
    const loading = ref(false);
    const posts = ref({});

    const getPosts = async () => {
        loading.value = true;
        try {
            const response = await axios.get('api/posts');
            posts.value = response.data.data
        } catch(err) {
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return {error, loading, posts, getPosts}
});


export const useRoleStore = defineStore('role', () => {
    const roles = ref([]);
    const error = ref(null);
    const loading = ref(false);
    const getRoles = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/admin/roles')
            roles.value = response.data.data
        } catch (err) {
            console.error(err);
        } finally {
            loading.value = false
        }
    }

    return {roles,error,loading,getRoles}
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
            console.error(err);
        } finally {
            loading.value = false
        }
    }

    return {permissions,error,loading,getPermissions}
})