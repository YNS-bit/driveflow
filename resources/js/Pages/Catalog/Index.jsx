import { Head, router, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Index({ vehicles, auth, filters }) {
    // --- ÉTATS POUR LE FILTRAGE ---
    const [search, setSearch] = useState(filters?.search || '');
    const handleSearch = (e) => {
        e.preventDefault();
        // On envoie la recherche à Laravel sans recharger la page
        router.get('/catalog', { search: search }, { preserveState: true, replace: true });
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('Tous');
    const [selectedTransmission, setSelectedTransmission] = useState('Toutes');

    // --- COULEURS DES STATUTS ---
    const getStatusStyle = (status) => {
        if (!status) return 'bg-neutral-600 text-white';
        const s = status.toLowerCase();
        if (s === 'disponible') return 'bg-emerald-500 text-white shadow-emerald-500/20';
        if (s === 'en nettoyage') return 'bg-sky-500 text-white shadow-sky-500/20';
        if (s === 'en maintenance') return 'bg-red-600 text-white shadow-red-600/20';
        if (s === 'loué' || s === 'loue') return 'bg-orange-500 text-white shadow-orange-500/20';
        return 'bg-neutral-600 text-white shadow-neutral-600/20';
    };

    // --- LOGIQUE DE FILTRAGE ---
    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchName = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = selectedType === 'Tous' || vehicle.type === selectedType;
        const matchTransmission = selectedTransmission === 'Toutes' || vehicle.transmission === selectedTransmission;
        return matchName && matchType && matchTransmission;
    });
    // --- FONCTION DE GESTION DES IMAGES ---
const getImageUrl = (imagePath) => {
    // Si la case est vide (NULL dans la BDD)
    if (!imagePath) return '/images/default-car.jpg';
    
    // On nettoie la chaîne au cas où il y aurait des espaces invisibles
    const cleanPath = String(imagePath).trim();
    
    // Si c'est un lien internet complet
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
        return cleanPath; 
    }
    
    // Sinon, c'est une image stockée localement
    return `/storage/${cleanPath}`;
};

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative">
            <Head title="Réserver votre véhicule - DriveFlow" />
            
            {/* --- BARRE DE NAVIGATION DYNAMIQUE --- */}
            <nav className="relative z-20 flex flex-col sm:flex-row justify-between items-center px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md mb-12">
                {/* Logo */}
                <div className="text-2xl font-black uppercase tracking-tighter text-white italic mb-4 sm:mb-0">
                    DRIVE<span className="text-red-600">FLOW</span>
                </div>
                
                {/* --- BARRE DE RECHERCHE --- */}
                <div className="max-w-2xl mx-auto mb-12 px-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input 
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une marque, un modèle..." 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                        />
                        <button 
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-colors"
                        >
                            Chercher
                        </button>
                    </form>
                </div>

                {/* Boutons (Le cerveau du menu) */}
                <div className="flex items-center gap-6">
                    {auth.user ? (
                        <>
                            <span className="text-neutral-400 text-sm font-medium hidden md:inline">
                                Bonjour, <span className="text-white">{auth.user.name}</span>
                            </span>

                            {auth.user.role === 'admin' ? (
                                <Link 
                                    href="/admin" 
                                    className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500 transition-colors"
                                >
                                    🛠️ Espace Admin
                                </Link>
                            ) : (
                                <Link 
                                    href="/mes-reservations" 
                                    className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500 transition-colors"
                                >
                                    Mes Réservations
                                </Link>
                            )}

                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all"
                            >
                                Se déconnecter
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/login" 
                                className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500 transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link 
                                href="/register" 
                                className="bg-white text-black hover:bg-neutral-300 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-colors"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            
            {/* Décoration d'arrière-plan */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* En-tête */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white italic">
                         <span className="text-red-600">DRIVEFLOW</span>
                    </h1>
                    <p className="mt-4 text-neutral-400 font-medium tracking-wide">
                        L'excellence de la location automobile au Maroc.
                    </p>
                </div>

                {/* Barre de Recherche et Filtres */}
                <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-4 rounded-3xl mb-12 flex flex-col md:flex-row gap-4 shadow-2xl">
                    <div className="flex-grow">
                        <input 
                            type="text" 
                            placeholder="Quelle voiture cherchez-vous ?" 
                            className="w-full bg-neutral-950/50 border border-white/10 text-white rounded-2xl px-5 py-4 focus:border-red-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="bg-neutral-950/50 border border-white/10 text-neutral-300 rounded-2xl px-5 py-4 focus:border-red-600 outline-none cursor-pointer"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="Tous">Toutes catégories</option>
                        <option value="Citadine">Citadines</option>
                        <option value="SUV">SUV</option>
                        <option value="Utilitaire">Utilitaires</option>
                    </select>
                </div>

                {/* Grille des Véhicules */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle) => {
                            const isAvailable = vehicle.status && vehicle.status.toLowerCase() === 'disponible';

                            return (
                                /* LA CARTE EST MAINTENANT UN LIEN PROPRE */
                                <Link 
                                    key={vehicle.id} 
                                    href={`/catalogue/${vehicle.id}`}
                                    className="block bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-red-600/40 transition-all duration-500 flex flex-col relative hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/10 cursor-pointer"
                                >
                                    {/* Image avec Overlay */}
                                    <div className="h-56 relative overflow-hidden">
                                      <img 
    src={vehicle.image} 
    alt={vehicle.model} 
    onError={(e) => { e.target.src = '/images/default-car.jpg'; }}
    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" 
/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                                        
                                        <span className="absolute top-5 left-5 bg-neutral-950/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            {vehicle.type}
                                        </span>

                                        <span className={`absolute top-5 right-5 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg ${getStatusStyle(vehicle.status)}`}>
                                            {vehicle.status}
                                        </span>
                                    </div>

                                    <div className="p-8 flex-grow flex flex-col h-full">
                                        <h2 className="text-2xl font-black text-white uppercase italic">{vehicle.brand} <span className="text-red-600">{vehicle.model}</span></h2>
                                        
                                        <div className="grid grid-cols-2 gap-3 my-6">
                                            <div className="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                                                <p className="text-[10px] text-neutral-500 font-bold uppercase">Transmission</p>
                                                <p className="text-xs text-white font-bold">{vehicle.transmission}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                                                <p className="text-[10px] text-neutral-500 font-bold uppercase">Carburant</p>
                                                <p className="text-xs text-white font-bold">{vehicle.fuel_type}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end mt-auto">
                                            <div>
                                                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-tighter">Prix / Jour</p>
                                                <p className="text-3xl font-black text-white">{vehicle.daily_price} <span className="text-red-600 text-sm">DH</span></p>
                                            </div>
                                            
                                            {/* FAUX BOUTON (span) : le clic se fait via le <Link> de la carte */}
                                            <span 
                                                className={`font-black uppercase text-[10px] px-6 py-4 rounded-2xl transition-all duration-300 transform shadow-xl ${
                                                    isAvailable 
                                                    ? 'bg-white text-black group-hover:bg-red-600 group-hover:text-white' 
                                                    : 'bg-neutral-800 text-neutral-500 opacity-70'
                                                }`}
                                            >
                                                {isAvailable ? 'Voir détails' : 'Indisponible'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-neutral-900/20 border border-neutral-800 rounded-2xl">
                            <p className="text-neutral-500 text-sm font-semibold uppercase tracking-widest">
                                Aucun véhicule disponible pour ces critères
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}