<template>
    <GuestLayout>
        <form class="max-w-sm mx-auto mt-32" @submit.prevent>
            <div class="font-black text-gray-900 text-4xl dark:text-white text-center mb-10">
                Register Form
            </div>
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="name" id="name" v-model="form.name" @change="form.validate('name')"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <p v-if="form.invalid('name')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                    form.errors.name }}</p>
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                <input type="email" id="email" v-model="form.email" @change="form.validate('email')"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <p v-if="form.invalid('email')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                    form.errors.email }}</p>
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                <input type="password" id="password" v-model="form.password" @change="form.validate('password')"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <p v-if="form.invalid('password')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                    form.errors.password }}</p>
            </div>
            <div class="mb-5">
                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password</label>
                <input type="password" id="confirm_password" v-model="form.password_confirmation"
                    @change="form.validate('pasword_confirmation')"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <p v-if="form.invalid('password_confirmation')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                    form.errors.password_confirmation }}</p>
            </div>
            <div class="mb-5 flex justify-between items-center">
                <button type="submit" @click="register(form)"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>

                <RouterLink :to="{ name: 'login' }" class="text-gray-900 dark:text-white hover:underline">
                    Already Have An Account</RouterLink>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import GuestLayout from '../Layouts/GuestLayout.vue';
import { register } from '../utils/auth';
import { useForm } from 'laravel-precognition-vue';
const form = useForm('post', 'api/register', {
    name: '',
    email: '',
    password: '',
    pasword_confirmation: ''
})
form.setValidationTimeout(3000);
</script>