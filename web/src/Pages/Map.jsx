import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'all-layers', label: 'All layers' },
    { key: 'household-layer', label: 'Household layer' },
    { key: 'responder-gps', label: 'Responder GPS' },
    { key: 'evac-sites', label: 'Evac sites' },
    { key: 'severity-zones', label: 'Severity zones' },
];

export default function Map() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        HQ live map
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Multi-layer situational awareness map — toggle layers per operational need.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="map.index"
            showDisasterBar={true}
        >
            <Head title="HQ Live Map" />

            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    <button className="layer-toggle" style={{ background: '#e6f1fb', color: '#185fa5' }}>Households</button>
                    <button className="layer-toggle" style={{ background: '#eaf3de', color: '#3b6d11' }}>Responder GPS</button>
                    <button className="layer-toggle" style={{ background: '#faeeda', color: '#854f0b' }}>Evac sites</button>
                    <button className="layer-toggle" style={{ background: '#fcebeb', color: '#a32d2d' }}>Severity zones</button>
                    <button className="layer-toggle" style={{ background: '#f5f4f0', color: '#5f5e5a' }}>Routes</button>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <div className="map-placeholder" style={{ height: '220px' }}>
                        <div>
                            <div className="mp-title">Live GIS map viewport</div>
                            <div className="mp-sub">Leaflet / MapBox · All layers toggleable · Filter by purok/sitio</div>
                            <div className="mp-sub">Click household pins · Click evac sites · Click responder dots</div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Layer legend</h3>
                        <div className="mt-4 space-y-3">
                            <div className="list-row"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span className="legend-dot" style={{ background: '#a32d2d', opacity: '.6' }} /></span>Unsafe household</div>
                            <div className="list-row"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span className="legend-dot" style={{ background: '#3b6d11', opacity: '.6' }} /></span>Safe / Evacuated</div>
                            <div className="list-row"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span className="legend-dot" style={{ background: '#378ADD' }} /></span>Responder team (live GPS)</div>
                            <div className="list-row"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span className="legend-sq" style={{ background: '#faeeda', border: '1px solid #854f0b' }} /></span>Evac site</div>
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <h3 className="text-lg font-semibold text-on-surface">Evac site status</h3>
                        <div className="mt-4 space-y-3">
                            <div className="list-row"><span>Covered Court A</span><span className="pill pill-success">Available</span></div>
                            <div className="list-row"><span>Barangay Hall</span><span className="pill pill-danger">Full</span></div>
                            <div className="list-row"><span>School Gymnasium</span><span className="pill pill-warn">Partial</span></div>
                            <div className="list-row"><span>Elementary School</span><span className="pill pill-success">Available</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
