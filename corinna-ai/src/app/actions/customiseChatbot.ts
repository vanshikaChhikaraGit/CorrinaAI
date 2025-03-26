"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function customiseChatbot(
  domainId: string,
  welcomeMessage: string,
  icon: string
) {
  // Find current user
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // Check user's subscription plan
    const subscription = await prisma.user.findUnique({
      where: { externalId: user.id },
      select: {
        subscription: { select: { plan: true } },
      },
    });

    if (
      !subscription?.subscription?.plan ||
      !["PLUS", "ULTIMATE"].includes(subscription.subscription.plan)
    ) {
      return {
        status: 403,
        message: "Upgrade your plan to customize your chatbot.",
      };
    }

    // Find the user's domain (ensure they own it)
    const userDomain = await prisma.domain.findFirst({
      where: {
        id: domainId,
        userId: user.id, // Ensure the domain is linked to the user
      },
    });

    if (!userDomain) return { status: 404, message: "Domain not found or unauthorized" };

    // Update or create the chatbot entry
    const updatedChatbot = await prisma.chatBot.upsert({
      where: { domainId },
      update: { welcomeMessage, icon },
      create: { domainId, welcomeMessage, icon },
    });

    if (!updatedChatbot) {
      return { status: 500, message: "Failed to update chatbot." };
    }

    return { status: 200, message: "Chatbot customized successfully!", data: updatedChatbot };
  } catch (error) {
    console.error("Error updating chatbot:", error);
    return { status: 500, message: "Internal server error" };
  }
}
