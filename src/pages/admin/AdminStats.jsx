import { BarGraphComp } from "@/components/charts/BarGraphComp";
import { DonutActiveComp } from "@/components/charts/DonutActiveComp";
import { LineChartComp } from "@/components/charts/LineChartComp";
import Sidebar from "@/components/custom/Sidebar";

function AdminStats() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-[1200px] mx-auto">
      <h1 className="w-full font-bold text-3xl py-5">Statistics</h1>
      <div className="grid grid-cols-2 gap-13">
        <LineChartComp />
        <LineChartComp />
        <DonutActiveComp />
        <BarGraphComp />
      </div>
    </div>
    </div>
  );
}
export default AdminStats;
