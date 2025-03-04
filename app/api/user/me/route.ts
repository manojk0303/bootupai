// app/api/user/me/route.ts
import { NextResponse } from "next/server";
import { currentUser } from '@/lib/authentication';

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits || 0,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}