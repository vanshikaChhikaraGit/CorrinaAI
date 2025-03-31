"use client"

import { ChatProvider } from "@/context/Chat-Room";
import { useState } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [domainId,setDomainId] = useState("")
    return (
       <main className="antialiased min-h-[calc(100vh-1px)] flex flex-col">
            <ChatProvider>
            {children}
            </ChatProvider>
            </main>
    )
}