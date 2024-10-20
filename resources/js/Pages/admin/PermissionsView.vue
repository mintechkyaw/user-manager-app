<template>
    <AdminLayout>
        <div class="flex justify-between items-center mb-3 mx-0.5">
            <div class="text-2xl font-semibold">Permissions</div>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Create Permission
            </button>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Permission name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Guard Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created_at
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="permission in permissions" :key="permission.id"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ permission.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ permission.guard_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ permission.created_at }}
                        </td>
                        <td class="px-6 py-4 space-x-1.5">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import { usePermissionStore } from '../../store';
import { onMounted } from 'vue';
const store = usePermissionStore();
const { permissions, error, loading } = storeToRefs(store);
onMounted(() => {
    store.getPermissions();
})

</script>