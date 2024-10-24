<script setup lang="ts">
import AppLayout from '../Layouts/AppLayout.vue';
import router from '../router';
import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { logout } from '../utils/auth';


const auth = useUserStore()
const { authUser } = storeToRefs(auth)

</script>

<template>
    <AppLayout>
        <div class="mx-36 mt-5">
            <div class="px-4 sm:px-0">
                <h3 class="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ authUser.name }}</dd>
                    </div>

                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ authUser.email }}
                        </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-if="authUser.role !== 'user'">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Role</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ authUser.role }}</dd>
                    </div>
                </dl>
                <div class="mt-5 flex justify-end items-center">
                    <button type="submit" @click="logout"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
