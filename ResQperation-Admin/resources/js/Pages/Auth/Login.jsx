import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
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
            <Head title="Admin Login" />

            <div className="mb-6 rounded-[1.75rem] bg-surface-container-low p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-on-surface/80">HQ Access</p>
                <h1 className="mt-3 text-3xl font-bold text-on-surface">ResQperation Command Center</h1>
                <p className="mt-2 text-sm text-on-surface/80">Login with your administrator credentials to access the HQ dashboard.</p>
            </div>

            {status && (
                <div className="mb-4 rounded-[1.5rem] bg-safe/10 p-4 text-base font-semibold text-safe">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

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

                <div>
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
            </form>
        </GuestLayout>
    );
}
