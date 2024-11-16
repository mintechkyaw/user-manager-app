<script setup>
import { useForm } from 'laravel-precognition-vue';
import { useRoleStore, usePermissionStore } from '../../../store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Button from '../../../components/Button.vue';
const permission = usePermissionStore();
const store = useRoleStore();
const { permissions } = storeToRefs(permission);
const form = useForm('post', 'api/admin/roles', {
    name: '',
    permissions: []
})

onMounted(() => {
    permission.fetchPermissions();
})
</script>

<template>
    <div tabindex="-1"
        class="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Role
                    </h3>
                    <RouterLink :to="{ name: 'roles' }"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </RouterLink>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <v-text-field label="Role" clearable v-model="form.name" @change="form.validate('name')"
                                :rules="[form.errors.name]" required />
                        </div>
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Permissions</label>
                            <div class="grid grid-cols-2 gap-4">
                                <div v-for="permission in permissions" :key="permission.id" class="flex items-center">
                                    <input :id="permission.id" type="checkbox" v-model="form.permissions"
                                        :value="permission.name" @change="form.validate('permissions')"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label :for="permission.id"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {{ permission.name }}
                                    </label>
                                </div>
                            </div>
                            <p v-if="form.invalid('permissions')" class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ form.errors.permissions }}
                            </p>
                        </div>

                    </div>
                    <Button type="button" :disabled="form.hasErrors" @click="store.createRole(form)">
                        Create Role
                    </Button>
                </form>
            </div>
        </div>
    </div>
</template>