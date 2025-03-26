"use server"

import { prisma } from "@/lib/prisma"
import {currentUser } from "@clerk/nextjs/server"


export async function getUserSubscriptionPlan(){
    const user = await currentUser()
    const userId = user?.id

    if(!userId)return "STANDARD"
  console.log(userId)
    try {
        const userPlan = await prisma.user.findUnique({
            where:{externalId:userId},
            select:{subscription:{select:{plan:true,credits:true}}}
        })
console.log(userPlan)
        return userPlan?.subscription?.plan
    } catch (error) {
        console.error("Error fetching plan:", error);
        return "STANDARD"; // Fallback in case of an error
    }

}