import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
<<<<<<< HEAD
                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
=======
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

<<<<<<< HEAD
                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
=======
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
