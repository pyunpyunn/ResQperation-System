import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'broadcast', label: 'Broadcast' },
    { key: 'history', label: 'Alert history' },
    { key: 'status-types', label: 'Status types' },
];

export default function Alerts() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Alerts & broadcast
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Initiate disaster alerts and select which household statuses to collect.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="alerts.index"
        >
            <Head title="Alerts & Broadcast" />

            <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-on-surface">Initiate disaster broadcast</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-on-surface/80 mb-2">Disaster type</label>
                            <select className="w-full rounded-xl border border-surface-container-high bg-surface p-3 text-on-surface">
                                <option>Typhoon</option>
                                <option>Flood</option>
                                <option>Earthquake</option>
                                <option>Fire</option>
                                <option>Landslide</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-on-surface/80 mb-2">Target area</label>
                            <select className="w-full rounded-xl border border-surface-container-high bg-surface p-3 text-on-surface">
                                <option>All barangay</option>
                                <option>Purok 4</option>
                                <option>Sitio Mapayapa</option>
                                <option>Barangay Proper</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5 space-y-2 text-sm text-on-surface/80">
                        <p>Status types to collect from residents:</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <label className="status-collect"><input type="checkbox" defaultChecked /> SAFE</label>
                            <label className="status-collect"><input type="checkbox" defaultChecked /> UNSAFE</label>
                            <label className="status-collect"><input type="checkbox" defaultChecked /> EVACUATED</label>
                            <label className="status-collect"><input type="checkbox" defaultChecked /> NEED TO EVACUATE</label>
                            <label className="status-collect"><input type="checkbox" /> NEED MEDICAL</label>
                            <label className="status-collect"><input type="checkbox" /> STRANDED</label>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="big-btn big-btn-danger">Broadcast disaster alert</button>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Alert history</h3>
                    <div className="mt-4 space-y-3">
                        <div className="list-row"><span>Typhoon alert — All barangay</span><span className="text-[11px] text-on-surface/70">08:05 today</span></div>
                        <div className="list-row"><span>Flood warning — Purok 4</span><span className="text-[11px] text-on-surface/70">10:20 today</span></div>
                        <div className="list-row"><span>Typhoon alert — Sitio Mapayapa</span><span className="text-[11px] text-on-surface/70">10:22 today</span></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
