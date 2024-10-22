<template>
    <AdminLayout>
        <div v-if="error"
            class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
            role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium"> {{ error }}</span> 
            </div>
        </div>
        <div v-else
         class="flex justify-between items-center mb-3 mx-0.5">
            <div class="text-2xl font-semibold">Roles</div>
            <button
                class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Create Roles
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <a href="#" v-for="role in roles" :key="role.id"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ role.name }}</h5>
                <div>

                    <span v-for="permission in role.permissions"
                        class=" inline-block mt-1.5 bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{
                        permission.name }}</span>

                </div>
            </a>
            <a href="" v-show="roles">
                <div class="flex items-center justify-center h-full rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-900 dark:text-gray-500">
                        <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
            </a>
        </div>
    </AdminLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import { useRoleStore } from '../../store';
import { storeToRefs } from 'pinia';
const store = useRoleStore();
const { roles, error, loading } = storeToRefs(store)


onMounted(() => {
    store.getRoles();
})
</script>