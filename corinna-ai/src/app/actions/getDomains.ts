"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function getDomains() {
    const user = await currentUser();
    if (!user) return;

    try {
        const userWithDomains = await prisma.user.findUnique({
            where: {
                externalId: user.id,
            },
            select: {
                Domain: {
                    select: {
                        id:true,
                        name: true,
                        icon:true
                    }
                }
            }
        });

        return userWithDomains?.Domain || []; // Return domains or an empty array if none exist
    } catch (error) {
        console.error("Error fetching domains:", error);
        throw new Error("Failed to fetch domains");
    }
}
