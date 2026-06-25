import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Show({ vehicle }) {
    // --- ÉTATS POUR LA RÉSERVATION ---
    // Cette variable contrôle l'apparition du calendrier
    const [showBookingForm, setShowBookingForm] = useState(false); 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { errors } = usePage().props; 
    
    // Pour voir l'erreur exacte dans ta console (F12)
    console.log("Erreurs Laravel interceptées :", errors);

    // --- CALCUL DU PRIX TOTAL DYNAMIQUE ---
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setTotalPrice(diffDays * vehicle.daily_price);
        }
    }, [startDate, endDate, vehicle.daily_price]);

    // --- SOUMISSION DE LA RÉSERVATION À LARAVEL ---
    const submitBooking = () => {
        if (!startDate || !endDate) {
            alert("Merci de choisir vos dates de location !");
            return;
        }
        router.post('/reservations', {
            vehicle_id: vehicle.id,
            start_date: startDate,
            end_date: endDate,
            total_price: totalPrice > 0 ? totalPrice : vehicle.daily_price
        }, {
            onSuccess: () => alert("🎉 Réservation confirmée avec succès !")
        });
    };
    const soumettreReservation = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut

    // On utilise POST pour forcer l'écriture dans la base de données
    router.post('/reservations', {
        vehicle_id: 5, // Remplace par ta variable si elle est dynamique (ex: vehicle.id)
        start_date: startDate, // Ces variables viennent de tes inputs (setStartDate)
        end_date: endDate,
        total_price: 22400 // Remplace par ta variable de prix total
    });
};

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 relative overflow-hidden">
            {/* Décoration de fond */}
            <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

            <Head title={`${vehicle.brand} ${vehicle.model} - DriveFlow`} />
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Bouton retour */}
                <Link href="/catalog" className="text-red-600 font-bold uppercase text-sm mb-8 inline-block hover:underline">
                    ← Retour au catalogue
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                    
                    {/* SECTION GAUCHE : L'IMAGE */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 h-[500px] shadow-2xl">
                        <img 
                            src={vehicle.image?.startsWith('http') || vehicle.image?.startsWith('/') ? vehicle.image : `/${vehicle.image}`} 
                            alt={vehicle.model}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* SECTION DROITE : DÉTAILS ET RÉSERVATION */}
                    <div className="flex flex-col justify-center">
                        
                        <h1 className="text-5xl font-black italic uppercase mb-2">
                            {vehicle.brand} <span className="text-red-600">{vehicle.model}</span>
                        </h1>
                        <p className="text-3xl font-bold mb-8">{vehicle.daily_price} DH <span className="text-sm text-neutral-500 font-normal">/ jour</span></p>

                        {/* 🌟 La Description et les Propriétés Dynamiques (Features) */}
                        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-3">Pourquoi choisir ce véhicule ?</h3>
                            
                            <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                                {vehicle.description || "Aucune description n'a encore été ajoutée pour ce véhicule."}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                                {vehicle.features && vehicle.features.length > 0 ? (
                                    vehicle.features.map((feature, index) => (
                                        <span 
                                            key={index} 
                                            className="bg-neutral-900 border border-white/10 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full text-neutral-400"
                                        >
                                            ✓ {feature}
                                        </span>
                                    ))
                                ) : (
                                    <>
                                        <span className="bg-neutral-900 border border-white/10 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full text-neutral-400">✓ Entretien à jour</span>
                                        <span className="bg-neutral-900 border border-white/10 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full text-neutral-400">✓ Assistance 24/7</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* La grille de caractéristiques */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-neutral-900 border border-white/5 rounded-xl p-4">
                                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Carburant</p>
                                <p className="font-bold text-sm text-white">{vehicle.fuel_type}</p>
                            </div>
                            <div className="bg-neutral-900 border border-white/5 rounded-xl p-4">
                                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Transmission</p>
                                <p className="font-bold text-sm text-white">{vehicle.transmission}</p>
                            </div>
                            <div className="bg-neutral-900 border border-white/5 rounded-xl p-4">
                                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Places</p>
                                <p className="font-bold text-sm text-white">{vehicle.seats || '5'}</p>
                            </div>
                            <div className="bg-neutral-900 border border-white/5 rounded-xl p-4">
                                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Climatisation</p>
                                <p className="font-bold text-sm text-white">{vehicle.air_conditioning ? 'Oui' : 'Non'}</p>
                            </div>
                        </div>

                        {/* Le Bouton Dynamique et le Calendrier */}
                        {!showBookingForm ? (
                            <button 
                                onClick={() => setShowBookingForm(true)}
                                className="w-full bg-white text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-neutral-200 transition-colors"
                            >
                                procéder à la réservation
                            </button>
                        ) : (
                            <div className="bg-neutral-900 border border-red-600/30 rounded-[2rem] p-6 animate-in fade-in zoom-in duration-300">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Choisissez vos dates</h3>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2 mb-2 block">Départ</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-neutral-950 border border-white/10 text-white rounded-xl p-4 outline-none focus:border-red-600 transition-colors cursor-pointer"
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2 mb-2 block">Retour</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-neutral-950 border border-white/10 text-white rounded-xl p-4 outline-none focus:border-red-600 transition-colors cursor-pointer"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {totalPrice > 0 && (
                                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/5">
                                        <span className="text-neutral-400 font-bold uppercase text-xs">Total</span>
                                        <span className="text-2xl font-black text-white">{totalPrice} <span className="text-red-600 text-xs">DH</span></span>
                                    </div>
                                )}

                                <button 
                                    onClick={submitBooking} 
                                    className="w-full bg-red-600 text-white font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Confirmer pour {totalPrice > 0 ? totalPrice : vehicle.daily_price} DH
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>Proc
        </div>
    );
}