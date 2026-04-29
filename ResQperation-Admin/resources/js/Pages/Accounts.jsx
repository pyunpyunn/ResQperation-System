import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Accounts({
    pageTitle = 'Accounts',
    pageDescription = 'Account oversight and role-based access management.',
    summaryCards = [],
    accountGroups = [],
    roleMatrix = [],
    securityNotes = [],
}) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        {pageTitle}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        {pageDescription}
                    </p>
                </div>
            }
        >
            <Head title={pageTitle} />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    {summaryCards.map((card) => (
                        <div key={card.label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                            <p className="text-label-md uppercase text-on-surface/80">{card.label}</p>
                            <p className="mt-4 text-3xl font-bold text-on-surface">{card.value}</p>
                        </div>
                    ))}
                </div>

                {accountGroups.map((group) => (
                    <div key={group.key} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-on-surface">{group.title}</h3>
                                <p className="mt-1 text-sm text-on-surface/80">{group.description}</p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                {group.items.length} records
                            </span>
                        </div>
                        <div className="mt-5 space-y-3">
                            {group.items.map((account) => (
                                <div key={`${group.key}-${account.id}`} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <p className="font-semibold text-on-surface">{account.name}</p>
                                            <p className="mt-1 text-sm text-on-surface/70">{account.role}</p>
                                        </div>
                                        <div className="grid gap-2 text-sm text-on-surface/80 sm:grid-cols-2 lg:min-w-[24rem]">
                                            <span>Credential: {account.credential}</span>
                                            <span>Detail: {account.detail}</span>
                                        </div>
                                        <span className="rounded-full bg-safe/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-safe">
                                            {account.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {group.items.length === 0 && (
                                <div className="rounded-[1.5rem] bg-surface-container-lowest p-4 text-sm text-on-surface/70">
                                    No accounts are available in this scope yet.
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Role access summary</h3>
                        <div className="mt-4 space-y-3">
                            {roleMatrix.map((role) => (
                                <div key={role.title} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <p className="font-semibold text-on-surface">{role.title}</p>
                                    <p className="mt-2 text-sm text-on-surface/80">{role.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Security controls</h3>
                        <div className="mt-4 space-y-3">
                            {securityNotes.map((note) => (
                                <div key={note.label} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex flex-col gap-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface/60">{note.label}</p>
                                    <p className="text-sm text-on-surface/85">{note.value}</p>
                                </div>
                            ))}
                            {securityNotes.length === 0 && (
                                <div className="rounded-[1.5rem] bg-surface-container-lowest p-4 text-sm text-on-surface/70">
                                    Security notes will appear here once account policies are configured.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
