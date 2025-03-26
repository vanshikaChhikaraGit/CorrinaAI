"use server"

import { prisma } from "@/lib/prisma"

export async function getHelpDeskQues (domainId:string){

    try {
        const helpdeskQues = await prisma.domain.findUnique({
            where:{
                id:domainId
            },
            select:{
                helpdesk:{
                    select:{
                        question:true,
                        answer:true
                    }
                    
                }
            }
        })
        if(helpdeskQues){
            return {
                status:200,
                questions:helpdeskQues.helpdesk
            }
        }
    } catch (error) {
        console.log("error in fetching helpdesk ques server action",error)
        return {
            status:400
        }
    }
        
}