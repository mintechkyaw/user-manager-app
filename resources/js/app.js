import './bootstrap';
import { createApp } from 'vue';
import router from './routes';
import { createPinia } from 'pinia'
import 'flowbite'

import App from './App.vue';


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
