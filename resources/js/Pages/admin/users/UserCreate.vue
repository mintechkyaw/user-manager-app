<script setup>
import { useForm } from 'laravel-precognition-vue';
import { useRoleStore, useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import Button from '../../../components/Button.vue';
import { RouterLink } from 'vue-router';
const store = useUserStore();
const role = useRoleStore();
const { roles } = storeToRefs(role);
const form = useForm('post', 'api/users/', {
    name: '',
    email: '',
    role: '',
    password: ''
})
const visible = ref(true)
onMounted(() => {
    role.fetchRoles();
})
</script>

<template>
    <div tabindex="-1"
        class="flex  backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <v-card>
                <v-card-title class="d-flex align-center justify-between">
                    Create User
                    <RouterLink :to="{ name: 'users' }"><v-icon>mdi-window-close</v-icon></RouterLink>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="form.name" :rules="[form.errors.name]"
                        @update:modelValue="form.validate('name')" name="name" label="name" id="name"
                        clearable></v-text-field>
                    <v-text-field v-model="form.email" :rules="[form.errors.email]"
                        @update:modelValue="form.validate('email')" name="email" label="email" id="email"
                        clearable></v-text-field>
                    <v-text-field v-model="form.password" :rules="[form.errors.password]"
                        @update:modelValue="form.validate('password')" name="name" label="Enter your password"
                        id="password" :type="visible ? 'text' : 'password'"
                        :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="visible = !visible"></v-text-field>
                    <v-select :items="roles.map((role) => role.name)" v-model="form.role" label="Select Role"></v-select>
                </v-card-text>

                <v-card-actions class="d-flex justify-end">
                    <v-btn :disabled="form.hasErrors" @click="store.createUser(form)" color="blue" variant="tonal" block>
                        Create
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
