"use server"

import { prisma } from "@/lib/prisma";

async function onUploadHelpDeskQuestionsAnswers(
    domainId:string,
    question:string,
    answer:string
){
try {
    const upload = await prisma.domain.update({
        where:{
            id:domainId
        },
        data:{
            helpdesk:{
                create:{
                    question,
                    answer
                }
            }
        },
        include:{
            helpdesk:{
                select:{
                    question:true,
                    answer:true
                }
            }
        }

    })

    if(upload){
        return {
            status:200,
            message:"Help Desk Questions Added Successfully",
            questions:upload.helpdesk
        }
    }
} catch (error) {
    console.log("error in helpdesk upload server action:",error)
    return{
        status:400,
        message:"an error occured"
    }
}
}

export default onUploadHelpDeskQuestionsAnswers;