import { adminApi } from "@/api/routesApi";
import { BarGraphComp } from "@/components/charts/BarGraphComp";
import { DonutActiveComp } from "@/components/charts/DonutActiveComp";
import { LineChartComp } from "@/components/charts/LineChartComp";
import axios from "axios";
import { BookUser, Handshake, Users } from "lucide-react";
import { useEffect, useState } from "react";

function AdminStats() {
  const [totalDeals, setTotalDeals] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newCustomersCount, setNewCustomersCount] = useState(0);
  const [weeklyNewCustomersData, setWeeklyNewCustomersData] = useState(null);
  const [topDealsData, setTopDealsData] = useState(null);
  const [overallSummaryData, setOverallSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        //Fetch Total Deals
        const dealsRes = await adminApi.get("/stats/deals-total");
        const fetchedTotalDeals = dealsRes.data.TotalDeals;
        setTotalDeals(fetchedTotalDeals);

        //Fetch Total Customers
        const customersRes = await adminApi.get("/stats/customers-total");
        const fetchedTotalCustomers = customersRes.data.totalCustomers;
        setTotalCustomers(fetchedTotalCustomers);

        //Fetch NEW Customers This Week - Line Chart
        const newCustomersRes = await adminApi.get(
          "/stats/new-customers-week"
        );
        setNewCustomersCount(newCustomersRes.data.NewCustomersThisWeek)

        //Fetch Top Deals as a Bar Graph
        const topDealsRes = await adminApi.get('/stats/top-deals')
        setTopDealsData(topDealsRes.data.TopDeals)

        //Overall Platform Key Metrics
        setOverallSummaryData([
          {name: 'Total Deals', value: fetchedTotalDeals},
          {name: 'Total Customers', value: fetchedTotalCustomers}
        ]);

      } catch (error) {
        console.error('Failed to fetch admin stats:', err);
        setError(err);
        toast.error('Failed to load statistics. Please try again')
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto w-full text-center py-10">
        <h1 className="font-bold text-3xl">Loading Statistics ...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto w-full text-center py-10 text-red-500">
        <h1 className="font-bold text-3xl">Error Loading Statistics</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full ">
      <h1 className="w-full font-bold text-3xl py-5">Statistics</h1>

      {/* Display simple counts as cards or text */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Handshake className="text-cyan-600 text-center w-full h-15"/>
              <h2 className="text-xl font-semibold">Total Deals</h2>
              <p className="text-3xl font-bold text-[#003F66]">{totalDeals}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <BookUser className="text-green-600 text-center w-full h-15"/>
              <h2 className="text-xl font-semibold">Total Customers</h2>
              <p className="text-3xl font-bold text-[#003F66]">{totalCustomers}</p>
          </div>
          {/* --- NEW CARD FOR NEW CUSTOMERS THIS WEEK --- */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Users className="text-yellow-500 text-center w-full h-15"/>
              <h2 className="text-xl font-semibold">New Customers <br/> (Last 7 Days)</h2>
              <p className="text-3xl font-bold text-[#003F66]">{newCustomersCount}</p>
          </div>

      </div>

      <div className="grid grid-cols-2 gap-13">
        <DonutActiveComp />
        {topDealsData && <BarGraphComp data={topDealsData} title="Top Deals" />}

        {/* Bar chart for Overall Platform Summary */}
        {/* {overallSummaryData && (
          <BarGraphComp data={overallSummaryData} title="Platform Key Metrics" />
        )} */}

      </div>
    </div>
  );
}
export default AdminStats;
