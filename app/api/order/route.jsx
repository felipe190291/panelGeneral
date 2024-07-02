import { NextResponse } from "next/server";
import { Order } from "@/app/config/models/order";
import Product from "@/app/config/models/product";
import Customer from "@/app/config/models/customers";

export async function GET() {
  try {
    const results = await Order.findAll({
      include: [
        {
          model: Product,
        },
        { model: Customer },
      ],
      attributes: {
        exclude: ["client_id"],
      },
    });
    const ordersWithoutOrderProduct = results.map((order) => ({
      ...order.toJSON(),
      products: order.products.map((product) => ({
        ...product.toJSON(),
        OrderProduct: undefined,
      })),
    }));
    return NextResponse.json(ordersWithoutOrderProduct);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req) {
  const {
    order_status,
    order_paid,
    client_id,
    shipping_rule,
    observations,
    productId,
  } = await req.json();
  try {
    const order = await Order.create({
      order_status: order_status,
      order_paid: order_paid,
      client_id: client_id,
      shipping_rule: shipping_rule,
      observations: observations,
    });
    await Promise.all(
      productId.map(async (prod) => {
        try {
          const product = await Product.findByPk(prod);
          if (product) {
            await order.addProduct(product); // Singular porque addProduct añade un solo producto
          }
        } catch (error) {
          console.error(`Error adding product with id ${prod}:`, error);
          // Manejar el error según sea necesario
        }
      })
    );

    return NextResponse.json(order);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(req) {
  const {
    id,
    order_status,
    order_paid,
    client_id,
    shipping_rule,
    observations,
    productId,
  } = await req.json();
  try {
    const results = await Order.update(
      {
        order_status: order_status,
        order_paid: order_paid,
        client_id: client_id,
        shipping_rule: shipping_rule,
        observations: observations,
      },
      { where: { id: id } }
    );
    const order = await Order.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    // 2. Busca todos los productos con los IDs proporcionados
    const updatedProducts = await Product.findAll({
      where: { id: productId },
    });
    await order.setProducts(updatedProducts);

    return NextResponse.json({ changed: results });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const results = await Order.destroy({
      where: { id: id },
    });

    return NextResponse.json({ deleted: results });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
