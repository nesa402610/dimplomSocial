<?php

namespace App\Http\Controllers;

use App\Models\post;
use App\Models\User;
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

        $user = Auth::user();
        $post = $user->posts()->find($request->id);
        if ($post) {
            $post->delete();
        }

        return response('ok');

    }
}
