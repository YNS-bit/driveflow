import { useForm } from '@inertiajs/react';

export default function AddVehicleForm() {
    // TOUTES les colonnes de la BDD sont maintenant initialisées
    const { data, setData, post, processing, errors, reset } = useForm({
        brand: '',
        model: '',
        type: 'Berline',
        daily_price: '',
        transmission: 'Manuelle',
        fuel_type: 'Diesel',
        seats: 5,
        doors: 5,
        mileage: '',
        next_maintenance_mileage: '',
        air_conditioning: 1, // 1 pour Oui, 0 pour Non
        status: 'Disponible',
        image: null, 
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/vehicles', {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Ajouter un nouveau véhicule</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Ligne 1 */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Marque</label>
                    <input type="text" value={data.brand} onChange={e => setData('brand', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Modèle</label>
                    <input type="text" value={data.model} onChange={e => setData('model', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Catégorie</label>
                    <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="Berline">Berline</option>
                        <option value="Citadine">Citadine</option>
                        <option value="SUV">SUV</option>
                        <option value="Utilitaire">Utilitaire</option>
                        <option value="Luxe">Luxe</option>
                    </select>
                </div>
                <div>
    <label className="block mb-1 font-medium text-gray-700">Climatisation</label>
    <select 
        value={data.air_conditioning} 
        onChange={e => setData('air_conditioning', Number(e.target.value))} 
        className="w-full border border-gray-300 rounded p-2"
    >
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
    </select>
</div>

                {/* Ligne 2 */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Prix / Jour (MAD)</label>
                    <input type="number" value={data.daily_price} onChange={e => setData('daily_price', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Carburant</label>
                    <select value={data.fuel_type} onChange={e => setData('fuel_type', e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="Diesel">Diesel</option>
                        <option value="Essence">Essence</option>
                        <option value="Hybride">Hybride</option>
                        <option value="Electrique">Électrique</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Transmission</label>
                    <select value={data.transmission} onChange={e => setData('transmission', e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="Manuelle">Manuelle</option>
                        <option value="Automatique">Automatique</option>
                    </select>
                </div>

                {/* Ligne 3 : Les nouveaux champs bloquants */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Places</label>
                    <input type="number" value={data.seats} onChange={e => setData('seats', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Portes</label>
                    <input type="number" value={data.doors} onChange={e => setData('doors', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Climatisation</label>
                    <select value={data.air_cond} onChange={e => setData('air_cond', Number(e.target.value))} className="w-full border border-gray-300 rounded p-2">
                        <option value={1}>Oui</option>
                        <option value={0}>Non</option>
                    </select>
                </div>
               <div className="mb-4">
    <label className="block text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">
        Description du véhicule
    </label>
    <textarea 
        onChange={(e) => setData('description', e.target.value)}
        className="w-full bg-white border border-neutral-300 text-neutral-900 rounded-xl p-4 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all h-32 resize-none shadow-sm placeholder:text-neutral-400"
        placeholder="Ex: Le véhicule idéal pour vos trajets urbains..."
    />
</div>

                {/* Ligne 4 : Kilométrage et Statut */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Kilométrage actuel</label>
                    <input type="number" value={data.mileage} onChange={e => setData('mileage', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Prochaine maintenance</label>
                    <input type="number" value={data.next_maintenance_mileage} onChange={e => setData('next_maintenance_mileage', e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Statut initial</label>
                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="Disponible">Disponible</option>
                        <option value="En maintenance">En maintenance</option>
                        <option value="Loué">Loué</option>
                    </select>
                </div>

                {/* Ligne 5 : Image */}
                <div className="col-span-1 md:col-span-3 mt-2">
                    <label className="block mb-1 font-medium text-gray-700">Photo du véhicule</label>
                    <input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])} className="w-full border border-gray-300 rounded p-2 bg-gray-50" />
                </div>
            </div>

            <button type="submit" disabled={processing} className="bg-red-600 text-white font-bold px-4 py-3 rounded hover:bg-red-700 w-full transition mt-2">
                {processing ? 'Enregistrement...' : 'Ajouter à la flotte'}
            </button>
        </form>
    );
}