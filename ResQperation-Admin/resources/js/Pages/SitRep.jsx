import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'generate-sitrep', label: 'Generate SitRep' },
    { key: 'previous-reports', label: 'Previous reports' },
    { key: 'escalation-log', label: 'Escalation log' },
];

const previousReports = [
    { id: 1, title: 'SitRep #3 — Typhoon Carina', status: 'Escalated', time: '14:22' },
    { id: 2, title: 'SitRep #2 — Typhoon Carina', status: 'Filed', time: '11:05' },
    { id: 3, title: 'SitRep #1 — Typhoon Carina', status: 'Filed', time: '08:30' },
    { id: 4, title: 'SitRep #1 — Flooding — Sitio Mapayapa', status: 'Filed', time: '10:55' },
];

const escalationEvents = [
    { id: 1, title: 'Elevated alert to city operations', owner: 'admin_01', time: '14:22' },
    { id: 2, title: 'Field team requested medical convoy', owner: 'dispatcher_02', time: '13:10' },
    { id: 3, title: 'Household support priority updated', owner: 'officer_03', time: '12:05' },
];

export default function SitRep() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        SitRep & escalation
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Structured situation reports and city-level escalation forwarding.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="sitrep.index"
        >
            <Head title="SitRep & Escalation" />

            <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Generate situation report</h3>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-on-surface/80 mb-2">Incident</label>
                            <select className="w-full rounded-xl border border-surface-container-high bg-surface p-3 text-on-surface">
                                <option>Typhoon Carina — Purok 4</option>
                                <option>Flooding — Sitio Mapayapa</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-on-surface/80 mb-2">Report type</label>
                            <select className="w-full rounded-xl border border-surface-container-high bg-surface p-3 text-on-surface">
                                <option>SitRep (standard)</option>
                                <option>Initial report</option>
                                <option>Final report</option>
                            </select>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-on-surface/80">Auto-aggregated data will include: household counts, team deployment, severity zones, request status.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="big-btn big-btn-info">Generate SitRep</button>
                        <button className="big-btn big-btn-danger">Escalate to city level</button>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Previous SitReps</h3>
                    <div className="mt-4 space-y-3">
                        {previousReports.map((report) => (
                            <div key={report.id} className="list-row">
                                <span>{report.title}</span>
                                <span className="flex items-center gap-2">
                                    <span className="pill pill-info">{report.status}</span>
                                    <span className="text-[11px] text-on-surface/70">{report.time}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Escalation log</h3>
                    <div className="mt-4 space-y-3">
                        {escalationEvents.map((event) => (
                            <div key={event.id} className="list-row">
                                <span>{event.title}</span>
                                <span className="text-[11px] text-on-surface/70">{event.owner} · {event.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
