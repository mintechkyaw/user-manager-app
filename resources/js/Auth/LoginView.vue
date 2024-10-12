<template>

    <GuestLayout>
        <form class="max-w-sm mx-auto mt-32" @submit.prevent>
            <div class="font-black text-gray-900 text-4xl dark:text-white text-center mb-10">
                Login Form
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                <input type="email" id="email" v-model="form.email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                <input type="password" id="password" v-model="form.password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {{ error }}</p>
            </div>
            <div class="mb-5 flex justify-between items-center">
                <button type="submit" @click="login"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                <a href="/register" class="text-gray-900 dark:text-white hover:underline">Create New Account</a>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
import { ref } from 'vue';
import GuestLayout from '../Layouts/GuestLayout.vue';
import router from '../routes';
const error = ref(null);
const form = {
    email: 'minthantk642@gmail.com',
    password: 'asdf1234..'
}

const login = async () => {
    try {
        const response = await axios.post('api/login', form); 
        localStorage.setItem('token', response.data.token);
        router.go('/home'); 
    } catch (err) {
        if (err) {
            console.error(err.response.data.error);
            error.value = err.response.data.message
        } else {
            console.error('An unknown error occurred');
        }
    }
};

</script>
