"use client";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Description,
  Field,
  Label,
} from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
export default function FilterOrder() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("email", term);
    } else {
      params.delete("email");
    }
    // params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <FunnelIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <div className="w-full max-w-md px-4">
            <Field>
              <Label className="text-sm/6 font-medium text-black">Email</Label>

              <Input
                onChange={(event) => handleSearch(event.target.value)}
                name="email"
                type="email"
                className={clsx(
                  "mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                )}
              />
            </Field>
          </div>

          <hr className="mt-2" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              let data = new FormData(event.currentTarget);

              let firstDate = data.get("first-date");
              let lastDate = data.get("last-date");
              console.log(firstDate, lastDate);
            }}
          >
            <div className="w-full max-w-md px-4">
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Desde
                </Label>

                <Input
                  name="first-date"
                  required
                  type="date"
                  className={clsx(
                    "mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                  )}
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Hasta
                </Label>

                <Input
                  name="last-date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  type="date"
                  className={clsx(
                    "mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                  )}
                />
              </Field>
              <button
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Filtrar
              </button>
            </div>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
