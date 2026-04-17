import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'all-responders', label: 'All responders' },
    { key: 'teams', label: 'Teams' },
    { key: 'gps-history', label: 'GPS history' },
    { key: 'field-reports', label: 'Field reports' },
];

const respondersSummary = [
    { label: 'Total responders', value: 24 },
    { label: 'On-site', value: 14, variant: 'success' },
    { label: 'En route', value: 6, variant: 'warn' },
    { label: 'Standby', value: 4 },
];

const teamStatus = [
    { id: 1, name: 'Team Alpha', status: 'En route', variant: 'danger', note: 'Last GPS: 10:54:22 · 0.3km from destination' },
    { id: 2, name: 'Team Bravo', status: 'On-site', variant: 'success', note: 'Last GPS: 10:55:01 · Active field report submitted' },
    { id: 3, name: 'Team Delta', status: 'On-site', variant: 'success', note: 'Last GPS: 10:53:30 · Secured perimeter' },
    { id: 4, name: 'Team Charlie', status: 'Standby', variant: 'gray', note: 'Ready for assignment from HQ' },
];

export default function Responders() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Responders
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Monitor all rescue team members — live positions, field updates, team status.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="responders.index"
            showDisasterBar={true}
        >
            <Head title="Responders" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    {respondersSummary.map((item) => (
                        <div key={item.label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                            <p className="text-label-md uppercase text-on-surface/80">{item.label}</p>
                            <p className={`mt-4 text-3xl font-bold ${
                                item.variant === 'success' ? 'text-success' : item.variant === 'warn' ? 'text-warning' : 'text-on-surface'
                            }`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Team roster & live status</h3>
                    <div className="mt-4 space-y-4">
                        {teamStatus.map((team) => (
                            <div key={team.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="font-semibold text-on-surface">{team.name}</p>
                                        <p className="text-sm text-on-surface/80">{team.note}</p>
                                    </div>
                                    <span className={`pill pill-${team.variant}`}>{team.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="gps-warning">GPS signal lost: Responder #07 (Team Alpha) — Last known position: 10:51:08 at Purok 4 entry point</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
