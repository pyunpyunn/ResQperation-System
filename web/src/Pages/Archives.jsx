import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'past-incidents', label: 'Past incidents' },
    { key: 'sitrep-archive', label: 'SitRep archive' },
    { key: 'audit-trail', label: 'Audit trail' },
    { key: 'export', label: 'Export' },
];

const archiveItems = [
    { id: 1, title: 'Typhoon Odette — Dec 2024', state: 'Archived', variant: 'gray', note: 'Duration: 14h · Teams: 8 · Households affected: 423 · SitReps: 7' },
    { id: 2, title: 'Flooding — Oct 2024', state: 'Archived', variant: 'gray', note: 'Duration: 6h · Teams: 4 · Households affected: 118 · SitReps: 3' },
];

const auditItems = [
    { id: 1, title: 'Team Alpha assigned — Purok 4', detail: 'dispatcher_01 · 10:44' },
    { id: 2, title: 'SitRep #3 generated + escalated', detail: 'admin_01 · 14:22' },
    { id: 3, title: 'Request #4 approved — EvaTrack', detail: 'admin_01 · 09:15' },
    { id: 4, title: 'Household #12 status confirmed SAFE', detail: 'officer_02 · 11:03' },
];

export default function Archives() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Archives
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Completed incident documentation, exported reports, full audit trail.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="archives.index"
        >
            <Head title="Archives" />

            <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Past incidents</h3>
                    <div className="mt-4 space-y-3">
                        {archiveItems.map((item) => (
                            <div key={item.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="font-semibold text-on-surface">{item.title}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="pill pill-gray">{item.state}</span>
                                        <button className="btn btn-ghost">View</button>
                                        <button className="btn btn-info">Export</button>
                                    </div>
                                </div>
                                <p className="text-sm text-on-surface/80 mt-2">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Audit trail (recent)</h3>
                    <div className="mt-4 space-y-3">
                        {auditItems.map((item) => (
                            <div key={item.id} className="list-row">
                                <span>{item.title}</span>
                                <span className="text-[11px] text-on-surface/70">{item.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
