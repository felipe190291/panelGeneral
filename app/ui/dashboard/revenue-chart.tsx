// import { generateYAxis } from '@/app/lib/utils';

import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue } from "@/app/lib/data";
import DonutPreload from "./donutClient";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 430;
  // NOTE: comment in this code when you get to this point in the course

  // const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Data
      </h2>

      <div className="rounded-xl bg-gray-50 md:p-4">
        <div className="w-full items-end gap-2 rounded-md bg-white md:p-4 md:gap-4">
          <div
            className="flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            <DonutPreload />
          </div>
        </div>
        <div className="hidden md:flex items-center pb-2 pt-2 md:pt-0">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
