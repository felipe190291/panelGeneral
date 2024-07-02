import Image from 'next/image';
import { UpdateInvoice } from '@/app/ui/orders/buttons';
import InvoiceStatus from '@/app/ui/orders/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredOrders } from '@/app/lib/data';
import { Order } from '@/app/lib/definitions';
import  DeleteInvoice  from '@/app/ui/orders/deletedButton';
import clsx from 'clsx';
import Modal from '../modal';

export default async function InvoicesTable({
  query,
  currentPage,deleteId
}: {
  query: string;
  currentPage: number;deleteId:string
}) {


  const orders = await fetchFilteredOrders(query, currentPage);
  return (
   <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {orders.map((order:Order) => (
              <div
                key={order.id + order.order_date}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                    <Image
    src={order.Customer?`/customers/${order.Customer.id}.png`:`/customers/balazs-orban.png`}
    alt={`${order.Customer && Number(order.Customer.id) <9?order.Customer.id:order.order_date} profile picture`}
    className="mr-2 rounded-full"
    width={28}
    height={28}
  />
                      <p>{order.Customer?.name || "XXXX"}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.Customer?.email}</p>
                  </div>
                  <InvoiceStatus status={order.order_status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className={clsx(
        "text-xl font-medium",
        {
          'text-sm text-green-500': order.order_paid === true || Number(order.order_paid) === 1,
          'text-sm text-red-500': order.order_paid === false || Number(order.order_paid) === 0,
        },
      )} >
                    {order.order_paid ? 'Paid':"No paid"}
                    </p>
                    <p>{formatDateToLocal(order.order_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={order.id} reference={"orders"}/>
                    <DeleteInvoice id={order.id} reference={'order'} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                   Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Order
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order:Order) => (
                <tr
                  key={order.id + order.order_date}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <Image
    src={order.Customer?`/customers/${order.Customer.id}.png`:`/customers/balazs-orban.png`}
    alt={`${order.Customer?order.Customer.id:order.order_date} profile picture`}
    className="rounded-full"
    width={28}
    height={28}
  />
                      <p>{order.Customer?.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.Customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {formatCurrency(order.products.reduce((sum, item) => Number(sum) + Number(item.price), 0))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.order_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  <p   className={clsx(
        'hidden sm:block',
        {
          'text-sm text-green-500': order.order_paid === true || Number(order.order_paid) === 1,
          'text-sm text-red-500': order.order_paid === false || Number(order.order_paid) === 0,
        },
      )}>
                      {order.order_paid ? 'Paid':"No paid"}
                     
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={order.order_status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-1 pr-3">
                    <div className="flex justify-start gap-3">
                      <UpdateInvoice id={order.id} reference={"orders"} />
                      <DeleteInvoice id={order.id} reference ={'order'}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteId&& <Modal tableRef={'orders'}/>}
    </div>
  );
}
