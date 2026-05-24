<?php

use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return app(DashboardController::class)();
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/{resource}', [ContentController::class, 'index'])->name('content.index');
    Route::get('/{resource}/create', [ContentController::class, 'create'])->name('content.create');
    Route::post('/{resource}', [ContentController::class, 'store'])->name('content.store');
    Route::get('/{resource}/{id}/edit', [ContentController::class, 'edit'])->name('content.edit');
    Route::put('/{resource}/{id}', [ContentController::class, 'update'])->name('content.update');
    Route::delete('/{resource}/{id}', [ContentController::class, 'destroy'])->name('content.destroy');
});
