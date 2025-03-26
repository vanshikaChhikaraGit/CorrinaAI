'use client' // is needed only if you’re using React Server Components

import { UploadClient } from "@uploadcare/upload-client"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import React from 'react'
import ChatBotCustomisationForm from "@/forms/chatbot-customisation-form";

type Props = {
    domainId:string
}


const ChangeChatbotIcon = (props: Props) => {
  return (
    <div>
        <ChatBotCustomisationForm domainId={props.domainId}/>
    </div>
  )
}

export default ChangeChatbotIcon;