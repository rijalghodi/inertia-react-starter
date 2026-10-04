<?php

use App\Http\Controllers\Auth\FirebaseAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::get('auth/verify-email', function () {
        return Inertia::render('auth/verify-email-link');
    })->name('auth.verify-email');

    Route::post('auth/firebase', [FirebaseAuthController::class, 'login'])->name('auth.firebase');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', function (\Illuminate\Http\Request $request) {
        \Illuminate\Support\Facades\Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});
