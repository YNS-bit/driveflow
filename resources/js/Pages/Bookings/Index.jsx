import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ bookings }) {
    // --- COULEURS DES STATUTS ---
    const getStatusStyle = (status) => {
        const s = status ? status.toLowerCase() : '';
        if (s === 'en attente') return 'bg-yellow-500 text-black shadow-yellow-500/20';
        if (s === 'confirmée' || s === 'confirmee' || s === 'approuvée' || s === 'payée') return 'bg-emerald-500 text-white shadow-emerald-500/20';
        if (s === 'terminée' || s === 'terminee') return 'bg-neutral-600 text-white shadow-neutral-600/20';
        if (s === 'annulée' || s === 'annulee') return 'bg-red-600 text-white shadow-red-600/20';
        return 'bg-neutral-700 text-white shadow-neutral-700/20';
    };

    // --- FORMATAGE DES DATES ---
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative">
            <Head title="Mes Réservations - DriveFlow" />
            
            {/* Décoration d'arrière-plan */}
            <div className="fixed top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* En-tête avec bouton de retour */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white italic">
                            MES <span className="text-red-600">RÉSERVATIONS</span>
                        </h1>
                        <p className="mt-2 text-neutral-400 font-medium tracking-wide">
                            Suivez l'état de vos locations DriveFlow.
                        </p>
                    </div>
                    
                    <Link 
                        href="/" 
                        className="bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-white font-bold uppercase text-[10px] tracking-widest px-6 py-4 rounded-2xl"
                    >
                        ← Retour au catalogue
                    </Link>
                </div>

                {/* Grille des réservations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className="bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col relative transition-all duration-300 hover:border-white/10 shadow-xl">
                                
                                {/* Image de la voiture */}
                                <div className="h-48 relative overflow-hidden bg-neutral-900">
                                    <img 
                                        src={booking.vehicle.image} 
                                        alt={booking.vehicle.model} 
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                                    
                                    {/* Badge Statut */}
                                    <span className={`absolute top-5 right-5 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg ${getStatusStyle(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                {/* Détails de la réservation */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <h2 className="text-2xl font-black text-white uppercase italic mb-6">
                                        {booking.vehicle.brand} <span className="text-red-600">{booking.vehicle.model}</span>
                                    </h2>
                                    
                                    <div className="space-y-4 mb-6 flex-grow">
                                        <div className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/5">
                                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Du</span>
                                            <span className="text-sm font-bold text-white">{formatDate(booking.start_date)}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/5">
                                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Au</span>
                                            <span className="text-sm font-bold text-white">{formatDate(booking.end_date)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex justify-between items-end mb-6">
                                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Montant Total</span>
                                        <p className="text-3xl font-black text-white leading-none">
                                            {booking.total_price} <span className="text-red-600 text-sm italic">DH</span>
                                        </p>
                                    </div>
   
                                    {/* Section des Actions (Paiement / Facture) */}
                                    <div className="flex flex-col gap-3 mt-auto">
                                        
                                        {/* Bouton de paiement (visible uniquement si "En attente") */}
                                        {booking.status === 'En attente' && (
                                            <Link 
                                                href={route('bookings.pay', { id: booking.id })} 
                                                method="post" 
                                                as="button"
                                                className="w-full text-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                                            >
                                                💳 Payer avec Stripe
                                            </Link>
                                        )}

                                        {/* Bouton Facture */}
                                        <a 
                                            href={route('bookings.invoice', { id: booking.id })} 
                                            inertia="false" 
                                            className="w-full text-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                                        >
                                            📄 Télécharger la Facture (PDF)
                                        </a>
                                        
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-24 bg-neutral-900/20 border border-white/5 rounded-3xl">
                            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🚗</span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic mb-2">Aucune réservation</h3>
                            <p className="text-neutral-500 text-sm font-medium">Vous n'avez pas encore loué de véhicule chez nous.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}