<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Enums\VehicleStatus;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        // --- LES CITADINES ---
        Vehicle::create([
            'brand' => 'Dacia', 'model' => 'Sandero Stepway', 'fuel_type' => 'Essence', 'daily_price' => 250, 'type' => 'Citadine', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 12000, 'next_maintenance_mileage' => 20000, 'transmission' => 'Manuelle', 'seats' => 5, 'doors' => 5, 'air_conditioning' => true,
            // 👇 Lien direct trouvé par ma recherche (compatible)
            'image' => 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Dacia_Sandero_Stepway_side_20101003.jpg'
        ]);
        Vehicle::create([
            'brand' => 'Renault', 'model' => 'Clio 5', 'fuel_type' => 'Diesel', 'daily_price' => 300, 'type' => 'Citadine', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 45000, 'next_maintenance_mileage' => 55000, 'transmission' => 'Manuelle', 'seats' => 5, 'doors' => 5, 'air_conditioning' => true,
            // 👇 Lien direct (Renault Officiel)
            'image' => 'https://media.renault.com/wp-content/uploads/2024/01/ddf2c7696f2f63b149fb96ba42561271.jpg'
        ]);
        Vehicle::create([
            'brand' => 'Fiat', 'model' => '500 White', 'fuel_type' => 'Hybride', 'daily_price' => 350, 'type' => 'Citadine', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 8000, 'next_maintenance_mileage' => 18000, 'transmission' => 'Manuelle', 'seats' => 4, 'doors' => 3, 'air_conditioning' => true,
            // 👇 Lien direct (Compatible)
            'image' => 'https://media.istockphoto.com/id/1307695523/photo/profile-view-of-white-fiat-500-parked-in-the-street.jpg?s=612x612&w=0&k=20&c=ojNOsVyzm7AGsCKgf-o_2pdoCDA5JLHMK_T2X4xyrIA='
        ]);

        // --- LES SUV ---
        Vehicle::create([
            'brand' => 'Dacia', 'model' => 'Duster Arizona', 'fuel_type' => 'Diesel', 'daily_price' => 450, 'type' => 'SUV', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 60000, 'next_maintenance_mileage' => 70000, 'transmission' => 'Manuelle', 'seats' => 5, 'doors' => 5, 'air_conditioning' => true,
            // 👇 Lien direct (Duster Orange compatible)
            'image' => 'https://i.ytimg.com/vi/xIYtBz5Ezio/hq720.jpg'
        ]);
        Vehicle::create([
            'brand' => 'Hyundai', 'model' => 'Tucson N Line Black', 'fuel_type' => 'Hybride', 'daily_price' => 800, 'type' => 'SUV', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 10000, 'next_maintenance_mileage' => 20000, 'transmission' => 'Automatique', 'seats' => 5, 'doors' => 5, 'air_conditioning' => true,
            // 👇 Lien direct (Tucson Noir compatible thême sombre)
            'image' => 'https://i.ytimg.com/vi/1OD54PpYATQ/maxresdefault.jpg'
        ]);

        // --- LES UTILITAIRES ---
        Vehicle::create([
            'brand' => 'Renault', 'model' => 'Master Panel Van', 'fuel_type' => 'Diesel', 'daily_price' => 850, 'type' => 'Utilitaire', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 80000, 'next_maintenance_mileage' => 90000, 'transmission' => 'Manuelle', 'seats' => 3, 'doors' => 4, 'air_conditioning' => false,
            // 👇 Ton nouveau lien pour le Master !
            'image' => 'https://aytdizayn.com/wp-content/uploads/2026/01/renault-master-panelvan-kaplama-ve-koruma.jpg'
        ]);
        Vehicle::create([
            'brand' => 'Citroën', 'model' => 'Berlingo Driver', 'fuel_type' => 'Diesel', 'daily_price' => 500, 'type' => 'Utilitaire', 'status' => VehicleStatus::DISPONIBLE, 'mileage' => 55000, 'next_maintenance_mileage' => 65000, 'transmission' => 'Manuelle', 'seats' => 5, 'doors' => 5, 'air_conditioning' => true,
            // 👇 Lien direct (Berlingo Blanc compatible)
            'image' => 'https://www.citroenvansales.com/wp-content/uploads/2024/05/2024-New-Citroen-Berlingo-Driver-Edition-White-Pure-Vans.jpg'
        ]);
    }
}