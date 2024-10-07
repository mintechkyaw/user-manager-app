// Import bootstrap and necessary libraries
import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

// Vuetify styles and setup
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import the main App component
import App from './App.vue';

// Vuetify initialization
const vuetify = createVuetify({
    components,
    directives,
});

// Router initialization
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Create the Vue application
const app = createApp(App);

// Use Vuetify and the router
app.use(vuetify);
app.use(router);

// Mount the app to the DOM
app.mount('#app');
