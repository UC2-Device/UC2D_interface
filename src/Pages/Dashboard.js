import { useEffect, useState } from "react";
import axios from "axios";
import ChartCard from "../Component/Chartcard.js"; // Adjust the import path
import { URL } from "../Constants/API_URL.js";

// A simple loading spinner component for a better user experience
const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
    <p className="text-gray-600 mt-4">Loading Analytical Data...</p>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const res = await axios.get(`${URL}/stats/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.stats;
        
        // Handle cases where data might not be in the expected format
        if (!data || !Array.isArray(data.total_scans)) {
          throw new Error("Invalid data format received from server.");
        }

        const chartData = data.total_scans.map((_, idx) => ({
          day: idx + 1,
          total_scans: data.total_scans[idx] || 0,
          area_utilised: data.area_utilised[idx] || 0,
          health_need: data.health_need[idx] || 0,
        }));

        setStats(chartData);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Monthly Analytics
          </h1>
          <p className="mt-1 text-base text-gray-500">
            An overview of your device's activity and crop health trends.
          </p>
        </div>

        {stats.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="xl:col-span-2">
              <ChartCard
                title="Daily Used"
                data={stats}
                dataKey="total_scans"
                lineColor="#3b82f6"
                name="Total Scans"
              />
            </div>
            <ChartCard
              title="Area Utilised (Acres)"
              data={stats}
              dataKey="area_utilised"
              lineColor="#22c55e"
              name="Area"
            />
            <ChartCard
              title="Health"
              data={stats}
              dataKey="health_need"
              lineColor="#f59e0b"
              name="Needs"
            />
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-700">No Data Available</h3>
            <p className="text-gray-500 mt-2">
              There is no statistical data to display for the current period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}