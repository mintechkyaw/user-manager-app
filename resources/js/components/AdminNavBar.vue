<script setup>
import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { logout } from '../utils/auth';
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <v-app-bar title="User Manager App">
        <template #append>
            <!-- <v-btn class="ms-1 opacity-60" icon="mdi-bell-outline" /> -->

            <v-btn class="ms-1" icon>
                <v-avatar image="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                <v-menu activator="parent" origin="top">
                    <v-list>
                        <v-list-item link title="Home" :to="{ name: 'home' }" />
                        <v-list-item link title="Dashboard" :to="{ name: 'dashboard' }" />
                        <v-list-item link title="Profile" :to="{ name: 'profile' }" />
                        <v-list-item title="Sign out" @click="logout" />
                    </v-list>
                </v-menu>
            </v-btn>
        </template>
    </v-app-bar>

</template>

