<script setup>

import { onMounted,onUpdated,ref } from 'vue';
import { useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import { RouterView, RouterLink } from 'vue-router';
import Button from '../../../components/Button.vue';
const store = useUserStore();
const { authUser, users, msg, loading } = storeToRefs(store);
const search = ref('')
const headers = [
    { title: 'name', value: 'name', sortable: true, },
    { title: 'email', value: 'email' },
    { title: 'role', value: 'role' },
    { title: 'profile_created_at', value: 'profile_created_at' },
    { title: 'action' }
]

onMounted(async () => {
    await store.authUserInfo();
})
</script>

<template>
    <AdminLayout>
        <RouterView />
        <div>
            <v-card>
                <v-card-title class="d-flex justify-between align-center">
                    Users
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" name="search" label="Search User..." id="search"></v-text-field>
                    <v-spacer></v-spacer>
                    <Button :to="{ name: 'usercreate' }" v-if="authUser.permissions?.includes('create-user')">
                        Create Users
                    </Button>
                </v-card-title>
                <v-data-table-server :headers="headers" :items="users.data" :search="search" :items-Length="users.meta?.total ?? 0"
                    :loading="loading" @update:options="store.fetchUsers">
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.role }}</td>
                            <td> {{ item.profile_created_at }}</td>
                            <td class="space-x-3">
                                <RouterLink v-if="store.authPermissions?.includes('update-user')"
                                    :to="{ name: 'useredit', params: { id: item.id } }"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <v-icon>mdi-pencil</v-icon>
                                </RouterLink>
                                <button v-if="store.authPermissions?.includes('delete-user')"
                                    @click="store.deleteUser(item.id)"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline"><v-icon>
                                        mdi-delete</v-icon></button>
                            </td>
                        </tr>
                    </template>
                </v-data-table-server>
            </v-card>
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