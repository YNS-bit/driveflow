<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::get('/catalog', [VehicleController::class, 'index'])->name('catalog');
// Les routes pour gérer le statut des réservations (réservées à l'admin)
Route::patch('/dashboard/bookings/{id}/approve', [DashboardController::class, 'approve'])->name('bookings.approve')->middleware('auth');
Route::patch('/dashboard/bookings/{id}/reject', [DashboardController::class, 'reject'])->name('bookings.reject')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::get('/catalogue', [VehicleController::class, 'index'])->name('catalog.index');
use App\Http\Controllers\BookingController;

// La route qui reçoit les données du formulaire de réservation
Route::post('/reservations', [BookingController::class, 'store'])->name('bookings.store');
// La route pour afficher la page "Mes Réservations"
Route::get('/mes-reservations', [BookingController::class, 'index'])->name('bookings.index');
// --- ROUTES ADMINISTRATEUR ---
Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
Route::put('/admin/vehicles/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.vehicles.status');
// Créer une réservation (seulement si connecté)
Route::post('/reservations', [BookingController::class, 'store'])
    ->name('bookings.store')
    ->middleware('auth');

// Voir ses réservations (seulement si connecté)
Route::get('/mes-reservations', [BookingController::class, 'index'])
    ->name('bookings.index')
    ->middleware('auth');
    Route::get('/mes-reservations/{id}/facture', [BookingController::class, 'downloadInvoice'])
    ->name('bookings.invoice')
    ->middleware('auth');
    Route::get('/install-db', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]); // Optionnel, si tu as des seeders
    return 'Base de données installée avec succès !';
});
Route::get('/install-db', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        
        // Si tu as créé de fausses données (seeders), enlève les "//" au début de la ligne suivante :
        // \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        
        return '🚀 Base de données DriveFlow installée avec succès sur le cloud !';
    } catch (\Exception $e) {
        return 'Erreur de connexion : ' . $e->getMessage();
    }
});
Route::post('/admin/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
Route::delete('/admin/vehicles/{vehicle}', [App\Http\Controllers\VehicleController::class, 'destroy'])->name('admin.vehicles.destroy');
Route::get('/catalogue/{vehicle}', [App\Http\Controllers\VehicleController::class, 'show'])->name('vehicles.show');
Route::get('/debug-image', function () {
    $chemin = public_path('images/default-car.jpg');
    
    if (file_exists($chemin)) {
        return "SUCCÈS : Laravel voit parfaitement le fichier à cette adresse exacte : " . $chemin;
    } 
    
    return "ÉCHEC : Laravel cherche le fichier ici, mais la boîte est vide : " . $chemin;
});