import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

<<<<<<< HEAD
            <div className="mb-4 text-base text-on-surface/80">
=======
            <div className="mb-4 text-sm text-gray-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
<<<<<<< HEAD
                <div className="mb-4 text-base font-semibold text-safe">
=======
                <div className="mb-4 text-sm font-medium text-green-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
<<<<<<< HEAD
                        className="text-base text-primary underline hover:text-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/10"
=======
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
