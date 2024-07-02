import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";
import { fetchOrders } from "@/app/lib/data";
import { Order } from "@/app/lib/definitions";
import CustomerImage from "@/app/ui/dashboard/customerImage";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import Image from "next/image";
import InvoiceStatus from "../orders/status";

export default async function LatestInvoices() {
  const latestOrders = await fetchOrders();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Orders
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div
          className="bg-white px-6 overflow-auto"
          style={{ maxHeight: "25rem" }}
        >
          <table className=" min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  status
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {latestOrders?.map((order: Order) => (
                <tr
                  key={order.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          order.Customer
                            ? `/customers/${order.Customer.id}.png`
                            : `/customers/balazs-orban.png`
                        }
                        alt={`${
                          order.Customer ? order.Customer.id : order.order_date
                        } profile picture`}
                        className="rounded-full"
                        width={28}
                        height={28}
                      />
                      <div>
                        {" "}
                        <p className="mb-2">
                          {order.Customer?.name || "XXXX"}
                        </p>{" "}
                        <p
                          className={clsx("hidden sm:block", {
                            "text-sm text-green-500":
                              order.order_paid === true ||
                              Number(order.order_paid) === 1,
                            "text-sm text-red-500":
                              order.order_paid === false ||
                              Number(order.order_paid) === 0,
                          })}
                        >
                          {order.order_paid ? "Paid" : "No paid"}
                        </p>{" "}
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(
                      order.products.reduce(
                        (sum, item) => Number(sum) + Number(item.price),
                        0
                      )
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.order_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={order.order_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
