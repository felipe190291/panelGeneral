import Pagination from "@/app/ui/orders/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/products/table";
import { CreateInvoice } from "@/app/ui/orders/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchProductsPages } from "@/app/lib/data";

export default async function Products({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; deleteId?: string };
}) {
  const currentPage = Number(searchParams?.page || 1);
  const query = searchParams?.query || "";
  const deleteId = searchParams?.deleteId || "";
  const totalPages = await fetchProductsPages(query);

  return (
    <div className="w-full changerColor">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice
          href="/dashboard/products/create"
          text="Create product"
        />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} deleteId={deleteId} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
