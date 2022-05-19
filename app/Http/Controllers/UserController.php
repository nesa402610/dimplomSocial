<?php /** @noinspection PhpUndefinedFieldInspection */

namespace App\Http\Controllers;

use App\Models\friend;
use App\Models\post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function getUser(Request $request) {
        $user = User::find($request->ID);
        $posts = $user->posts;
        $friends = friend::where('user_id', $request->ID)->get();
        $authUser = Auth::user();
        return response(['user' => $user, 'friends' => $friends, 'me' => $authUser, 'posts'=>$posts]);
//            return [$request->ID, Auth::user()->id];
    }

    public function getUsers() {
        $user = User::all();
//        $friends = friend::where('user_id', $request->ID)->get();
//        $authUser = Auth::user();
        return response($user);
//            return [$request->ID, Auth::user()->id];
    }

    public function updateStatus(Request $request) {
        $User = Auth::user();
        $User->status = $request->status;
        $User->save();
    }

    public function updatePhoto(Request $request) {
        $User = Auth::user();
        $ext = $request->file('photo')->extension();
        $rand = rand(0, 10);
        $User->photo = 'storage/photos/' . $User->id . '/profile_photo' . $rand . '.' . $ext;
        $request->file('photo')->storeAs('photos/' . $User->id, 'profile_photo' . $rand . '.' . $ext, 'public');
        $User->save();
        return response()->json(['photo' => $User->photo]);
    }

    public function addToFriends(Request $request) {

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

    public function basicInfo(Request $request) {
        $user = Auth::user();
        if ($request->name) {
            $user->name = $request->name;
            $user->lastname = $request->lastname;
        } else if ($request->birthday) {
            $user->birthday = $request->birthday;
        } else if ($request->phone) {
            $user->phone = $request->phone;
        } else if ($request->gender) {
            $user->gender = $request->gender;
        } else if ($request->email) {
            $user->email = $request->email;
        } else if ($request->password) {
            $request->validate([
                'password' => 'required|confirmed|min:8|max:40',
            ]);
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response(["ok"]);
    }

}
