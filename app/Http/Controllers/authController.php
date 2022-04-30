<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class authController extends Controller
{
    public function loginCheck() {

    }
    public function createAccount(Request $request) {

        $user = new User;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->birthday = $request->birthday;
        $user->phone = $request->phone;

        return response()->json($user);
    }
    public function login(Request $request) {

        return response()->json('authed');
    }
}
