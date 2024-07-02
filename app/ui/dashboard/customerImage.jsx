'use client';

import Image from "next/image";
import { lusitana } from "../fonts";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import clsx from "clsx";
import InvoiceStatus from "../orders/status";

export default function CustomerImage({order}) {

  return (<> 
  <p className="text-sm text-gray-500 hidden sm:block">{order.Customer?order.Customer.name:"XXXXX"}</p>
   <div className="flex items-center">
     
   
    
     <Image
    src={order.Customer?`/customers/${order.Customer.id}.png`:`/customers/balazs-orban.png`}
    alt={`${order.Customer?order.Customer.id:order.order_date} profile picture`}
    className="mr-0 rounded-full"
    width={32}
    height={32}
  /> <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {formatDateToLocal(order.order_date)}
                      
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                   
                     
                    </p>
                   
                  </div>
                 
                 </div>
                 <InvoiceStatus status={order.order_status}/> 
                  <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {formatCurrency(order.products.reduce((sum, item) => Number(sum) + Number(item.price), 0))}
                </p></>
  );
}