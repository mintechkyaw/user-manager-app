<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoleStore, useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import router from '../../../router';
import { useForm } from 'laravel-precognition-vue';
const roleStore = useRoleStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore)
const { roles } = storeToRefs(roleStore)
const props = defineProps({
    id: String
})

const edit = ref(false)

const form = useForm('put', 'api/users/' + props.id, {
    name: '',
    email: '',
    role: ''
})

onMounted(async () => {
    await userStore.fetchUser(props.id);
    await roleStore.fetchRoles({ page: '', itemsPerPage: -1 });
})

watch(user, (userData) => {
    form.name = userData.name
    form.email = userData.email,
        form.role = userData.role
})
</script>

<template>
    <div tabindex="-1"
        class="flex backdrop-blur-sm  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ edit ? 'Edit User' : 'User Details' }}
                    </h3>
                    <button type="button" @click="router.replace({ name: 'users' })"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" :disabled="!edit" v-model="form.name"
                                @change="form.validate('name')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Name" required="">
                            <p v-if="form.invalid('name')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.name }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="email" id="email" :disabled="!edit" v-model="form.email"
                                @change="form.validate('email')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Email" required="">
                            <p v-if="form.invalid('email')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.email }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

                            <select v-if="userStore.authUser.role === 'admin'" :disabled="!edit" id="role"
                                v-model="form.role" @change="form.validate('role')"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 capitalize dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option v-for="role in roles" :key="role.id" :value="role.name" class="capitalize">{{
                                    role.name }}</option>
                            </select>
                            <input v-else type="text" name="role" id="role" disabled v-model="form.role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Role" required="">
                            <p v-if="form.invalid('role')" class="mt-2 text-sm text-red-600 dark:text-red-500"> {{
                                form.errors.role }}</p>
                        </div>
                    </div>
                    <button v-if="edit" type="button" :disabled="form.hasErrors"
                        @click="userStore.updateUser(user.id, form)"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Update User
                    </button>
                    <button v-else type="button" @click="edit = !edit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit User
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