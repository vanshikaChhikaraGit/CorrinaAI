import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export const onOwnerSendMessage = async(
    chatRoomId:string,
    message:string,
    role:'assistant'|'customer'
)=>{
try {
    const chat = await prisma.chatRoom.update({
        where:{
            id:chatRoomId
        },
        data:{
            message:{
                create:{
                    message,
                    role
                }
            }
        },
        select:{
            message:{
                select:{
                    id:true,
                    role:true,
                    message:true,
                    createdAt:true
                },
                orderBy:{
                    createdAt:'desc'
                },
                take:1
            }
        }
    })
    if(chat){
        return chat
    }
} catch (error) {
console.log("error in send real time message from owner server action: ",error)    
}
}
export const onRealTimeChat = async(
     chatRoomId:string,
     message:string,
     id:string,
     role:'assistant'|'customer'
)=>{
    pusherServer.trigger(chatRoomId,'realtime-mode',{
        chat:{
            message,
            id,
            role
        }
    })
}