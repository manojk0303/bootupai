// api/referral/[id]/route.js
const { db } = require("@/lib/db");
const { NextResponse } = require("next/server");
const { currentUser } = require("@/lib/authentication");

async function DELETE(req, { params }) {
  try {
    const user = await currentUser();
    const { id } = params;

    if (!user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    // Ensure referral link belongs to user
    const referral = await db.referralLink.findUnique({
      where: { id },
    });

    if (!referral || referral.creatorId !== user.id) {
      return NextResponse.json({ status: "error", message: "Referral not found or unauthorized" }, { status: 403 });
    }

    await db.referralLink.delete({ where: { id } });

    return NextResponse.json({ status: "success", message: "Referral deleted successfully" });
  } catch (error) {
    console.error("Error deleting referral:", error);
    return NextResponse.json({ status: "error", message: "Could not delete referral link" }, { status: 500 });
  }
}


module.exports = { DELETE };