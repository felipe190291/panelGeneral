"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createOrder } from "@/app/lib/actions";
import InvoiceStatus from "./status";

export default function Form({ customers, products }) {
  const order_status = ["pending", "on_route", "delivered", "cancelled"];
  const shiping_rule = ["home_delivery", "pickup_point"];
  const initialState = {
    message: null,
  };
  const [state, formAction] = useFormState(createOrder, initialState);
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
          {state && state.message && (
            <p className="mt-2 text-sm text-red-500" key={"message"}>
              {message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              required
              id="customer"
              name="client_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={""}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <br />
          <div className="relative">
            <select
              multiple
              required
              id="productIds"
              name="productIds"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the order status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {order_status.map((status, i) => (
                <div className="flex items-center" key={status + i}>
                  <input
                    required
                    id={status}
                    name="order_status"
                    type="radio"
                    value={status}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 me-2"
                  />
                  <InvoiceStatus status={status} />
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the order paid
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  required
                  id="paid"
                  name="order_paid"
                  type="radio"
                  value={1}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pending"
                  name="order_paid"
                  type="radio"
                  value={0}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Not paid <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the order shipping rule
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {shiping_rule.map((shiping, i) => (
                <div className="flex items-center" key={shiping + i}>
                  <input
                    required
                    id={shiping}
                    name="shipping_rule"
                    type="radio"
                    value={shiping}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-white-500 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-300"
                  >
                    {shiping} <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <legend className="mb-2 block text-sm font-medium">
          Set the order orbservations
        </legend>

        <div className="rounded-md border border-gray-200 bg-white  ">
          <div className="flex gap-12">
            <textarea
              id="observations"
              name="observations"
              placeholder="Enter Observations"
              defaultValue=""
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/orders"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create order</Button>
      </div>
    </form>
  );
}
