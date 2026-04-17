<<<<<<< HEAD
﻿import Checkbox from '@/Components/Checkbox';
=======
import Checkbox from '@/Components/Checkbox';
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
<<<<<<< HEAD
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
=======
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
<<<<<<< HEAD
            <Head title="Admin Login" />

            <div className="mb-6 rounded-[1.75rem] bg-surface-container-low p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-on-surface/80">HQ Access</p>
                <h1 className="mt-3 text-3xl font-bold text-on-surface">ResQperation Command Center</h1>
                <p className="mt-2 text-sm text-on-surface/80">Login with your administrator credentials to access the HQ dashboard.</p>
            </div>

            {status && (
                <div className="mb-4 rounded-[1.5rem] bg-safe/10 p-4 text-base font-semibold text-safe">
=======
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                    {status}
                </div>
            )}

<<<<<<< HEAD
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="login" value="Email or username" />

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        value={data.login}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('login', e.target.value)}
                    />

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div>
=======
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

<<<<<<< HEAD
                <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-base text-on-surface/80">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <a
                            href={route('password.request')}
                            className="text-sm font-semibold text-primary hover:text-primary/80"
                        >
                            Forgot password?
                        </a>
                    )}
                </div>

                <PrimaryButton className="w-full" disabled={processing}>
                    Log in
                </PrimaryButton>
=======
                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
            </form>
        </GuestLayout>
    );
}
