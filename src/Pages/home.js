import { useAuth } from "../Authentication_API/Authentication.js";
import InfoCard from '../Component/Infocard.js';
import StatusBadge from '../Component/Statusbadge.js';
import UsageBar from '../Component/Usagebar.js';
import { DevicePhoneMobileIcon, CalendarDaysIcon, ChartBarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

export default function Home() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>Loading user data...</p>
            </div>
        );
    }

    const calculateDaysRemaining = (endDate) => {
        const end = new Date(endDate);
        const now = new Date();
        const difference = end.getTime() - now.getTime();
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        return days > 0 ? days : 0;
    };

    const daysRemaining = calculateDaysRemaining(user.subscription_end);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="mt-1 text-base text-gray-500">
                        Here's a complete overview of your crop management system.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <InfoCard title="Device Information" icon={<DevicePhoneMobileIcon className="h-6 w-6 text-gray-500" />}>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <span className="font-medium mb-1 sm:mb-0">Device ID</span>
                                    <span className="font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm break-all">
                                        {user.device_id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Status</span>
                                    <StatusBadge status={user.status} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Last Activity</span>
                                    <span className="text-right">{new Date(user.last_session_date).toLocaleString()}</span>
                                </div>
                            </div>
                        </InfoCard>
                        </div>

                        <div>
                            <InfoCard title="Usage" icon={<ChartBarIcon className="h-6 w-6 text-gray-500" />}>
                                <UsageBar used={user.used_sessions} total={user.total_sessions} />
                                <div className="mt-4 text-center">
                                    <Link
                                        to="/buy-sessions" // Replace with your actual route
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition"
                                    >
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                                        Buy More Sessions
                                    </Link>
                                </div>
                            </InfoCard>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <InfoCard title="Subscription Plan" icon={<CalendarDaysIcon className="h-6 w-6 text-gray-500" />}>
                            <div className="text-center">
                                <p className={`text-4xl sm:text-5xl font-extrabold ${daysRemaining > 0 ? "text-green-600" : "text-red-600"}`}>
                                    {daysRemaining}
                                </p>
                                <p className="text-gray-500 font-medium mt-1">Days Remaining</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Current Plan</span>
                                    {user.plan === "normal" ? (
                                        <Link
                                            to="/premium"
                                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg shadow hover:from-green-600 hover:to-green-700 transition"
                                        >
                                            Upgrade to Premium
                                        </Link>
                                    ) : (
                                        <span className="px-3 py-1 text-sm font-bold text-yellow-800 bg-yellow-200 rounded-full">
                                            Premium
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Valid Until</span>
                                    <span className="text-right">
                                        {new Date(user.subscription_end).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* 👇 New condition: show buy link if daysRemaining = 0 */}
                                {daysRemaining === 0 && (
                                    <div className="text-center mt-4">
                                        <Link
                                            to="/buy-sessions" // Your renew/buy page
                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow hover:from-red-600 hover:to-red-700 transition"
                                        >
                                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                                            Renew Subscription
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </div>
    );
}