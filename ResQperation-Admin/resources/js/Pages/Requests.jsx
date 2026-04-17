import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const tabs = [
    { key: 'all-requests', label: 'All requests' },
    { key: 'pending-validation', label: 'Pending validation' },
    { key: 'approved', label: 'Approved' },
    { key: 'forwarded', label: 'Forwarded' },
    { key: 'completed', label: 'Completed' },
];

const requestsData = [
    { id: 1, label: 'Personnel × 3 — EvaTrack', status: 'Pending', badge: 'warn', details: 'Received 10:40 · Request type: personnel · Awaiting HQ validation' },
    { id: 2, label: 'Medical supplies — EvaTrack', status: 'Forwarded', badge: 'info', details: 'Approved 09:15 · Forwarded to TrackingAid 09:18 · Tracking active' },
    { id: 3, label: 'Equipment × 2 — EvaTrack', status: 'Completed', badge: 'success', details: 'Delivered 09:45 · Mission complete' },
    { id: 4, label: 'Rescue boat × 1 — EvaTrack · Flooding', status: 'Pending', badge: 'warn', details: 'Awaiting water route clearance' },
];

export default function Requests() {
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const tabKey = pageUrl?.searchParams.get('tab') || tabs[0].key;
    const activeTab = tabs.find((tab) => tab.key === tabKey)?.label || tabs[0].label;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-on-surface">
                        Requests
                    </h2>
                    <p className="mt-1 text-sm text-on-surface/80">
                        Incoming requests from EvaTrack — validate, approve, forward to TrackingAid.
                    </p>
                </div>
            }
            tabs={tabs}
            tabRoute="requests.index"
        >
            <Head title="Requests" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Total</p>
                        <p className="mt-4 text-3xl font-bold text-on-surface">12</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Pending</p>
                        <p className="mt-4 text-3xl font-bold text-warning">5</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Approved</p>
                        <p className="mt-4 text-3xl font-bold text-info">3</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                        <p className="text-label-md uppercase text-on-surface/80">Completed</p>
                        <p className="mt-4 text-3xl font-bold text-success">4</p>
                    </div>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                    <h3 className="text-lg font-semibold text-on-surface">Incoming request queue</h3>
                    <div className="mt-4 space-y-4">
                        {requestsData.map((request) => (
                            <div key={request.id} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="font-semibold text-on-surface">{request.label}</p>
                                        <p className="text-sm text-on-surface/80 mt-1">{request.details}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`pill pill-${request.badge}`}>{request.status}</span>
                                        {request.status === 'Pending' ? (
                                            <>
                                                <button className="btn btn-success">Approve</button>
                                                <button className="btn btn-danger">Reject</button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
