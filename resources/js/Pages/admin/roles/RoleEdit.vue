<script setup>
import { useForm } from 'laravel-precognition-vue';
import { useRoleStore, usePermissionStore } from '../../../store';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const permissionStore = usePermissionStore();
const roleStore = useRoleStore();
const edit = ref(false);
const { role } = storeToRefs(roleStore);
const { permissions } = storeToRefs(permissionStore);

const props = defineProps({
    id: String
});

const form = useForm('put', 'api/admin/roles/' + props.id, {
    name: '',
    permissions: []
});

onMounted(async () => {
    await roleStore.fetchRole(props.id);
    await permissionStore.fetchPermissions();
});

watch(role, (roleData) => {
    form.name = roleData.name;
    form.permissions = roleData.permissions.map(permission => permission.name);
});
</script>

<template>
    <div tabindex="-1"
        class="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <!-- <pre>
                        {{ form }}
                    </pre> -->
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ edit ? 'Edit Role' : 'Role Details' }}
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
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <input type="text" name="name" id="name" v-model="form.name" :disabled="!edit"
                                @change="form.validate('name')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required>
                            <p v-if="form.invalid('name')" class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ form.errors.name }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="permissions"
                                class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Permissions</label>
                            <div class="grid grid-cols-2 gap-4">
                                <div v-for="permission in permissions" :key="permission.id" class="flex items-center">
                                    <input :id="permission.id" type="checkbox" :value="permission.name"
                                        v-model="form.permissions" :disabled="!edit"
                                        :checked="form.permissions.some(p => p === permission.name)" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                    <button v-if="edit" type="button" :disabled="form.hasErrors"
                        @click="roleStore.updateRole(role.id, form)"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Update Role
                    </button>
                    <button v-else type="button" @click="edit = !edit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit Role
                    </button>
                    <button v-show="edit" type="button" @click="edit = !edit"
                        class="text-blue-700 inline-flex items-center bg-white border border-blue-700 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ms-2 px-3 py-2.5 text-center dark:bg-white dark:hover:bg-blue-50 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
