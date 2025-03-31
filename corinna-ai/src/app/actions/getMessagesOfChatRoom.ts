"use server"

import { prisma } from "@/lib/prisma"

export async function getMessagesOfChatRoom({ chatRoomId }: { chatRoomId: string }) {
    try {
        const chatRoom = await prisma.chatRoom.findFirst({
            where: { id: chatRoomId },
            select: {
              message: {
                orderBy: { createdAt: "desc" }, 
                select: {
                  id: true,
                  message: true,
                  role: true, 
                  createdAt: true
                }
              }
            }
          });
        
          return{
            status:200,
           messages: chatRoom?.message || []
          }  
    } catch (error) {
        console.log("error in fetching messagesof a particular chat room server action : ",error)
    }
  }
  