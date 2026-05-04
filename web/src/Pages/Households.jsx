import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'all-households', label: 'All households' },
    { key: 'by-purok', label: 'By purok / sitio' },
    { key: 'status-filter', label: 'Status filter' },
    { key: 'state-history', label: 'State history' },
];

const summary = [
    { label: 'Total households', value: 580 },
    { label: 'Unsafe', value: 348, variant: 'danger' },
    { label: 'Safe (confirmed)', value: 102, variant: 'success' },
    { label: 'Evacuated', value: 87, variant: 'info' },
];

const sampleHouseholds = [
    { id: 1, name: 'Santos, J. — #12', status: 'Safe', confirmed: 'Pending', variant: 'success' },
    { id: 2, name: 'Reyes, M. — #15', status: 'Unsafe', confirmed: 'Unsafe', variant: 'danger' },
    { id: 3, name: 'Cruz, A. — #22', status: 'Evacuated', confirmed: 'Confirmed', variant: 'info' },
    { id: 4, name: 'Bautista, R. — #31', status: 'Need to evacuate', confirmed: 'Pending', variant: 'warn' },
];

export default function Households() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Households
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Household status monitoring — confirm and update per HQ validation only.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="households.index"
            showDisasterBar={true}
        >
            <Head title="Households" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    {summary.map((item) => (
                        <div key={item.label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                            <p className="text-label-md uppercase text-on-surface/80">{item.label}</p>
                            <p className={`mt-4 text-3xl font-bold ${item.variant === 'danger' ? 'text-critical' : item.variant === 'success' ? 'text-success' : item.variant === 'info' ? 'text-info' : 'text-on-surface'}`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Household list — Purok 4</h3>
                    <div className="mt-4 space-y-3">
                        <div className="list-row" style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                            <span>Household</span><span>Self-reported</span><span>HQ confirmed</span><span>Action</span>
                        </div>
                        {sampleHouseholds.map((household) => (
                            <div key={household.id} className="list-row">
                                <span>{household.name}</span>
                                <span className={`pill pill-${household.variant}`}>{household.status}</span>
                                <span className={`pill pill-${household.variant === 'info' ? 'success' : household.variant}`}>{household.confirmed}</span>
                                {household.variant === 'warn' || household.variant === 'success' ? (
                                    <button className="btn btn-info">Confirm</button>
                                ) : (
                                    <span className="pill pill-gray">—</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="hint-box">Status is auto-set to UNSAFE when a disaster event is triggered. HQ must confirm before status changes to SAFE or any other state.</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
