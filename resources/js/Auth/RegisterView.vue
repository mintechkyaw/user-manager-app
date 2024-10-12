<template>
    <GuestLayout>
        <form class="max-w-sm mx-auto mt-32" @submit.prevent>
            <div class="font-black text-gray-900 text-4xl dark:text-white text-center mb-10">
                Register Form
            </div>
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="name" id="name" v-model="form.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
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
            </div>
            <div class="mb-5">
                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password</label>
                <input type="password" id="confirm_password" v-model="form.password_confirmation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div class="mb-5 flex justify-between items-center">
                <button type="submit" @click="register"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>

                <a href="/login" class="text-gray-900 dark:text-white hover:underline">Already Have An Account</a>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>

import axios from 'axios';
import router from '../routes';
import GuestLayout from '../Layouts/GuestLayout.vue';

const form = {
    name: '',
    email: '',
    password: '',
    pasword_confirmation: ''
}

const register = async () => {
    try {
        const response = await axios.post('api/register', form);
        localStorage.setItem('token', response.data.token);
        router.go('/home');
    } catch (error) {
        console.log(error);
    }
};

</script>