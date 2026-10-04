<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class FirebaseAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'idToken' => 'required|string',
        ]);

        $idToken = $request->input('idToken');

        try {
            $auth = Firebase::auth();
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');
            
            // Get user details from Firebase
            $firebaseUser = $auth->getUser($uid);

            // Find or create the user in our database
            $user = User::firstOrCreate(
                ['firebase_uid' => $uid],
                [
                    'name' => $firebaseUser->displayName ?? 'User',
                    'email' => $firebaseUser->email,
                ]
            );

            // Establish standard Laravel session
            Auth::login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (FailedToVerifyToken $e) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'idToken' => 'The token is invalid: '.$e->getMessage(),
            ]);
        } catch (\Exception $e) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'idToken' => 'An error occurred: '.$e->getMessage(),
            ]);
        }
    }
}
