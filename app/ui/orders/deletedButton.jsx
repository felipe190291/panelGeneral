"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
export default function DeleteInvoice({ id, reference }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (id) => {
    if (id) {
      params.set("deleteId", id);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      defaultValue={searchParams.get("deleteId")?.toString()}
      onClick={() => handleSearch(id)}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
