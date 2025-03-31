import { getMessagesOfChatRoom } from '@/app/actions/getMessagesOfChatRoom';
import { onOwnerSendMessage, onRealTimeChat } from '@/app/actions/sendRealtimeMsg';
import { pusherClient } from '@/lib/pusher';
import { UploadClient } from '@uploadcare/upload-client';
import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRoundIcon } from "lucide-react";

const uploadClient = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

type Props = {
  chatRoomId: string;
};

const useChatWindow = ({ chatRoomId }: Props) => {
  const [userChats, setUserChats] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  // Fetch previous chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      const getMessages = await getMessagesOfChatRoom({ chatRoomId });
      if (getMessages?.status === 200) {
        setUserChats(getMessages.messages);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userChats]);

  // useEffect(()=>{
//   if(chatRoomId){
    //subscribe to chatroom
//     pusherClient.subscribe(chatRoomId)
//     pusherClient.bind('realtime-mode',(data:any)=>{
//       setUserChats((prev)=>[...prev,data.chat])
//     })
// return ()=>pusherClient.unsubscribe('realtime-mode')
//   }
// },[chatRoomId])

  // Handle message sending
  const onHandleSendMessage = async (values: { content: string; type: "text" | "image" }) => {
    try {
      const messageResponse = await onOwnerSendMessage(chatRoomId, values.content, 'assistant');

      if (messageResponse) {
        setUserChats((prev) => [...prev, messageResponse.message[0]]);
        
        // Send real-time message update
        // await onRealTimeChat(
        //   chatRoomId,
        //   messageResponse.message[0].message,
        //   messageResponse.message[0].id,
        //   'assistant'
        // );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    try {
      const uploadImage = await uploadClient.uploadFile(file);
      return uploadImage.uuid; // Return the UUID
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUUID = await handleImageUpload(file);
      if (imageUUID) {
        onHandleSendMessage({ content: imageUUID, type: "image" });
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Messages */}
      <div ref={messageWindowRef} className="flex flex-col flex-grow overflow-y-auto p-4">
        {userChats.map((chat, index) => (
          <div key={index} className={`flex ${chat.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <Card className={`p-2 rounded-lg max-w-xs ${chat.role === "assistant" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
              <div className="flex items-center gap-2">
                <UserRoundIcon className="w-6 h-6" />
                {chat.type === "text" ? (
                  <p>{chat.content}</p>
                ) : (
                  <img src={`https://ucarecdn.com/${chat.content}/`} alt="Chat Image" className="w-40 h-40 rounded-lg" />
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t flex items-center gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
        <Button onClick={() => document.getElementById("fileInput")?.click()}>📷</Button>
        <Button onClick={() => onHandleSendMessage({ content: message, type: "text" })}>Send</Button>
      </div>
    </div>
  );
};

export default useChatWindow;
