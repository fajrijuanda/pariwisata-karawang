<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DestinasiController;
use App\Http\Controllers\Api\BudayaController;
use App\Http\Controllers\Api\UmkmController;
use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\ArtikelController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/destinasis', [DestinasiController::class, 'index']);
Route::get('/destinasis/{id}', [DestinasiController::class, 'show']);
Route::get('/budayas', [BudayaController::class, 'index']);
Route::get('/budayas/{id}', [BudayaController::class, 'show']);
Route::get('/umkms', [UmkmController::class, 'index']);
Route::get('/umkms/{id}', [UmkmController::class, 'show']);
Route::get('/agendas', [AgendaController::class, 'index']);
Route::get('/agendas/{id}', [AgendaController::class, 'show']);
Route::get('/artikels', [ArtikelController::class, 'index']);
Route::get('/artikels/{id}', [ArtikelController::class, 'show']);
