import Image from "next/image";
import { UpdateInvoice } from "@/app/ui/orders/buttons";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { Customer } from "@/app/lib/definitions";
import DeleteInvoice from "@/app/ui/orders/deletedButton.jsx";
import Modal from "@/app/ui/modal.jsx";
export default async function CustomersTable({
  query,
  currentPage,
  deleteId,
}: {
  query: string;
  currentPage: number;
  deleteId: string;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers.map((customer: Customer) => (
              <div
                key={customer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className=" mb-2 flex items-center">
                      <Image
                        src={
                          customer.id > 8
                            ? "/customers/8.png"
                            : `/customers/${customer.id}.png`
                        }
                        alt={`${customer.name} profile picture`}
                        className="mr-2 rounded-full "
                        width={28}
                        height={28}
                      />
                      <p>{customer.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">phone</p>
                    <p>{customer.phone}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={customer.id} reference={"customers"} />
                    <DeleteInvoice
                      id={String(customer.id)}
                      reference={"customer"}
                    />
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
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  City
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.map((customer: Customer) => (
                <tr
                  key={customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          customer.id > 8
                            ? "/customers/8.png"
                            : `/customers/${customer.id}.png`
                        }
                        alt={`${customer.id} profile picture`}
                        className="rounded-full"
                        width={28}
                        height={28}
                      />
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(customer.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p className={"hidden sm:block"}>{customer.city}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.phone}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-1 pr-3">
                    <div className="flex justify-start gap-3">
                      <UpdateInvoice id={customer.id} reference={"customers"}/>
                      <DeleteInvoice
                        id={String(customer.id)}
                        reference={"customer"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteId && <Modal tableRef={"customers"} />}
    </div>
  );
}
