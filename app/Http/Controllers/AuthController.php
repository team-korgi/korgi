<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return ["user" => $user];
    }

    public function login(Request $request)
    {
        if (Auth::attempt(["name" => $request->name, "password" => $request->password])) {
            $user = Auth::user();
            return inertia("Login", ["user" => $user]);
        } else {
            return inertia("Login", ["error" => "Login unsuccessful", "status_code" => 403]);// response()->json(["error" => "Login unsuccessful"], 403);
        }

    }
}
