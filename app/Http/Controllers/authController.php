<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class authController extends Controller
{
    public function loginCheck() {
        return auth()->user();

    }
    public function createAccount(Request $request) {
        $request->validate([
            'name' => 'required|max:30',
            'lastname' => 'required|max:30',
            'email' => 'required|unique:users|email',
            'password' => 'required|confirmed|min:8|max:40',
            'phone' => 'required|min:11|max:11',
        ]);

        $user = new User;

        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->phone = $request->phone;

        $user->save();

        return $user;
    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
//            $request->session()->regenerate();
            $token = $request->user()->createToken('token-name');
            return response()->json(['token' => $token->plainTextToken, 'user' => Auth::user()], 200);
        }
        throw ValidationException::withMessages([
            'login' => ['Invalid data']
        ]);
    }
}
