<script setup>
import AppLayout from '../Layouts/AppLayout.vue';
import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { logout } from '../utils/auth';
import { onMounted, ref, watch } from 'vue';
import { useForm } from 'laravel-precognition-vue';

const edit = ref(false)
const auth = useUserStore()
const { authUser } = storeToRefs(auth)

function cancel() {
    edit.value = false
    auth.authUserInfo();
}


const form = useForm('post', 'api/update-profile', {
    name: '',
    email: ''
})

watch(authUser, (userData) => {
    form.name = userData.name
    form.email = userData.email
})

onMounted(async () => {
    await auth.authUserInfo();
})
</script>

<template>
    <AppLayout>
        <div class="mx-36 mt-5">
            <div class="flex px-4 sm:px-0 justify-between items-center">
                <div>
                    <h3 class="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                </div>
                <button type="submit" @click="edit = !edit" v-if="!edit"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"><svg
                        class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                    </svg>

                </button>
                <button v-else @click="cancel"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <form action="">
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <label class="text-sm font-medium leading-6 text-gray-900">Full name</label>
                            <input class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-0"
                                :disabled="!edit" type="text" v-model="form.name" @change="form.validate('name')">
                        
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <label class="text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border-0"
                                :disabled="!edit" type="text" v-model="form.email" @change="form.validate('email')">
                            <p v-if="form.invalid('email')" class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ form.errors.email }}</p>
                        </div>
                    </form>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-if="authUser.role !== 'user'">
                        <label class="text-sm font-medium leading-6 text-gray-900">Role</label>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ authUser.role }}</div>
                    </div>
                </dl>
                <div class="mt-5 flex justify-end items-center space-x-2">
                    <button type="submit" v-if="edit" :disabled="form.hasErrors" @click="auth.UpdateAuthUserInfo(form)"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update
                        Information</button>
                    <button type="submit" v-else @click="logout"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
