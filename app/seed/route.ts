// import Customer from "../config/models/customers";
// import Product from "../config/models/product";

// require("dotenv").config();
// const sequelize = require("../config/db");
// async function useDatabase() {
//   sequelize.query(`USE pymedesk_bd`, (error: any) => {
//     if (error) {
//       console.error("Error al seleccionar la base de datos:", error);
//       return;
//     }
//     console.log("Base de datos seleccionada correctamente.");
//   });
// }
// // Crear la tabla 'productos' si no existe
// async function seedProducts() {
//   // sequelize.query(`
//   //    CREATE TABLE IF NOT EXISTS products (
//   //      id INT AUTO_INCREMENT PRIMARY KEY,
//   //      name VARCHAR(255) NOT NULL,
//   //      quantity INT NOT NULL,
//   //      price DECIMAL(10, 2) NOT NULL
//   //    )
//   //  `, (error:any, results:any, fields:any) => {
//   //    if (error) {
//   //      console.error('Error al crear la tabla productos:', error);
//   //      return;
//   //    }
//   //    console.log('Tabla productos creada o ya existe.');

//   // Insertar datos en la tabla productos
//   const products: any[] = [
//     { name: "Laptop", quantity: 6, price: 12000 },
//     { name: "Smartphone", quantity: 4, price: 8000 },
//     { name: "Tablet", quantity: 45, price: 500000 },
//     { name: "Monitor", quantity: 2, price: 60000 },
//     { name: "Impresora", quantity: 4, price: 30000 },
//     { name: "Router", quantity: 4, price: 150000 },
//     { name: "Auriculares", quantity: 7, price: 20000 },
//     { name: "Teclado mecánico", quantity: 9, price: 100000 },
//     { name: "Mouse óptico", quantity: 4, price: 50000 },
//     { name: "Cámara web", quantity: 5, price: 80000 },
//   ];

//   // Insertar datos en la tabla productos
//   try {
//     // Inserta todos los registros de una vez
//     await Product.bulkCreate(products);
//     console.log("Customers inserted successfully");
//   } catch (error) {
//     console.error("Error inserting customers:", error);
//   } finally {
//     // Cierra la conexión a la base de datos si ya no la necesitas
//     await sequelize.close();
//   }
// }

// async function seedCustomers() {
//   //   sequelize.query(`
//   //      CREATE TABLE customers (
//   //    id INT AUTO_INCREMENT PRIMARY KEY,
//   //    name VARCHAR(255) NOT NULL,
//   //    email VARCHAR(255) NOT NULL,
//   //    phone VARCHAR(20) NOT NULL,
//   //    address TEXT NOT NULL,
//   //    city VARCHAR(100) NOT NULL
//   // )
//   //    `, (error:any, results:any, fields:any) => {
//   //  if (error) {
//   //    console.error('Error al crear la tabla products:', error);
//   //    return;
//   //  }
//   //  console.log('Tabla productos creada o ya existe.');

//   // Insertar datos en la tabla productos
//   const customers: any[] = [
//     {
//       name: "Juan Pérez",
//       email: "juan@example.com",
//       phone: "1234567890",
//       address: "Calle 123, Colonia Centro",
//       city: "Mexico City",
//     },
//     {
//       name: "María García",
//       email: "maria@example.com",
//       phone: "9876543210",
//       address: "Av. Principal 456, Colonia Norte",
//       city: "Guadalajara",
//     },
//     {
//       name: "Carlos Martínez",
//       email: "carlos@example.com",
//       phone: "5647382910",
//       address: "Carrera 45 #67-89, Barrio Sur",
//       city: "Bogotá",
//     },
//     {
//       name: "Ana López",
//       email: "ana@example.com",
//       phone: "2345678901",
//       address: "Rua Principal 789, Bairro Centro",
//       city: "São Paulo",
//     },
//     {
//       name: "Pedro Rodríguez",
//       email: "pedro@example.com",
//       phone: "8765432109",
//       address: "Avenida 567, Barrio Oeste",
//       city: "Madrid",
//     },
//     {
//       name: "Laura Gómez",
//       email: "laura@example.com",
//       phone: "6543210987",
//       address: "Street 321, Downtown",
//       city: "New York",
//     },
//     {
//       name: "Miguel Hernández",
//       email: "miguel@example.com",
//       phone: "3456789012",
//       address: "123 Main St., Apt 101",
//       city: "Los Angeles",
//     },
//     {
//       name: "Sofía Vargas",
//       email: "sofia@example.com",
//       phone: "7890123456",
//       address: "123 Elm St., Suite 202",
//       city: "Toronto",
//     },
//     {
//       name: "Diego Sánchez",
//       email: "diego@example.com",
//       phone: "4567890123",
//       address: "456 Oak Ave., Unit 303",
//       city: "Chicago",
//     },
//     {
//       name: "Elena Pérez",
//       email: "elena@example.com",
//       phone: "8901234567",
//       address: "789 Pine Rd., #405",
//       city: "Miami",
//     },
//   ];

//   // Insertar datos en la tabla productos
//   try {
//     // Inserta todos los registros de una vez
//     await Customer.bulkCreate(customers);
//     console.log("Customers inserted successfully");
//   } catch (error) {
//     console.error("Error inserting customers:", error);
//   } finally {
//     // Cierra la conexión a la base de datos si ya no la necesitas
//     await sequelize.close();
//   }
//   //  });
// }
// async function seedOrders() {
//   sequelize.query(
//     `
//    CREATE TABLE orders (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//    order_status ENUM('pending', 'on_route', 'delivered', 'cancelled') NOT NULL,
//    order_paid BOOLEAN NOT NULL DEFAULT false,
//    client_id INT NULL,
//    shipping_rule ENUM('home_delivery', 'pickup_point') NOT NULL,
//    observations TEXT,
//    FOREIGN KEY (client_id) REFERENCES customers(id) ON DELETE SET NULL
// )
//    `,
//     (error: any, results: any, fields: any) => {
//       if (error) {
//         console.error("Error al crear la tabla orders:", error);
//         return;
//       }
//       console.log("Tabla orders creada o ya existe.");

//       // Insertar datos en la tabla productos
//     }
//   );
// }

// async function seedOrderItems() {
//   sequelize.query(
//     `
//  CREATE TABLE IF NOT EXISTS order_products (
//    order_id INT NOT NULL,
//    product_id INT NOT NULL,
//    PRIMARY KEY (order_id, product_id),
//    FOREIGN KEY (order_id) REFERENCES orders(id),
//    FOREIGN KEY (product_id) REFERENCES products(id)
// )`,
//     (error: any, results: any, fields: any) => {
//       if (error) {
//         console.error("Error al crear la tabla order_items:", error);
//         return;
//       }
//       console.log("Tabla order_items creada o ya existe.");

//       // Insertar datos en la tabla productos
//     }
//   );
// }

// export async function GET() {
//   try {
//     await useDatabase();
//     //  await seedCustomers();
//     await seedProducts();
//     //  await seedOrders();
//     // await seedOrderItems()

//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     await sequelize.execute("ROLLBACK");

//     return Response.json({ error }, { status: 500 });
//   }
// }
