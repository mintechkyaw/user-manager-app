import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if (localStorage.getItem('token')) {
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
