import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    totalHouseholds = 348,
    totalResponders = 24,
    activeDisasters = 2,
    openRequests = 5,
    recentHouseholds = [],
    recentResponders = [],
    activeEvents = [],
    statusBreakdown = [],
}) {
    const incidentEvents = activeEvents.length > 0 ? activeEvents : [
        { id: 1, label: 'Typhoon Carina — Purok 4', level: 'Critical' },
        { id: 2, label: 'Flooding — Sitio Mapayapa', level: 'High' },
    ];

    const deploymentStatus = [
        { id: 1, team: 'Team Alpha', status: 'En route', style: 'danger' },
        { id: 2, team: 'Team Bravo', status: 'On-site', style: 'success' },
        { id: 3, team: 'Team Charlie', status: 'Standby', style: 'gray' },
        { id: 4, team: 'Team Delta', status: 'On-site', style: 'success' },
    ];

    const breakdown = statusBreakdown.length > 0 ? statusBreakdown : [
        { label: 'Unsafe', value: 348, variant: 'danger' },
        { label: 'Safe (HQ confirmed)', value: 102, variant: 'success' },
        { label: 'Evacuated', value: 87, variant: 'info' },
        { label: 'Need to evacuate', value: 43, variant: 'warn' },
    ];

    const incoming = [
        { id: 1, label: 'Personnel × 3 — EvaTrack', status: 'Pending', variant: 'warn' },
        { id: 2, label: 'Medical supplies — EvaTrack', status: 'Approved', variant: 'info' },
        { id: 3, label: 'Equipment × 2 — EvaTrack', status: 'Forwarded', variant: 'gray' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Real-time operational overview for active disaster event.
                    </p>
                </div>
            }
            tabs={[
                { key: 'overview', label: 'Overview' },
                { key: 'incidents', label: 'Incidents' },
                { key: 'households', label: 'Households' },
                { key: 'responders', label: 'Responders' },
                { key: 'requests', label: 'Requests' },
            ]}
            tabRoute="dashboard"
            showDisasterBar={true}
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-4">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Active incidents</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">{activeDisasters}</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Unsafe households</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">{totalHouseholds}</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Deployed teams</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">6 / 8</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Pending requests</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">{openRequests}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-on-surface">Active incident events</h3>
                                <p className="mt-1 text-sm text-on-surface/80">Current incidents requiring command attention.</p>
                            </div>
                            <Link
                                href={route('disasters.index')}
                                className="text-sm font-semibold text-primary hover:text-primary/80"
                            >
                                View incidents
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {incidentEvents.map((event) => (
                                <div key={event.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-semibold text-on-surface">{event.label}</p>
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                            event.level === 'Critical'
                                                ? 'bg-critical/10 text-critical'
                                                : 'bg-warning/10 text-warning'
                                        }`}>
                                            {event.level}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Team deployment status</h3>
                        <div className="mt-5 space-y-4">
                            {deploymentStatus.map((team) => (
                                <div key={team.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-semibold text-on-surface">{team.team}</p>
                                        <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                            team.style === 'danger'
                                                ? 'bg-critical/10 text-critical'
                                                : team.style === 'success'
                                                ? 'bg-success/10 text-success'
                                                : 'bg-surface-container-low/80 text-on-surface/80'
                                        }`}>
                                            {team.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Household status breakdown</h3>
                        <div className="mt-5 space-y-4">
                            {breakdown.map((item) => (
                                <div key={item.label} className="rounded-[1.5rem] bg-surface-container-lowest p-4 flex items-center justify-between gap-4">
                                    <span className="text-on-surface/80">{item.label}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                        item.variant === 'danger'
                                            ? 'bg-critical/10 text-critical'
                                            : item.variant === 'success'
                                            ? 'bg-success/10 text-success'
                                            : item.variant === 'info'
                                            ? 'bg-info/10 text-info'
                                            : 'bg-warning/10 text-warning'
                                    }`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Incoming requests</h3>
                        <div className="mt-5 space-y-4">
                            {incoming.map((request) => (
                                <div key={request.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-semibold text-on-surface">{request.label}</p>
                                        <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${
                                            request.variant === 'warn'
                                                ? 'bg-warning/10 text-warning'
                                                : request.variant === 'info'
                                                ? 'bg-info/10 text-info'
                                                : 'bg-success/10 text-success'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
