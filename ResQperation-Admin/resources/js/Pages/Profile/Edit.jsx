import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-surface-container-lowest p-6 shadow-ambient sm:rounded-[1.5rem] sm:p-10">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
