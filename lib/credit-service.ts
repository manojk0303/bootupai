import { db } from "@/lib/db";

export async function checkAndDeductCredits(userId: string, totalCredits: number=1): Promise<boolean> {
  try {
    return await db.$transaction(async (tx) => {
      // Fetch the user's current credits
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Set default deduction to total available credits if not provided
      // const deductionAmount = totalCredits ?? user.credits;

      // Ensure user has enough credits
      if (user.credits < totalCredits) {
        return false;
      }

      // Deduct the credits
      await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: totalCredits } },
      });

      return true;
    });
  } catch (error) {
    console.error("Error deducting credits:", error);
    return false;
  }
}
