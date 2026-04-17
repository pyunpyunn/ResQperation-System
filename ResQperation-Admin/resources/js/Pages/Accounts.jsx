import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'all-accounts', label: 'All accounts' },
    { key: 'rescuers', label: 'Rescuers' },
    { key: 'officers', label: 'Officers' },
    { key: 'pending-validation', label: 'Pending validation' },
    { key: 'rbac-roles', label: 'RBAC roles' },
];

const pendingAccounts = [
    { id: 1, name: 'Juan dela Cruz', role: 'Rescuer' },
    { id: 2, name: 'Maria Santos', role: 'Officer' },
    { id: 3, name: 'Pedro Reyes', role: 'Rescuer' },
];

const rolesSummary = [
    { id: 1, title: 'Field Dispatcher', description: 'Dispatch, map view, GPS, field reports' },
    { id: 2, title: 'HQ Admin', description: 'All dispatcher + validate status, SitRep, escalate' },
    { id: 3, title: 'Barangay Officer', description: 'View-only + confirm household status' },
];

export default function Accounts() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Accounts
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        User management — validate registrations, assign roles, manage access.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="accounts.index"
        >
            <Head title="Accounts" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Total accounts</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">38</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Rescuers</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">24</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Officers</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">8</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Pending</p>
                        <p className="mt-4 text-3xl font-bold text-warning">6</p>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Pending account validation</h3>
                    <div className="mt-4 space-y-3">
                        {pendingAccounts.map((account) => (
                            <div key={account.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <span><span className="font-semibold text-on-surface">{account.name}</span> — {account.role}</span>
                                <div className="flex flex-wrap gap-2">
                                    <button className="btn btn-success">Approve</button>
                                    <button className="btn btn-danger">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">RBAC role summary</h3>
                    <div className="mt-4 space-y-3">
                        {rolesSummary.map((role) => (
                            <div key={role.id} className="list-row">
                                <span>{role.title}</span>
                                <span className="text-sm text-on-surface/80">{role.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
