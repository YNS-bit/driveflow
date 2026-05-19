import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-white leading-tight uppercase tracking-widest"><span className="text-red-600">MON PROFILE</span> Profil</h2>}
        >
            <Head title="Profil - DriveFlow" />

            <div className="py-12 bg-gray-950 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Bloc Informations Générales */}
                    <div className="p-6 sm:p-8 bg-gray-900 border border-gray-800 shadow-2xl sm:rounded-2xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Bloc Sécurité & Mot de passe */}
                    <div className="p-6 sm:p-8 bg-gray-900 border border-gray-800 shadow-2xl sm:rounded-2xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Bloc Zone Dangereuse */}
                    <div className="p-6 sm:p-8 bg-red-950/20 border border-red-900/50 shadow-2xl sm:rounded-2xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}