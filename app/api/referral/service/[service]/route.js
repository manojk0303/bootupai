const { db } = require("@/lib/db");
const { NextResponse } = require("next/server");
const { currentUser } = require("@/lib/authentication");

/**
 * GET handler for fetching referral links filtered by service type
 * 
 * @param {Object} request - The incoming request object
 * @param {Object} params - URL parameters containing the service type
 * @returns {Object} JSON response with referral links or error message
 */
async function GET(request, { params }) {
  try {
    // Extract service parameter from URL
    const { service } = params;
    
    // Validate service parameter to ensure it matches our enum values
    if (!service || !Object.values(require("@prisma/client").Service).includes(service.toUpperCase())) {
      return NextResponse.json(
        { status: "error", message: "Invalid service type provided" },
        { status: 400 }
      );
    }

    // Get the authenticated user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Query the database for referral links matching the service type and user
    const referralLinks = await db.referralLink.findMany({
      where: { 
        creatorId: user.id,
        service: service.toUpperCase() 
      },
      select: {
        id: true,
        slug: true,
        url: true,
        code: true,
        service: true,
        signups: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ 
      status: "success", 
      referralLinks 
    });
  } catch (error) {
    console.error("Error fetching service referral links:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch referral links" },
      { status: 500 }
    );
  }
}

module.exports = { GET };