"use client";

import { getChatRoomOfADomain } from "@/app/actions/getChatRoom";
import React, { createContext, useContext, useEffect, useState } from "react";

type DomainChatRoom = {
  customer: {
    id:string;
    email: string | null;
    chatRoom: {
      id: string;
      createdAt: Date;
      message: {
        createdAt: Date;
        message: string;
      }[];
    }[];
  }[];
} | undefined;

interface ChatRoomContextType {
  chats: DomainChatRoom | undefined;
  loading: boolean;
  domainId: string;
  setDomainId: (id: string) => void; // Allow updating domainId
}

const ChatContext = createContext<ChatRoomContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<DomainChatRoom | undefined>(undefined);
  const [domainId, setDomainId] = useState<string>(""); // Store domainId in context

  useEffect(() => {
    if (!domainId) return; // Don't fetch if domainId is empty

    const fetchChats = async () => {
      try {
        setLoading(true);
        const chats = await getChatRoomOfADomain({domainId});
        setChats(chats);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [domainId]); // Re-fetch chats when domainId changes

  return (
    <ChatContext.Provider value={{ chats, loading, domainId, setDomainId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
