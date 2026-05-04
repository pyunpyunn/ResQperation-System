import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

const flowSteps = [
    'Enter your administrator ID and password in the browser.',
    'The server verifies the credentials and automatically detects the access role.',
    'A signed access token is issued for the authenticated browser session.',
    'Protected HQ pages validate the token before command center data is rendered.',
];

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login_id: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Secure Admin Login" />

            <div className="mb-6 rounded-[1.75rem] bg-surface-container-low p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-on-surface/80">Secure HQ Access</p>
                <h1 className="mt-3 text-3xl font-bold text-on-surface">ResQperation Command Center</h1>
                <p className="mt-2 text-sm text-on-surface/80">
                    Sign in with your administrator ID. The system verifies your credentials,
                    detects your role automatically, and issues a protected browser token.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-[1.5rem] bg-safe/10 p-4 text-base font-semibold text-safe">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="login_id" value="Administrator ID" />

                    <TextInput
                        id="login_id"
                        type="text"
                        name="login_id"
                        value={data.login_id}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('login_id', e.target.value)}
                    />

                    <InputError message={errors.login_id} className="mt-2" />
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

                <div className="rounded-[1.5rem] bg-surface-container-lowest p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-on-surface/70">
                        Authentication Flow
                    </p>
                    <div className="mt-4 space-y-3">
                        {flowSteps.map((step, index) => (
                            <div key={step} className="flex gap-3">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    {index + 1}
                                </span>
                                <p className="text-sm leading-6 text-on-surface/80">{step}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-on-surface/70">
                        Temporary development credentials have been seeded for the super-admin and HQ admin roles.
                    </p>
                </div>

                <PrimaryButton className="w-full" disabled={processing}>
                    Log in
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
