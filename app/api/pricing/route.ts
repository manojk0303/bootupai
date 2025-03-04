// app/api/pricing/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get pricing from the database or use default
    let pricingSetting = await db.pricingSetting.findFirst();
    
    if (!pricingSetting) {
      // Create default pricing if none exists
      pricingSetting = await db.pricingSetting.create({
        data: {
          pricePerCredit: 0.0485,
        },
      });
    }
    
    return NextResponse.json({ 
      pricePerCredit: pricingSetting.pricePerCredit 
    });
  } catch (error) {
    console.error("Error fetching pricing:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}