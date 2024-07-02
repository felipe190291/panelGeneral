'use client';

import { postAll, fetchPut, fetchDelete } from "../lib/data";

export default function Search() {
  const dataCustomer = {
    name: "rosaura",
    email: "rosaura@gmail.com",
    phone: "31245678",
    address: "calle 30 ",
    city: "Neiva",
  };
  const dataCustomerPut = {
    id: 4,
    name: "Carlos Martínez",
    email: "carlos@example.com",
    phone: "5647382910",
    address: "Carrera 45 #67-89, Barrio Sur ",
    city: "Barranquilla",
  };
  const id = 2;
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => postAll(dataCustomer)}
      >
        Presionar
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fetchPut(dataCustomerPut)}
      >
        Put
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fetchDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}
