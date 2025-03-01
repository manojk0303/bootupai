// api/referral/route.js
const { db } = require("@/lib/db");
const { NextResponse } = require("next/server");
const { currentUser } = require("@/lib/authentication");

async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const referrals = await db.referralLink.findMany({
      where: { creatorId: user.id },  // Filter by logged-in user
      select: {
        id: true,        // Make sure to explicitly select 'id'
        service: true,
        url: true,
        createdAt: true,
        signups: true,
        code: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ status: "success", referrals });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json({ status: "error", message: "Could not fetch referral links" }, { status: 500 });
  }
}


module.exports = { GET };