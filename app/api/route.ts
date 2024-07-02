import { NextResponse } from "next/server";


export async function GET() {
  try {
    
      return NextResponse.json({hello:"World"});
     } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
      }
};

