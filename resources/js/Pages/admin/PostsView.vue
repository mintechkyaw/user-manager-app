
<template>
    <AdminLayout>
        <div class="flex justify-between items-center mb-3 mx-0.5">
            <div class="text-2xl font-semibold">Posts</div>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Create Post
            </button>
        </div>
        <div class=" mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="post in posts" :key="post.id"
                class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ post.title }}
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                    v-html="post.content.split('').slice(0, 100).join('') + '.....'"></p>
                <a href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>

        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../Layouts/AdminLayout.vue';
import { onMounted, ref } from 'vue';

const posts = ref([]);
const loading = ref(false);
const error = ref(null)
const fetchPosts = async () => {
    try {
        loading.value = true
        const response = await axios.get('api/posts')
        posts.value = response.data.data
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchPosts();
})
</script>