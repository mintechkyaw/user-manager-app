import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const name = ref('')
    const email = ref('')
    const role = ref('')

    const getUserInfo = async () => {
        try {
            const response = await axios.get('/api/user');
            name.value = response.data.name
            email.value = response.data.email
            role.value = response.data.roles[0].name
        } catch (error) {
            console.error(error);
        }
    }

    return { name, email, role, getUserInfo }
})
