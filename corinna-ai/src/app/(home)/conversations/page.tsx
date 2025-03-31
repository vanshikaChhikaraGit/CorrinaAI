"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDomain } from "@/context/Domain-Context";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { MaxWidthWrapper } from "@/components/max-widht-wrapeer";
import { ChatProvider, useChat } from "@/context/Chat-Room";
import { CircleUserRound, UserRoundIcon } from "lucide-react";
import ConversationWindow from "@/components/ConversationWindow";
type Props = {};

const Page = (props: Props) => {
  const [currentChatRoom,setCurrentChatRoom] = useState("")
  const { domains } = useDomain();
  const [position, setPosition] = React.useState("default");
  const { chats, loading, domainId, setDomainId } = useChat();
  return (
    <div className=" max-h-screen h-full relative">
      <MaxWidthWrapper>
        {/* heading  */}
        <section className="flex items-center mt-1 w-full">
          <div className="w-full p-2">
            <Heading>Conversations</Heading>
          </div>
          <div className="w-full flex justify-end p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Domain</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  {domains ? (
                    domains.map((domain) => (
                      <DropdownMenuRadioItem value={domain.id} key={domain.id}>
                        <div className="flex items-center m-2 justify-center hover:cursor-pointer p-2">
                          <Image
                            src={domain.icon}
                            alt="domain logo"
                            className="border rounded-md mr-2"
                            width={20}
                            height={20}
                          />
                          <p
                            className="text-sm font-semibold"
                            onClick={() => setDomainId(domain.id)}
                          >
                            {domain.name}
                          </p>
                        </div>
                      </DropdownMenuRadioItem>
                    ))
                  ) : (
                    <ul>
                      <li className="bg-gray-200/40 animate-pulse h-8 m-1 w-full rounded-md my-1 list-none"></li>
                      <li className="bg-gray-200/40 animate-pulse h-8 m-1 w-full rounded-md my-1 list-none"></li>
                    </ul>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          {chats?.customer?.length ? (
            <div className="grid lg:grid-cols-2 w-full h-full max-h-screen">
              {/* Left Side: Customer List */}
              <section className="flex flex-col flex-grow w-full h-full max-h-screen overflow-auto">
                {chats.customer.map((individualCustomer) => (
                  <div
                  onClick={()=>setCurrentChatRoom(individualCustomer.chatRoom[0].id)}
                    key={individualCustomer.id}
                    className="flex items-center gap-2 p-2"
                  >
                    <UserRoundIcon />
                    {individualCustomer.email}
                  </div>
                ))}
              </section>

              {/* Separator (Only visible when chats exist) */}
              <div className="w-px bg-gray-500 opacity-50" />

              {/* Right Side: Chat Section */}
              <section className="flex-grow w-full h-full">
                <ConversationWindow chatRoomId={currentChatRoom}></ConversationWindow>
              </section>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full my-auto">
              <Image
                src={"/brand-asset-heart.png"}
                alt="No conversation to show"
                height={100}
                width={100}
              />
              <p className="text-xs text-gray-600">
                No conversations to show right now! 🫰🏻
              </p>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
