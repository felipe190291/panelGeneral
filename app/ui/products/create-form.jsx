"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createProduct } from "@/app/lib/actions";

export default function Form() {
  const initialState = {
    message: null,
  };
  const [state, formAction] = useFormState(createProduct, initialState);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);
  useEffect(() => {
    if (state.message) {
      setMessage(state.message);
    }
  }, [state.message]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={"message"}>
              {message}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the product name
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="name"
              type="text"
              defaultValue={""}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the product price
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="price"
              type="number"
              placeholder={null}
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
              placeholder="#"
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
        <Button type="submit">Create product</Button>
      </div>
    </form>
  );
}
