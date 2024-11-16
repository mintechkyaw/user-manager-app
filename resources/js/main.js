import './utils/bootstrap';
import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia'
import 'flowbite'

import App from './App.vue';
const pinia = createPinia();
const app = createApp(App);

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light'
    },
    components,
    directives,
})

import AdminLayout from './Layouts/AdminLayout.vue';
import GuestLayout from './Layouts/GuestLayout.vue';
import AppLayout from './Layouts/AppLayout.vue';


app.component('GuestLayout', GuestLayout)
    .component('AppLayout', AppLayout)
    .component('AdminLayout', AdminLayout)

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
