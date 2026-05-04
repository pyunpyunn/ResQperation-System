import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SuperAdminDashboard({
    summaryCards = [],
    hqAdmins = [],
    responderAccounts = [],
    tokenOverview = [],
    securityChecklist = [],
}) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Super-Admin Oversight
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Department-wide account visibility for HQ personnel, responder mobile users, and active access tokens.
                    </p>
                </div>
            }
        >
            <Head title="Super Admin Dashboard" />

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-4">
                    {summaryCards.map((card) => (
                        <div key={card.label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                            <p className="text-label-md uppercase text-on-surface/80">{card.label}</p>
                            <p className="mt-4 text-3xl font-bold text-on-surface">{card.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-on-surface">HQ admin personnel</h3>
                                <p className="mt-1 text-sm text-on-surface/80">
                                    Accounts that can enter the HQ or command center web application.
                                </p>
                            </div>
                            <Link
                                href={route('super-admin.accounts')}
                                className="text-sm font-semibold text-primary hover:text-primary/80"
                            >
                                View all accounts
                            </Link>
                        </div>
                        <div className="mt-5 space-y-3">
                            {hqAdmins.map((account) => (
                                <div key={account.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <p className="font-semibold text-on-surface">{account.name}</p>
                                            <p className="mt-1 text-sm text-on-surface/75">{account.role}</p>
                                        </div>
                                        <div className="text-sm text-on-surface/75">
                                            <p>ID: {account.credential}</p>
                                            <p>{account.detail}</p>
                                        </div>
                                        <span className="rounded-full bg-safe/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-safe">
                                            {account.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Access token overview</h3>
                        <div className="mt-5 space-y-3">
                            {tokenOverview.map((item) => (
                                <div key={item.label} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex items-center justify-between gap-4">
                                    <span className="text-sm text-on-surface/80">{item.label}</span>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Responder mobile accounts</h3>
                        <p className="mt-1 text-sm text-on-surface/80">
                            Quick visibility into the on-site rescuer accounts currently represented in the system.
                        </p>
                        <div className="mt-5 space-y-3">
                            {responderAccounts.map((account) => (
                                <div key={account.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-on-surface">{account.name}</p>
                                            <p className="mt-1 text-sm text-on-surface/75">{account.role}</p>
                                        </div>
                                        <div className="text-sm text-on-surface/75">
                                            <p>{account.credential}</p>
                                            <p>{account.detail}</p>
                                        </div>
                                        <span className="rounded-full bg-safe/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-safe">
                                            {account.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Authentication safeguards</h3>
                        <div className="mt-5 space-y-3">
                            {securityChecklist.map((item) => (
                                <div key={item} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex gap-3">
                                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                        ✓
                                    </span>
                                    <p className="text-sm leading-6 text-on-surface/85">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
