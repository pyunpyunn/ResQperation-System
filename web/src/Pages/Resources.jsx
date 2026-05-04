import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'evac-sites', label: 'Evacuation sites' },
    { key: 'supply-inventory', label: 'Supply inventory' },
    { key: 'equipment', label: 'Equipment' },
];

const siteStatus = [
    { id: 1, label: 'Covered Court A', state: 'Available', variant: 'success', note: 'Capacity: 200 · Current: 45 · Route: Purok 4 via Main St. · Open' },
    { id: 2, label: 'Barangay Hall', state: 'Full', variant: 'danger', note: 'Capacity: 80 · Current: 80 · Route: closed — overflow redirect to Covered Court A' },
    { id: 3, label: 'School Gymnasium', state: 'Partial', variant: 'warn', note: 'Capacity: 300 · Current: 190 · Route: open' },
    { id: 4, label: 'Elementary School', state: 'Available', variant: 'success', note: 'Capacity: 150 · Current: 12 · Route: open' },
];

export default function Resources() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Resources & evac
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Evacuation site capacity, availability, and route status.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="resources.index"
        >
            <Head title="Resources & Evac" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Total evac sites</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">5</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Available</p>
                        <p className="mt-4 text-3xl font-bold text-success">3</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Full</p>
                        <p className="mt-4 text-3xl font-bold text-critical">1</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Partial</p>
                        <p className="mt-4 text-3xl font-bold text-warning">1</p>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Evacuation sites</h3>
                    <div className="mt-4 space-y-4">
                        {siteStatus.map((site) => (
                            <div key={site.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="font-semibold text-on-surface">{site.label}</p>
                                        <p className="text-sm text-on-surface/80">{site.note}</p>
                                    </div>
                                    <span className={`pill pill-${site.variant}`}>{site.state}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
