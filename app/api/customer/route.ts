import { NextResponse } from "next/server";
import Customer from "@/app/config/models/customers.jsx";

export async function GET() {
  try {
    const results = await Customer.findAll();
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: any) {
  const { name, email, phone, address, city } = await req.json();

  try {
    const results = await Customer.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      city: city,
    });

    return NextResponse.json(results.dataValues);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(req: any) {
  const { name, email, phone, address, city, id } = await req.json();
  try {
    const results = await Customer.update(
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
      },
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
    const results = await Customer.destroy({
      where: { id: id },
    });
   
    return NextResponse.json({ deleted: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
