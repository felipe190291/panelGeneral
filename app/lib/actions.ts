"use server";
import { revalidatePath } from "next/cache";
import { fetchDelete,fetchPutAll,postAll } from "./data";
import { redirect } from "next/navigation";
import zod from "zod"

export async function createOrder(prevState: State, formData: FormData) {
  
  const validatedFields ={
    client_id: formData.get("client_id"),
    order_status: formData.get("order_status"),
    order_paid: formData.get("order_paid"),
    shipping_rule: formData.get( "shipping_rule"),
    observations: formData.get( "observations"),
    productId:formData.getAll("productIds")
  };
 

  //tester
  // const rawData = {
  //   orderd_status: "pending",
  //   ordedr_paid: true,
  //   cliednt_id: "10",
  //   shipping_rule: "pending",
  //   observdations: "primer post en el mismo ccliente",
  // };
  let failed =true
  try {
    let post_order = await postAll(validatedFields,'order');
   
    if (post_order.error) {
      failed = false
      return {
        message: "Order created Error:" + post_order.error,
      };
    } else {
      failed = true
    
    }
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Order.",
    };
  }
  if (failed) {
    revalidatePath("/dashboard/orders");
    redirect("/dashboard/orders");
  }
}
export async function createCustomer(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
 
  let failed =true
  try {
    let post_customer = await postAll(rawFormData,'customer');
    
    if (post_customer.error) {
      failed = false
      return {
        message: "Customer created Error: " + post_customer.error,
      };
    } else {
      failed = true
    
    }
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Order.",
    };
  }
  if (failed) {
    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
  }
}
export async function createProduct(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
 
  let failed =true
  try {
    let post_customer = await postAll(rawFormData,'product');
    
    if (post_customer.error) {
      failed = false
      return {
        message: "product created Error: " + post_customer.error,
      };
    } else {
      failed = true
    
    }
  } catch (err) {
    return {
      message: "Database Error: Failed to Create product.",
    };
  }
  if (failed) {
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }
}
export type State = {
  message?: string | null;
  item?: string | null;
  idItem?: any;
};
export async function deleteIdFromDB(id:string,tableRef:string) {
  let failed =true
  try {
    let post_order = await fetchDelete(id,tableRef);
   
    if (post_order.error) {
      failed = false
      return {
        message: "Customer delete Error:" + post_order.error,
      };
    } else {
      failed = true
    
    }
  } catch (err) {
    return {
      message: "Database Error: Failed to delete Customer.",
    };
  }
  if (failed) {
    revalidatePath(`/dashboard/${tableRef}`);
    redirect(`/dashboard/${tableRef}`);
  }

}

export async function editProduct(prevState: State, formData: FormData) {
  let rawFormData;
  if(prevState?.item==="order"){
    rawFormData=  {
      client_id: formData.get("client_id"),
      order_status: formData.get("order_status"),
      order_paid: formData.get("order_paid"),
      shipping_rule: formData.get( "shipping_rule"),
      observations: formData.get( "observations"),
      productId:formData.getAll("productIds"),
      id : prevState?.idItem
    }
  }else{
    rawFormData = Object.fromEntries(formData.entries());
    rawFormData.id = prevState?.idItem;
  }
 let failed =true
  try {
    let post_customer = await fetchPutAll(rawFormData,prevState?.item);
    
    if (post_customer.error) {
      failed = false
      return {
        message: "product created Error: " + post_customer.error,
      };
    } else {
      failed = true
    
    }
  } catch (err) {
    return {
      message: `Database Error: Failed to Create ${prevState?.item}.`,
    };
  }
  if (failed) {
    revalidatePath(`/dashboard/${prevState?.item}s`);
    redirect(`/dashboard/${prevState?.item}s`);
  }
}

