<?php

namespace App\Http\Controllers;

use App\Models\post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function createPost(Request $request) {

        $post = new Post();
        $post->user_id = Auth::user()->id;
        $post->post_message = $request->postMessage;
        $post->save();

        return response($post);

    }

    public function deletePost(Request $request) {
        $post = Post::find($request->id);
        $post->delete();

        return response('Пост успешно удален');

    }
}
