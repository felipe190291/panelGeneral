"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { editProduct } from "@/app/lib/actions";

export default function Form({ dataAll, dataId }) {
  const initialState = {
    message: null,
    item: "customer",
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
  const ciudadesColombia = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Santa Marta",
    "Manizales",
    "Cúcuta",
    "Ibagué",
    "Villavicencio",
    "Pasto",
    "Montería",
    "Valledupar",
    "Neiva",
    "Armenia",
    "Popayán",
    "Sincelejo",
    "Tunja",
    "Riohacha",
    "Florencia",
    "Quibdó",
    "Mocoa",
    "San Andrés",
    "Leticia",
    "Yopal",
    "Inírida",
    "Puerto Carreño",
    "Mitú",
  ];

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

        <div className="relative">
          <select
            required
            name="name"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={dataId[0].name}
          >
            <option value="" disabled>
              Select a product
            </option>
            {dataAll.map((customer) => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the custom email
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="email"
              type="email"
              defaultValue={dataId[0]?.email || null}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the custom phone
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="phone"
              type="phone"
              defaultValue={dataId[0]?.phone || null}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the custom adress
          </legend>
          <div className="rounded-md border border-gray-200 ">
            <input
              required
              name="address"
              type="text"
              defaultValue={dataId[0]?.address || null}
              className="w-full h-full py-2 text-gray-500"
            />
          </div>
          <br></br>
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the custom city
          </legend>
          <div className="relative">
            <select
              required
              id="city"
              name="city"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={dataId[0]?.city || null}
            >
              <option value="" disabled>
                Select a city
              </option>
              {ciudadesColombia.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create customer</Button>
      </div>
    </form>
  );
}
