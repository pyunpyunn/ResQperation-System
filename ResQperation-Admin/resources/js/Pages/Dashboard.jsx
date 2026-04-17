<<<<<<< HEAD
﻿import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
=======
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Notice we added { totalHouseholds, households } here to receive the data
export default function Dashboard({ totalHouseholds, households }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ResQperation Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* 1. Statistics Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition duration-300">
                            <p className="text-sm uppercase font-bold opacity-75">Registered Households</p>
                            <h3 className="text-4xl font-black">{totalHouseholds}</h3>
                        </div>
                        
                        {/* Placeholder for future DRRM stats */}
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Active Emergency Alerts</p>
                            <h3 className="text-4xl font-black text-gray-800">0</h3>
                        </div>
                    </div>

                    {/* 2. Recent Households Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
                        <div className="p-6 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700">Recently Added Residents</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Household Head</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Barangay</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">SafeTrack Sync</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {households && households.length > 0 ? (
                                        households.map((h) => (
                                            <tr key={h.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {h.household_head_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {h.barangay || 'Not set'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${h.safetrack_id ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {h.safetrack_id ? 'Linked' : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-10 text-center text-gray-500 italic">
                                                No households found in the database.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                </div>
            </div>
        </AuthenticatedLayout>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
