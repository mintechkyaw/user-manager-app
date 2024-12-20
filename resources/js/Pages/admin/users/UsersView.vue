<script setup>

import { onMounted, onUpdated } from 'vue';
import { useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import { RouterView, RouterLink } from 'vue-router';
const store = useUserStore();
const { authUser, users, msg, error, loading } = storeToRefs(store);
onUpdated(() => {
    store.fetchUsers()
})

onMounted(async () => {
    await store.authUserInfo();
    await store.fetchUsers();
})

</script>
<template>
    <AdminLayout>
        <RouterView />
        <div v-if="loading"
            class="flex items-center justify-center w-full   rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else-if="error"
            class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
            role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium"> {{ error.error }}</span> {{ error.msg }}
            </div>
        </div>
        <div v-else>
            <div class="flex justify-between items-center mb-3 mx-0.5">
                <div class="text-xl font-semibold">Users</div>
                <RouterLink :to="{ name: 'usercreate' }" v-if="authUser.permissions?.includes('create-user')"
                    class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                    Create Users
                </RouterLink>
            </div>

            <div v-if="users.length > 0" class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <!-- <th scope="col" class="px-6 py-3">
                            No.
                        </th> -->
                            <th scope="col" class="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Latest Updated At
                            </th>
                            <th v-if="store.authPermissions?.includes('update-user') || store.authPermissions?.includes('delete-user')" scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id"
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <!-- <td class="px-6 py-4">
                            {{ user.id }}
                        </td> -->
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ user.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.role }}
                            </td>
                            <td class="px-6 py-4 " :class="{ 'text-blue-500': user.profile_updated_at }">
                                {{ user.profile_updated_at ?? user.profile_created_at }}
                            </td>
                            <td class="px-6 py-4 space-x-2">
                                <RouterLink v-if="store.authPermissions?.includes('update-user')"  :to="{ name: 'useredit', params: { id: user.id } }"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                </RouterLink>
                                <button v-if="store.authPermissions?.includes('delete-user')" @click="store.deleteUser(user.id)"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Currently there is 0 user...
            </div>
        </div>
    </AdminLayout>
    <div id="toast-bottom-right" v-if="msg"
        class="fixed flex items-center justify-between w-full max-w-sm p-4 space-x-4 text-blue-900 bg-white divide-x divide-gray-200 rounded-lg shadow-lg right-5 bottom-5 dark:text-gray-100 dark:divide-gray-700 dark:bg-gray-800 transition-all duration-300 ease-in-out"
        role="alert">
        <!-- Message section -->
        <div class="ml-4 text-sm font-semibold">
            <span>{{ msg }}</span>
        </div>

        <!-- Close button -->
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 text-gray-500 hover:text-blue-700 rounded-full focus:ring-2 focus:ring-blue-300 p-2 inline-flex items-center justify-center h-8 w-8 bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
            @click="msg = null" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

</template>