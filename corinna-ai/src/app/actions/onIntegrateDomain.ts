"use server"

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onIntegerateDomain(domain:string,icon:string){
const user = await currentUser()
if(!user)return 
try {
    //1. find count of domains user has and their subscription plan
    const subscription = await prisma.user.findUnique({
        where:{
            externalId:user.id
        },
        select:{
            _count:{
                select:{
                    Domain:true
                }
            },
            subscription:{
                select:{
                    plan:true
                }
            }
        }
    })
    //2. check if the domain alrady exists
     const domainExists = await prisma.user.findFirst({
        where:{
            externalId:user.id,
            Domain:{
                some:{
                    name:domain
                }
            }
        },       
     })

     //if domain doesnot exist already 
     if(!domainExists){
        //check the validity of users plan
        if((subscription?.subscription?.plan=='STANDARD'&&subscription._count.Domain<1)||(subscription?.subscription?.plan=='PLUS'&&subscription._count.Domain<5)||(subscription?.subscription?.plan=="ULTIMATE"&&subscription._count.Domain<10)){
            const newDomain = await prisma.user.update({
                where:{
                    externalId:user.id,
                },
                data:{
                    Domain:{
                        create:{
                            name:domain,
                            icon,
                            chatBot:{
                                create:{
                                    welcomeMessage:"Hey there, have a question? Text us here!",
                                    icon:process.env.DEFAULT_CHATBOT_ICON_URL
                                }
                            }
                        }
                    }
                }
            })
            if(newDomain){
                return {status:200,message:"Domain added successfully!"}
            }
        }{
            return {status:400,message:"You've reached the maximum number of domains, upgrade your plan to add more domains."}
        }
     }
     return {status:400,message:"Domain already exists!"}
   
} catch (error) {
    console.log(error)
}
}
