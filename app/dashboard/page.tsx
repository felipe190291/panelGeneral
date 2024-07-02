import { Suspense } from "react";
import { fetchCardData } from "../lib/data";
import { Card } from "@/app/ui/dashboard/cards";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import RevenueChart from "../ui/dashboard/revenue-chart";
import { lusitana } from "../ui/fonts";
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";

export default async function Dashboard() {
  const {
    numberOfOrders,
    numberOfCustomers,
    totalPaidOrders,
    totalPendingOrders,
    totalPendingNumber,
    totalDeliveredOrders,
    totalCanceled,
    totalOnRoute,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidOrders} type="collected" />
        <Card title="Pending" value={totalPendingOrders} type="pending" />
        <Card title="Total Orders" value={numberOfOrders} type="invoices" />

        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart paid={totalDeliveredOrders} pending ={totalPendingNumber} cancel={totalCanceled} onRoute={totalOnRoute}  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
