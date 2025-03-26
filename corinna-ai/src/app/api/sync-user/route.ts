import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const User = await currentUser();
    if (!User) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { externalId: User.id },
      include: { subscription: true }, // Also fetch subscription details
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: User.emailAddresses[0]?.emailAddress,
          name: `${User.firstName} ${User.lastName}`,
          externalId: User.id,
          subscription: {
            create: {  // Create a default billing entry
              plan: "STANDARD",
              credits: 10,
            },
          },
        },
      });
    } else if (!existingUser.subscription) {
      // If user exists but has no subscription, create one
      await prisma.billings.create({
        data: {
          userId: existingUser.id,
          plan: "STANDARD",
          credits: 10,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

