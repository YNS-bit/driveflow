import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ vehicles }) {
    
    // --- FONCTION POUR CHANGER LE STATUT ---
    const updateStatus = (id, newStatus) => {
        router.put(`/admin/vehicles/${id}/status`, {
            status: newStatus
        }, {
            preserveScroll: true, // Évite que la page remonte tout en haut à chaque clic
            onSuccess: () => alert("Statut mis à jour avec succès !")
        });
    };

    // --- COULEURS DES BADGES ---
    const getStatusStyle = (status) => {
        const s = status ? status.toLowerCase() : '';
        if (s === 'disponible') return 'bg-emerald-500 text-white';
        if (s === 'en nettoyage') return 'bg-sky-500 text-white';
        if (s === 'en maintenance') return 'bg-red-600 text-white';
        if (s === 'loué' || s === 'loue') return 'bg-orange-500 text-white';
        return 'bg-neutral-600 text-white';
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative">
            <Head title="Administration - DriveFlow" />
            
            {/* Décoration d'arrière-plan */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* En-tête de l'Admin */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">
                            ESPACE <span className="text-red-600">ADMIN</span>
                        </h1>
                        <p className="mt-2 text-neutral-400 font-medium tracking-wide">
                            Gestion de la flotte automobile en temps réel.
                        </p>
                    </div>
                    <Link 
                        href="/" 
                        className="bg-neutral-900 border border-white/10 hover:border-red-600 transition-all duration-300 text-white font-bold uppercase text-[10px] tracking-widest px-6 py-4 rounded-2xl"
                    >
                        Quitter l'administration
                    </Link>
                </div>

                {/* Tableau de gestion */}
                <div className="bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 border-b border-white/5">
                                    <th className="p-6 text-[10px] uppercase font-black tracking-widest text-neutral-500">Véhicule</th>
                                    <th className="p-6 text-[10px] uppercase font-black tracking-widest text-neutral-500">Immatriculation</th>
                                    <th className="p-6 text-[10px] uppercase font-black tracking-widest text-neutral-500">Statut Actuel</th>
                                    <th className="p-6 text-[10px] uppercase font-black tracking-widest text-neutral-500 text-right">Actions Rapides</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {vehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                                        
                                        {/* Info Voiture */}
                                        <td className="p-6 flex items-center gap-4">
                                            <div className="w-16 h-12 bg-neutral-950 rounded-lg overflow-hidden border border-white/10">
                                                <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-white uppercase italic text-lg leading-tight">{vehicle.brand}</p>
                                                <p className="text-red-600 font-bold text-sm uppercase">{vehicle.model}</p>
                                            </div>
                                        </td>

                                        {/* Immatriculation */}
                                        <td className="p-6">
                                            <span className="font-mono bg-black/50 border border-white/10 px-3 py-1 rounded text-neutral-300 text-sm">
                                                {vehicle.registration_number || 'XX-123-YY'}
                                            </span>
                                        </td>

                                        {/* Statut actuel (Badge) */}
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${getStatusStyle(vehicle.status)}`}>
                                                {vehicle.status || 'Inconnu'}
                                            </span>
                                        </td>

                                        {/* Boutons d'action rapides */}
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => updateStatus(vehicle.id, 'Disponible')}
                                                    className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all"
                                                >
                                                    Dispo
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(vehicle.id, 'En maintenance')}
                                                    className="bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white border border-red-600/20 px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all"
                                                >
                                                    Panne
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(vehicle.id, 'En nettoyage')}
                                                    className="bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white border border-sky-500/20 px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all"
                                                >
                                                    Lavage
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}