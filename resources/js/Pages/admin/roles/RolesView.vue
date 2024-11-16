<template>
    <AdminLayout>
        <RouterView />
        <v-card>
            <v-card-title class="d-flex justify-between align-center">
                Roles
                <v-spacer></v-spacer>
                <Button :to="{ name: 'rolecreate' }">
                    Create Role
                </Button>
            </v-card-title>
            <v-data-table-server :headers="headers" :loading="loading" :items="roles.data"
                :itemsLength="roles.meta?.total ?? 0" @update:options="store.fetchRoles">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>
                            <v-chip color="primary m-0.5" v-for="permission in item.permissions">
                                {{ permission }}
                            </v-chip>
                        </td>                        
                        <td class="space-x-3">
                            <RouterLink :to="{ name: 'roleedit', params: { id: item.id } }"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <v-icon>mdi-pencil</v-icon>
                            </RouterLink>
                            <button @click="store.deleteRole(item.id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline"><v-icon>
                                    mdi-delete</v-icon></button>
                        </td>
                        
                    </tr>
                </template>
            </v-data-table-server>
        </v-card>
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

<script setup>
import { useRoleStore } from '../../../store';
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView } from 'vue-router';
import Button from '../../../components/Button.vue';
import { onUpdated } from 'vue';
const store = useRoleStore();
const { roles, error, msg, loading } = storeToRefs(store)

const headers = [
    { title: 'name', value: 'name' },
    { title: 'permissions', value: 'permissions' },
    // { title: 'created_at', value: 'created_at' },
    { title: 'action' }
]

onUpdated(() => {
    store.fetchRoles()
})
</script>