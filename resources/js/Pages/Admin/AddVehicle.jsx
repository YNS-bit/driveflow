import { useForm } from '@inertiajs/react';

export default function AddVehicleForm() {
    // Initialisation du formulaire : tous les champs obligatoires pour MySQL sont là
    const { data, setData, post, processing, errors, reset } = useForm({
        brand: '',
        model: '',
        type: 'Berline',         // Obligatoire pour MySQL
        daily_price: '',         // Correspond au nom de colonne 'daily_price'
        transmission: 'Manuelle',
        fuel_type: 'Diesel',
        seats: 5,
        status: 'Disponible',    // Obligatoire pour MySQL
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/vehicles', {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Ajouter un nouveau véhicule</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Marque */}
                <div>
                    <label className="block mb-1">Marque</label>
                    <input type="text" value={data.brand} onChange={e => setData('brand', e.target.value)} className="w-full border rounded p-2" required />
                    {errors.brand && <div className="text-red-500 text-sm mt-1">{errors.brand}</div>}
                </div>

                {/* Modèle */}
                <div>
                    <label className="block mb-1">Modèle</label>
                    <input type="text" value={data.model} onChange={e => setData('model', e.target.value)} className="w-full border rounded p-2" required />
                </div>

                {/* Type */}
                <div>
                    <label className="block mb-1">Type</label>
                    <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full border rounded p-2">
                        <option value="Berline">Berline</option>
                        <option value="SUV">SUV</option>
                        <option value="Luxe">Luxe</option>
                    </select>
                </div>

                {/* Prix / Jour */}
                <div>
                    <label className="block mb-1">Prix / Jour (MAD)</label>
                    <input type="number" value={data.daily_price} onChange={e => setData('daily_price', e.target.value)} className="w-full border rounded p-2" required />
                    {errors.daily_price && <div className="text-red-500 text-sm mt-1">{errors.daily_price}</div>}
                </div>

                {/* Carburant */}
                <div>
                    <label className="block mb-1">Carburant</label>
                    <select value={data.fuel_type} onChange={e => setData('fuel_type', e.target.value)} className="w-full border rounded p-2">
                        <option value="Diesel">Diesel</option>
                        <option value="Essence">Essence</option>
                        <option value="Hybride">Hybride</option>
                    </select>
                </div>

                {/* Statut */}
                <div>
                    <label className="block mb-1">Statut</label>
                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border rounded p-2">
                        <option value="Disponible">Disponible</option>
                        <option value="Indisponible">Indisponible</option>
                    </select>
                </div>
            </div>

            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                {processing ? 'Enregistrement...' : 'Ajouter le véhicule'}
            </button>
        </form>
    );
}