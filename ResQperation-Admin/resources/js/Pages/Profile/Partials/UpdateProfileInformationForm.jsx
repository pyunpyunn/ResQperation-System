import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
<<<<<<< HEAD
                <h2 className="text-lg font-semibold text-on-surface">
                    Profile Information
                </h2>

                <p className="mt-1 text-base text-on-surface/80">
=======
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
<<<<<<< HEAD
                        <p className="mt-2 text-base text-on-surface">
=======
                        <p className="mt-2 text-sm text-gray-800">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
<<<<<<< HEAD
                                className="text-base text-primary underline hover:text-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/10"
=======
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
<<<<<<< HEAD
                            <div className="mt-2 text-base font-semibold text-safe">
=======
                            <div className="mt-2 text-sm font-medium text-green-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
<<<<<<< HEAD
                        <p className="text-base text-on-surface/80">
=======
                        <p className="text-sm text-gray-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
