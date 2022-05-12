<?php

namespace App\Http\Controllers;

use App\Models\friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::find($request->ID);
        $friends = friend::where('user_id', $request->ID)->get();
        $authUser = Auth::user();
        return response(['user' => $user, 'friends' => $friends, 'me' => $authUser]);
//            return [$request->ID, Auth::user()->id];
    }

    public function updateStatus(Request $request)
    {
        $User = Auth::user();
        $User->status = $request->status;
        $User->save();
    }

    public function updatePhoto(Request $request)
    {
        $User = Auth::user();
        $ext = $request->file('photo')->extension();
        $rand = rand(0, 10);
        $User->photo = 'storage/photos/' . $User->id . '/profile_photo' . $rand . '.' . $ext;
        $request->file('photo')->storeAs('photos/' . $User->id, 'profile_photo' . $rand . '.' . $ext, 'public');
        $User->save();
        return response()->json(['photo' => $User->photo]);
    }

    public function addToFriends(Request $request)
    {

        if (Auth::user()->id == $request->friend_id) {
            return response('Нельзя дружить с сами собой!');
        } else {
            $friend = friend::firstornew(['user_id' => Auth::user()->id, 'friend_id' => $request->friend_id]);
            $friend->user_id = Auth::user()->id;
            $friend->friend_id = $request->friend_id;
            $friend->save();
            return response('success', 200);
        }
    }
}
