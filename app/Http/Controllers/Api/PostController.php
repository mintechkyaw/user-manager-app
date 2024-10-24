<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->hasPermissionTo('read-post')) {
            $posts = Post::latest()->get();
            return PostResource::collection($posts);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => 'Nah! You can\'t see the posts',
        ], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        if (auth()->user()->hasPermissionTo('create-post')) {
            $data = $request->validated();
            Post::create($data);

            return response()->json([
                'msg' => 'Post Uploaded Successfully',
            ]);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => 'Nah You can\'t upload post',
        ], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if (auth()->user()->hasPermissionTo('read-post')) {
            return new PostResource($post);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => 'Nah You can\'t see the posts',
        ], 403);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post)
    {
        if (auth()->user()->hasPermissionTo('update-post')) {
            $data = $request->validated();
            $post->update($data);

            return response()->json([
                'msg' => 'Post Updated',
            ], 200);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => 'Nah You can\'t edit the post',
        ], 403);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if (auth()->user()->hasPermissionTo('delete-post')) {
            $post->delete();

            return response()->json([
                'msg' => 'Post Deleted',
            ], 200);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => 'Nah You can\'t delete the post',
        ], 403);

    }
}
