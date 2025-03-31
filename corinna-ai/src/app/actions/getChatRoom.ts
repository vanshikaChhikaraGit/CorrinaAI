"use server"

import { prisma } from "@/lib/prisma"

export const getChatRoomOfADomain = async({domainId}:{domainId:string})=>{
    
    try {
        const chatRooms = await prisma.domain.findUnique({
            where:{
                id:domainId
            },
            select:{
                customer:{
                    select:{
                        id:true,
                        email:true,
                        chatRoom:{
                            select:{
                                createdAt:true,
                                id:true,
                                message:{
                                    select:{
                                        message:true,
                                        createdAt:true
                                    },
                                    orderBy:{
                                        createdAt:'desc'
                                    },
                                    take:1
                                }
                            }
                        }
                    }
                }
            }
        })

        if(chatRooms)return chatRooms
    } catch (error) {
        console.log("error in fetching conversations of a particular domain in getChatRoomOfADomain server action: ",error)
    }
}