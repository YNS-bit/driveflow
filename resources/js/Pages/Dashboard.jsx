import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// On importe les composants de notre nouvelle librairie Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// N'oublie pas d'ajouter 'kpis' dans les paramètres ici !
export default function Dashboard({ auth, bookings, kpis }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white uppercase tracking-widest">
                    <span className="text-red-600">Tableau de Bord</span> de bord Analytics
                </h2>
            }
        >
            <Head title="Dashboard - DriveFlow" />

            <div className="py-12 bg-gray-950 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* --- BOÎTE DE BIENVENUE --- */}
                    <div className="overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl sm:rounded-2xl">
                        <div className="p-6 text-gray-300">
                            Bienvenue, <span className="font-bold text-white">{auth.user.name}</span> ! Voici l'état actuel de votre flotte.
                        </div>
                    </div>

                    {/* --- MODULE DATA & ANALYTICS (Seulement pour l'admin qui a les kpis) --- */}
                    {kpis && (
                        <>
                            {/* Les 3 Cartes KPI */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Carte Chiffre d'Affaires */}
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Chiffre d'Affaires</p>
                                        <p className="text-3xl font-bold text-white mt-2">{kpis.revenue} <span className="text-lg text-red-500">DH</span></p>
                                    </div>
                                    <div className="p-3 bg-green-900/30 text-green-500 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                </div>

                                {/* Carte Total Réservations */}
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Réservations</p>
                                        <p className="text-3xl font-bold text-white mt-2">{kpis.total_bookings}</p>
                                    </div>
                                    <div className="p-3 bg-red-900/30 text-red-500 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                    </div>
                                </div>

                                {/* Carte Clients Inscrits */}
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Clients Actifs</p>
                                        <p className="text-3xl font-bold text-white mt-2">{kpis.total_clients}</p>
                                    </div>
                                    <div className="p-3 bg-blue-900/30 text-blue-500 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Le Graphique Recharts */}
                            <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow-2xl sm:rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
                                    <span className="text-red-600">|</span> Répartition des Statuts de Réservation
                                </h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={kpis.status_stats}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                            <XAxis dataKey="status" stroke="#9CA3AF" />
                                            <YAxis stroke="#9CA3AF" allowDecimals={false} />
                                            <Tooltip 
                                                cursor={{fill: '#1F2937'}} 
                                                contentStyle={{backgroundColor: '#111827', borderColor: '#374151', color: '#fff'}} 
                                            />
                                            {/* Les barres du graphique aux couleurs du thème (Rouge DriveFlow) */}
                                            <Bar dataKey="count" fill="#DC2626" radius={[4, 4, 0, 0]} name="Nombre" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- SECTION TABLEAU DES RÉSERVATIONS (On garde notre tableau d'hier) --- */}
                    {bookings && (
                        <div className="bg-gray-900 border border-gray-800 overflow-hidden shadow-2xl sm:rounded-2xl">
                            <div className="p-6 border-b border-gray-800">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                    <span className="text-red-600">|</span> Détail des Réservations
                                </h3>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-300">
                                    <thead className="text-xs text-gray-400 uppercase bg-gray-950 border-b border-gray-800">
                                        <tr>
                                            <th className="px-6 py-4">Client</th>
                                            <th className="px-6 py-4">Véhicule</th>
                                            <th className="px-6 py-4">Dates</th>
                                            <th className="px-6 py-4">Total</th>
                                            <th className="px-6 py-4">Statut</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 italic">
                                                    Aucune réservation pour le moment.
                                                </td>
                                            </tr>
                                        ) : (
                                            bookings.map((booking) => (
                                                <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                                                    <td className="px-6 py-4 font-medium text-white">
                                                        {booking.user?.name || 'Inconnu'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold">{booking.vehicle?.brand || 'Marque'}</span> {booking.vehicle?.model || 'Modèle'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {new Date(booking.start_date).toLocaleDateString('fr-FR')} au {new Date(booking.end_date).toLocaleDateString('fr-FR')}
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-red-500">
                                                        {booking.total_price} DH
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                            booking.status === 'Confirmé' ? 'bg-green-900/50 text-green-400 border border-green-800' : 
                                                            booking.status === 'Annulé' ? 'bg-red-900/50 text-red-400 border border-red-800' : 
                                                            'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
                                                        }`}>
                                                            {booking.status || 'En attente'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                                                        {booking.status !== 'Confirmé' && (
                                                            <Link
                                                                href={`/dashboard/bookings/${booking.id}/approve`}
                                                                method="patch"
                                                                as="button"
                                                                preserveScroll
                                                                className="px-3 py-1 bg-green-900/30 hover:bg-green-800/80 text-green-400 border border-green-800 rounded text-xs font-bold transition"
                                                            >
                                                                ✓ Approuver
                                                            </Link>
                                                        )}
                                                        {booking.status !== 'Annulé' && (
                                                            <Link
                                                                href={`/dashboard/bookings/${booking.id}/reject`}
                                                                method="patch"
                                                                as="button"
                                                                preserveScroll
                                                                className="px-3 py-1 bg-red-900/30 hover:bg-red-800/80 text-red-400 border border-red-800 rounded text-xs font-bold transition"
                                                            >
                                                                ✕ Refuser
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}