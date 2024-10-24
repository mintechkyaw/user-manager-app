<script setup>
import { useForm } from 'laravel-precognition-vue';
import { useRoleStore, useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = useUserStore();
const role = useRoleStore();
const { roles } = storeToRefs(role);
const form = useForm('post', 'api/users/', {
    name: '',
    email: '',
    role: '',
    password: ''
})

onMounted(() => {
    role.fetchRoles();
})
</script>

<template>
    <div tabindex="-1"
        class="flex  backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Create New User
                    </h3>
                    <RouterLink type="button" :to="{ name: 'users' }"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </RouterLink>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                name</label>
                            <input type="name" id="name" v-model="form.name" @change="form.validate('name')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                            <p v-if="form.invalid('name')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.name }}</p>
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                email</label>
                            <input type="email" id="email" v-model="form.email" @change="form.validate('email')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                            <p v-if="form.invalid('email')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.email }}</p>
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                password</label>
                            <input type="password" id="password" v-model="form.password"
                                @change="form.validate('password')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                            <p v-if="form.invalid('password')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.password }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

                            <select id="role" v-model="form.role" @change="form.validate('role')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 capitalize dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option v-for="role in roles" :key="role.id" :value="role.name" class="capitalize">{{
                                    role.name }}</option>
                            </select>
                            <p v-if="form.invalid('role')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.role }}</p>
                        </div>
                        <div class="mb-5 flex justify-between items-center">
                            <button type="button" :disabled="form.hasErrors" @click="store.createUser(form)"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                                User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
