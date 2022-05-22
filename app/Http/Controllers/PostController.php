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
        $post->user_acceptor_id = $request->userID;
        $post->post_message = $request->postMessage;
        $post->save();

        $post->user;
        $post->user_acceptor;

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
