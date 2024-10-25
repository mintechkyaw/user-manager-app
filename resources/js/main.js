import './utils/bootstrap';
import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia'
import 'flowbite'

import App from './App.vue';
const pinia = createPinia();
const app = createApp(App);

import AdminLayout from './Layouts/AdminLayout.vue';
import GuestLayout from './Layouts/GuestLayout.vue';
import AppLayout from './Layouts/AppLayout.vue';


app.component('GuestLayout', GuestLayout)
    .component('AppLayout', AppLayout)
    .component('AdminLayout', AdminLayout)

app.use(pinia);
app.use(router);
app.mount('#app');
