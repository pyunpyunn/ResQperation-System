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
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}