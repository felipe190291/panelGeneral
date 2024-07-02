import Image from "next/image";
import { UpdateInvoice } from "@/app/ui/orders/buttons";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredProducts } from "@/app/lib/data";
import { Customer, Product } from "@/app/lib/definitions";
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
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatDateToLocal(product.createdAt)}
                    </p>
                    <p>{product.quantity}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={product.id} reference={"products"} />
                    <DeleteInvoice
                      id={String(product.id)}
                      reference={"product"}
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
                  Id product
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created Date
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product: Product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p className={"hidden sm:block"}>
                      {formatDateToLocal(product.createdAt)}
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-1 pr-3">
                    <div className="flex justify-start gap-3">
                      <UpdateInvoice id={product.id} reference={"products"} />
                      <DeleteInvoice
                        id={String(product.id)}
                        reference={"product"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteId && <Modal tableRef={"products"} />}
    </div>
  );
}
