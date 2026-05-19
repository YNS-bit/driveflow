import { Head, router, Link } from '@inertiajs/react';

import React, { useState, useEffect } from 'react';


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

    // --- ÉTATS POUR LA RÉSERVATION ---
    const [bookingVehicle, setBookingVehicle] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    // --- COULEURS DES STATUTS ---
    // On met en minuscules pour éviter les erreurs de majuscules venant de la base de données
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

    // --- CALCUL DYNAMIQUE DU PRIX TOTAL ---
    useEffect(() => {
        if (startDate && endDate && bookingVehicle) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setTotalPrice(diffDays * bookingVehicle.daily_price);
        }
    }, [startDate, endDate, bookingVehicle]);
    // --- SOUMISSION DE LA RÉSERVATION ---
    const submitBooking = () => {
        if (!startDate || !endDate) {
            alert("Merci de choisir vos dates de location !");
            return;
        }

        router.post('/reservations', {
            vehicle_id: bookingVehicle.id,
            start_date: startDate,
            end_date: endDate,
            total_price: totalPrice > 0 ? totalPrice : bookingVehicle.daily_price
        }, {
            onSuccess: () => {
                alert("🎉 Réservation confirmée avec succès !");
                setBookingVehicle(null); // On ferme la modale
                setStartDate(''); // On remet les dates à zéro
                setEndDate('');
            }
        });
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
                        placeholder="Rechercher une marque, un modèle (ex: Dacia, Clio)..." 
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
            {/* --------------------------- */}

                {/* Boutons (Le cerveau du menu) */}
                <div className="flex items-center gap-6">
                    {auth.user ? (
                        /* Si l'utilisateur est CONNECTÉ */
                        <>
                            <span className="text-neutral-400 text-sm font-medium hidden md:inline">
                                Bonjour, <span className="text-white">{auth.user.name}</span>
                            </span>

                            {/* Si c'est le PATRON, on affiche le lien Admin */}
                            {auth.user.role === 'admin' ? (
                                <Link 
                                    href="/admin" 
                                    className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500 transition-colors"
                                >
                                    🛠️ Espace Admin
                                </Link>
                            ) : (
                                /* Si c'est un CLIENT, on affiche ses réservations */
                                <Link 
                                    href="/mes-reservations" 
                                    className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500 transition-colors"
                                >
                                    Mes Réservations
                                </Link>
                            )}

                            {/* Bouton de déconnexion */}
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
                        /* Si l'utilisateur est un VISITEUR (Non connecté) */
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
            {/* ------------------------------------------- */}
            
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
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6 rounded-full" />
                    <Link href="/mes-reservations" className="inline-block border border-white/10 bg-white/5 text-white font-bold uppercase text-[10px] tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
        Voir mes réservations
    </Link>
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
                            // On vérifie si la voiture est disponible pour le bouton
                            const isAvailable = vehicle.status && vehicle.status.toLowerCase() === 'disponible';

                            return (
                                <div key={vehicle.id} className="bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-red-600/40 transition-all duration-500 flex flex-col relative">
                                    
                                    {/* Image avec Overlay */}
                                    <div className="h-56 relative overflow-hidden">
                                        <img src={vehicle.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" alt={vehicle.model} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                                        
                                        {/* Badge Catégorie (à gauche) */}
                                        <span className="absolute top-5 left-5 bg-neutral-950/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            {vehicle.type}
                                        </span>

                                        {/* Badge Statut (à droite) dynamique */}
                                        <span className={`absolute top-5 right-5 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg ${getStatusStyle(vehicle.status)}`}>
                                            {vehicle.status}
                                        </span>
                                    </div>

                                    <div className="p-8 flex-grow">
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
                                            
                                            {/* Bouton intelligent qui se désactive */}
                                            <button 
                                                onClick={() => setBookingVehicle(vehicle)}
                                                disabled={!isAvailable}
                                                className={`font-black uppercase text-[10px] px-6 py-4 rounded-2xl transition-all duration-300 transform ${
                                                    isAvailable 
                                                    ? 'bg-white text-black hover:bg-red-600 hover:text-white active:scale-95 shadow-xl' 
                                                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-70'
                                                }`}
                                            >
                                                {isAvailable ? 'Réserver' : 'Indisponible'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
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

            {/* --- MODALE DE RÉSERVATION --- */}
            {bookingVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
                    <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        
                        <button 
                            onClick={() => setBookingVehicle(null)}
                            className="absolute top-6 right-6 z-20 bg-neutral-950 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-red-600 transition-colors"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-64 md:h-auto relative">
                                <img src={bookingVehicle.image} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-transparent hidden md:block" />
                            </div>

                            <div className="p-10 md:w-1/2">
                                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Finaliser la réservation</h3>
                                <h2 className="text-3xl font-black text-white uppercase italic leading-none mb-6">
                                    {bookingVehicle.brand} <br /> {bookingVehicle.model}
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2 mb-1 block">Date de début</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-neutral-950 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-red-600"
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2 mb-1 block">Date de fin</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-neutral-950 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-red-600"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-neutral-400 font-bold uppercase text-xs tracking-tighter">Total à payer</span>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-white leading-none">{totalPrice > 0 ? totalPrice : bookingVehicle.daily_price} <span className="text-red-600 text-sm italic">DH</span></p>
                                        <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1 italic">TVA incluse au Maroc</p>
                                    </div>
                                </div>

                                <button 
        onClick={submitBooking} 
        className="w-full bg-red-600 text-white font-black uppercase text-xs tracking-widest py-4 rounded-2xl mt-8 hover:bg-white hover:text-black transition-all duration-300 shadow-xl shadow-red-600/20"
    >
        Confirmer ma réservation
    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}