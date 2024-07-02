import Pagination from '@/app/ui/orders/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/orders/table';
import { CreateInvoice } from '@/app/ui/orders/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchOrdersPages } from '@/app/lib/data';

 
export default async function Page({searchParams}: {searchParams?: {query?: string,page?: string,deleteId?: string}}) { 
  const currentPage=Number(searchParams?.page || 1);
  const deleteId = searchParams?.deleteId || '';
  const query = searchParams?.query || '';
  const totalPages=await fetchOrdersPages(query);
  return (
    <div className="w-full changerColor" >
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>orders</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice href="/dashboard/orders/create" text="Create Order" />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} deleteId={deleteId}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}