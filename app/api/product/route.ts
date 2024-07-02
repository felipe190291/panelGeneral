import { NextResponse } from "next/server";
import Product from "@/app/config/models/product";

export async function GET() {
  try {
    const results = await Product.findAll();
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: any) {
  const { name, price, quantity } = await req.json();

  try {
    const results = await Product.create({
      name: name,
      price: price,
      quantity: quantity,
    });
    return NextResponse.json(results.dataValues);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(req: any) {
  const { name, price, quantity, id } = await req.json();
  try {
    const results = await Product.update(
      { quantity: quantity, price: price, name: name },
      { where: { id: id } }
    );

    return NextResponse.json({ changed: results });
  } catch (error: any) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: any) {
  const { id } = await req.json();
  try {
    const results = await Product.destroy({
      where: { id: id },
    });
    return NextResponse.json({ deleted: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
