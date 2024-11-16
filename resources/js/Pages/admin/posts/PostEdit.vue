<script setup>
import { useForm } from 'laravel-precognition-vue';
import { onMounted, ref, watch } from 'vue';
import { usePostStore, useUserStore } from '../../../store';
import { storeToRefs } from 'pinia';
import Button from '../../../components/Button.vue';
const store = usePostStore();
const { post } = storeToRefs(store)
const auth = useUserStore();
const props = defineProps({
    id: String
})
const edit = ref(false)
const form = useForm('put', 'api/posts/' + props.id, {
    title: '',
    content: ''
})

onMounted(async () => {
    await store.fetchPost(props.id);

})

watch(post, (postData) => {
    form.title = postData.title
    form.content = postData.content
})

</script>

<template>
    <div tabindex="-1"
        class="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ edit ? 'Edit Post' : 'Post Details' }}
                    </h3>
                    <RouterLink :to="{ name: 'posts' }"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </RouterLink>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="name" id="name" v-model="form.title"
                                @change="form.validate('title')" :disabled="!edit"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type post title" required="">
                            <p v-if="form.invalid('title')" class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{
                                    form.errors.title }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="content"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                            <textarea id="content" rows="6" v-model="form.content" @change="form.validate('content')"
                                :disabled="!edit"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write post content here...."></textarea>
                            <p v-if="form.invalid('content')" class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{
                                    form.errors.content }}</p>
                        </div>
                    </div>
                    <div v-if="auth.authPermissions?.includes('update-post')" class="space-x-1">
                        <Button v-if="edit" type="button" :disabled="form.hasErrors"
                            @click="store.updatePost(post.id, form)">
                            Update Post
                        </Button>
                        <Button v-else type="button" @click="edit = !edit">
                            Edit Post
                        </Button>
                        <Button v-show="edit" type="button" @click="edit = !edit">
                            Cancel
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>