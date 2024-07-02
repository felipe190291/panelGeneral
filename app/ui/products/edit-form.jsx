"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { editProduct } from "@/app/lib/actions";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Form({ dataId, dataAll }) {
  const initialState = {
    message: null,
    item: "product",
    idItem: dataId[0].id,
  };
  const [state, formAction] = useFormState(editProduct, initialState);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);
  useEffect(() => {
    if (state && state.message) {
      setMessage(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state && state?.message && (
            <p className="mt-2 text-sm text-red-500" key={"message"}>
              {message}
            </p>
          )}
        </div>

        <div className="relative">
          <select
            required
            name="name"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={dataId[0].id}
          >
            <option value="" disabled>
              Select a product
            </option>
            {dataAll.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the product price
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="price"
              type="number"
              defaultValue={dataId[0]?.price || null}
              placeholder={"$"}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the product quantity
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="quantity"
              type="number"
              defaultValue={dataId[0]?.quantity || null}
              placeholder={"##"}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit product</Button>
      </div>
    </form>
  );
}
