import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const incidentSummary = [
    { label: 'Open', value: 2, variant: 'danger' },
    { label: 'Critical zones', value: 1, variant: 'danger' },
    { label: 'High zones', value: 3, variant: 'warn' },
    { label: 'Archived', value: 14, variant: 'info' },
];

const activeIncidents = [
    { id: 1, title: 'Typhoon Carina — Purok 4', level: 'Critical', note: 'Opened 08:14 · 6 teams deployed · 142 unsafe households · SitRep #3 generated' },
    { id: 2, title: 'Flooding — Sitio Mapayapa', level: 'High', note: 'Opened 10:32 · 2 teams deployed · 87 unsafe households · SitRep #1 generated' },
];

const severityZones = [
    { id: 1, label: 'Purok 4, Zone A', status: 'Critical' },
    { id: 2, label: 'Purok 4, Zone B', status: 'High' },
    { id: 3, label: 'Sitio Mapayapa', status: 'High' },
    { id: 4, label: 'Barangay Proper', status: 'Medium' },
];

export default function Disasters() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Incidents
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Incident lifecycle management — open, monitor, escalate, close.
                    </p>
                </div>
            }
            tabs={[
                { key: 'all-incidents', label: 'All incidents' },
                { key: 'manage-active', label: 'Manage active' },
                { key: 'severity-zones', label: 'Severity zones' },
                { key: 'escalation', label: 'Escalation' },
                { key: 'archive', label: 'Archive' },
            ]}
            tabRoute="disasters.index"
            showDisasterBar={true}
        >
            <Head title="Incidents" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    {incidentSummary.map((item) => (
                        <div key={item.label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                            <p className="text-label-md uppercase text-on-surface/80">{item.label}</p>
                            <p className={`mt-4 text-3xl font-bold text-on-surface ${
                                item.variant === 'danger'
                                    ? 'text-critical'
                                    : item.variant === 'warn'
                                    ? 'text-warning'
                                    : item.variant === 'info'
                                    ? 'text-info'
                                    : 'text-on-surface'
                            }`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Active incidents</h3>
                        <div className="mt-4 space-y-4">
                            {activeIncidents.map((incident) => (
                                <div key={incident.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-on-surface">{incident.title}</p>
                                            <p className="text-sm text-on-surface/80">{incident.note}</p>
                                        </div>
                                        <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                            incident.level === 'Critical'
                                                ? 'bg-critical/10 text-critical'
                                                : 'bg-warning/10 text-warning'
                                        }`}>
                                            {incident.level}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Severity zone assignment</h3>
                        <div className="mt-4 space-y-3">
                            {severityZones.map((zone) => (
                                <div key={zone.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex items-center justify-between gap-4">
                                    <span>{zone.label}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                        zone.status === 'Critical'
                                            ? 'bg-critical/10 text-critical'
                                            : zone.status === 'High'
                                            ? 'bg-warning/10 text-warning'
                                            : 'bg-info/10 text-info'
                                    }`}>
                                        {zone.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
