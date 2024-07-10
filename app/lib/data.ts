import sequelize from "../config/db";
import { Customer, Order, Product } from "./definitions";
import { formatCurrency } from "./utils";
const { QueryTypes } = require("sequelize");
require("dotenv").config();

export async function fetchRevenue() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/customer`;
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchOrders() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/order`;
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchProducts() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product`;
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchPutAll(dataCustomer: any, item: any) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${item}`; // Cambia esto según la URL de tu API
  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCustomer),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Obtiene la respuesta como JSON

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update data.");
  }
}
export async function fetchProductById(id: number | string): Promise<Product> {
  try {
    const orders = await sequelize.query(
      `SELECT *
   FROM products p
     WHERE p.id = ?
    `,
      {
        replacements: [`${id}`],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const product_selected: Product = (orders as any) || {};

    return product_selected;
  } catch (error) {
    throw new Error("Failed to fetch product selected.");
  }
}
export async function fetchOrderById(id: number | string): Promise<Order> {
  try {
    const orders = await sequelize.query(
      `SELECT *, JSON_ARRAYAGG(
               JSON_OBJECT(
               'id', p.id
               )) AS products
   FROM Orders o
    JOIN OrderProducts op ON o.id = op.orderId
     JOIN products p ON op.productId = p.id
     WHERE o.id = ?
    `,
      {
        replacements: [`${id}`],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const order_selected: Order = (orders as any) || {};

    return order_selected;
  } catch (error) {
    throw new Error("Failed to fetch order selected.");
  }
}
export async function fetchCustomerById(id: number | string): Promise<Product> {
  try {
    const orders = await sequelize.query(
      `SELECT *
   FROM Customers c
     WHERE c.id = ?
    `,
      {
        replacements: [`${id}`],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const customer_selected: Product = (orders as any) || {};

    return customer_selected;
  } catch (error) {
    throw new Error("Failed to fetch product selected.");
  }
}
export async function postAll(dataorder: any, page: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${page}`;
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(dataorder),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Obtiene la respuesta como JSON

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchDelete(id: any, tableRef: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${
    tableRef === "customers"
      ? "customer"
      : tableRef === "products"
      ? "product"
      : "order"
  }`;
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const response = await fetch(apiUrl, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Obtiene la respuesta como JSON

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
type DataResponse = [any, any, any, any, any, any, any];
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sequelize.query(`SELECT COUNT(*) FROM Orders`, {
      type: QueryTypes.SELECT,
    });
    const customerCountPromise = sequelize.query(
      `SELECT COUNT(*) FROM Customers`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const invoiceStatusPromise = sequelize.query(
      `SELECT
  SUM(CASE WHEN o.order_status = 'delivered' THEN p.price ELSE 0 END) AS "delivered",
  SUM(CASE WHEN o.order_status = 'pending' THEN p.price ELSE 0 END) AS "pending"
FROM
  Orders o
JOIN
   OrderProducts op ON o.id = op.orderId
JOIN
   products p ON op.productId = p.id
GROUP BY
  o.id;
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const order_pending = sequelize.query(
      `SELECT COUNT(*) FROM Orders o WHERE o.order_status = 'pending' `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const order_canceled = sequelize.query(
      `SELECT COUNT(*) FROM Orders o WHERE o.order_status = 'cancelled' `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const order_on_route = sequelize.query(
      `SELECT COUNT(*) FROM Orders o WHERE o.order_status = 'on_route' `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const order_delivered = sequelize.query(
      `SELECT COUNT(*) FROM Orders o WHERE o.order_status = 'delivered' `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const data: DataResponse = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
      order_pending,
      order_delivered,
      order_canceled,
      order_on_route,
    ]);
    const numberOfOrders = data[0][0] ? data[0][0]["COUNT(*)"] : 0;
    const numberOfCustomers = data[1][0] ? data[1][0]["COUNT(*)"] : 0;
    const totalDelivered = data[2].reduce((sum: any, item: any) => {
      return sum + parseFloat(item.delivered);
    }, 0);
    const totalPending = data[2].reduce((sum: any, item: any) => {
      return sum + parseFloat(item.pending);
    }, 0);
    const totalPaidOrders = formatCurrency(totalDelivered);
    const totalPendingOrders = formatCurrency(totalPending);
    const totalPendingNumber = data[3][0] ? data[3][0]["COUNT(*)"] : 0;
    const totalDeliveredOrders = data[4][0] ? data[4][0]["COUNT(*)"] : 0;
    const totalCanceled = data[5][0] ? data[5][0]["COUNT(*)"] : 0;
    const totalOnRoute = data[6][0] ? data[6][0]["COUNT(*)"] : 0;

    return {
      numberOfOrders,
      numberOfCustomers,
      totalPaidOrders,
      totalPendingOrders,
      totalPendingNumber,
      totalDeliveredOrders,
      totalCanceled,
      totalOnRoute,
    };
  } catch (error) {
    throw new Error("Failed to fetch card data.");
  }
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredOrders(
  query: string,
  currentPage: number,email:string
): Promise<Order[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log('como vas',query?'si exsite':'noexiste',email);

  try {
    const orders = await sequelize.query(
      `SELECT o.id, o.order_date, o.order_status,
       o.order_paid, o.shipping_rule, o.observations,
       JSON_ARRAY(
               JSON_OBJECT(
               'id', p.id,
               'name', p.name,
               'price', p.price,
               'quantity', p.quantity)) AS products,
    JSON_OBJECT(
            'id', c.id,
             'name', c.name,
             'email', c.email,
             'phone', c.phone,
             'address', c.address,
             'city', c.city) AS Customer
      
     FROM Orders o
     JOIN Customers c ON o.client_id = c.id
     JOIN OrderProducts op ON o.id = op.orderId
     JOIN products p ON op.productId = p.id
     WHERE c.name LIKE ?
     OR c.email LIKE ?
     OR o.order_status LIKE ?
    
     ORDER BY o.order_date DESC
     LIMIT ?
     OFFSET ?`,
      {
        replacements: [`%${query?query:email}%`, `%${query?query:email}%`, `%${query?query:email}%`, ITEMS_PER_PAGE, offset],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const invoices: Order[] = (orders as any[]) || [];
    console.log('-------invoices',invoices)
    return invoices;
  } catch (error) {
    throw new Error("Failed to fetch invoices.");
  }
}
export async function fetchFilteredCustomers(
  query: string,
  currentPage: number
): Promise<Customer[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await sequelize.query(
      `SELECT *
   FROM Customers c
     WHERE c.name LIKE ?
     OR c.email LIKE ?
       OR c.city LIKE ?
     ORDER BY c.id DESC
     LIMIT ?
     OFFSET ?`,
      {
        replacements: [
          `%${query}%`,
          `%${query}%`,
          `%${query}%`,
          ITEMS_PER_PAGE,
          offset,
        ],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const invoices: Customer[] = (orders as any[]) || [];

    return invoices;
  } catch (error) {
    throw new Error("Failed to fetch invoices.");
  }
}
export async function fetchFilteredProducts(
  query: string,
  currentPage: number
): Promise<Product[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await sequelize.query(
      `SELECT *
   FROM products p 
     WHERE p.name LIKE ?
     OR p.price LIKE ?
       OR p.quantity LIKE ?
     ORDER BY p.id DESC
     LIMIT ?
     OFFSET ?`,
      {
        replacements: [
          `%${query}%`,
          `%${query}%`,
          `%${query}%`,
          ITEMS_PER_PAGE,
          offset,
        ],
        type: QueryTypes.SELECT,
      }
    );
    if (!orders) {
      throw new Error("No data returned from query.");
    }
    const invoices: Product[] = (orders as any[]) || [];

    return invoices;
  } catch (error) {
    throw new Error("Failed to fetch invoices.");
  }
}
export async function fetchOrdersPages(query: string) {
  try {
    const counts = sequelize.query(
      `SELECT COUNT(*)
       FROM Orders o
       JOIN Customers c ON o.client_id = c.id
       JOIN OrderProducts op ON o.id = op.orderId
       JOIN products p ON op.productId = p.id
       WHERE c.name LIKE ?
       OR c.email LIKE ?
       OR o.order_status LIKE ?`,
      {
        replacements: [`%${query}%`, `%${query}%`, `%${query}%`],
        type: QueryTypes.SELECT,
      }
    );
    const count = await counts;

    const totalPages = Math.ceil(
      Number(count[0]?.["COUNT(*)"] || 0) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch total number of invoices.");
  }
}
export async function fetchCustomersPages(query: string) {
  try {
    const counts = sequelize.query(
      `SELECT COUNT(*)
       FROM Customers c
       WHERE c.name LIKE ?
       OR c.email LIKE ?
       OR c.city LIKE ?`,
      {
        replacements: [`%${query}%`, `%${query}%`, `%${query}%`],
        type: QueryTypes.SELECT,
      }
    );
    const count = await counts;

    const totalPages = Math.ceil(
      Number(count[0]?.["COUNT(*)"] || 0) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch total number of invoices.");
  }
}
export async function fetchProductsPages(query: string) {
  try {
    const counts = sequelize.query(
      `SELECT COUNT(*)
       FROM products p
       WHERE p.name LIKE ?
       OR p.price LIKE ?
       OR p.quantity LIKE ?`,
      {
        replacements: [`%${query}%`, `%${query}%`, `%${query}%`],
        type: QueryTypes.SELECT,
      }
    );
    const count = await counts;

    const totalPages = Math.ceil(
      Number(count[0]?.["COUNT(*)"] || 0) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const data = await sequelize.query(
      `
      SELECT id, name FROM Customers
      ORDER BY name ASC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (!data) {
      throw new Error("No data returned from query.");
    }

    const customers: Customer[] = (data as any[]) || [];

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}
