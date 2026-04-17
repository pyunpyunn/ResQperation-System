import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'tactical-panel', label: 'Tactical panel' },
    { key: 'route-assignment', label: 'Route assignment' },
    { key: 'team-status', label: 'Team status' },
    { key: 'gps-tracking', label: 'GPS tracking' },
];

export default function Dispatch() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Dispatch & routing
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Manually assign and route rescue teams to affected areas.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="dispatch.index"
            showDisasterBar={true}
        >
            <Head title="Dispatch & Routing" />

            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Multi-layer GIS map viewport</h3>
                    <p className="mt-2 text-sm text-on-surface/80">Households · Teams · Evac sites · Severity zones</p>
                    <div className="mt-6 rounded-[1.5rem] bg-surface-container-lowest p-6">
                        <div className="map-placeholder">
                            <div>
                                <div className="mp-title">Multi-layer GIS map viewport</div>
                                <div className="mp-sub">Households · Teams · Evac sites · Severity zones</div>
                                <div className="mp-sub">Click area on map to assign selected team</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Tactical panel</h3>
                    <p className="mt-2 text-sm text-on-surface/80">Select a team and assign a route on the map.</p>
                    <div className="mt-6 space-y-4">
                        <div className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                            <div className="list-row"><span>Team Alpha</span><span className="pill pill-danger">En route P4</span></div>
                            <div className="hint-box">Select a team + click a purok/area on the map to assign route.</div>
                        </div>
                        <div className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                            <div className="list-row"><span>Team Charlie</span><span className="pill pill-gray">Standby</span></div>
                            <div className="list-row"><span className="text-sm text-on-surface/80">Ready for assignment</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                <h3 className="text-lg font-semibold text-on-surface">Current route assignments</h3>
                <div className="mt-4 space-y-3">
                    <div className="list-row"><span>Team Alpha → Purok 4, Zone A</span><span className="pill pill-danger">Critical</span></div>
                    <div className="list-row"><span>Team Bravo → Purok 4, Zone B</span><span className="pill pill-warn">High</span></div>
                    <div className="list-row"><span>Team Delta → Sitio Mapayapa</span><span className="pill pill-warn">High</span></div>
                    <div className="list-row"><span>Team Charlie — unassigned</span><span className="pill pill-gray">Standby</span></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
