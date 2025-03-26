import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024*1024*2 //2mb
const ACCEPTED_FILE_TYPES = ['image/png','image/jpg','image/jpeg']


export const domainSchema = z.object({
    domain: z
        .string()
        .min(3, { message: "Domain must be at least 3 characters." })
        .regex(
            /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/,
            { message: "This is not a valid domain." }
        ),
    icon: z
        .string()
        .min(1, { message: "Icon is required." }) 
});

export const chatBotCustomisationSchema = z.object({
    welcomeMessage: z.string().min(3).optional(),
    icon: z.string().min(1, { message: "Icon is required." }).optional()
});

export const helpDeskQuesSchema = z.object({
    question: z.string().min(3,{ message: "Question is required." }),
    answer: z.string().min(3, { message: "Answer is required." })
});



