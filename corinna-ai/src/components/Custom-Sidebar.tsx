"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  Ghost,
  LogOut,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Mail,
  PlusCircle,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import DomainForm from "@/forms/domain-form";
import { useEffect, useState } from "react";
import { getDomains } from "@/app/actions/getDomains";
import SkeletonDemo from "./skeletons/list-skeleton";
import { useDomain } from "@/context/Domain-Context";

const CustomSidebar = () => {

  const {loading,domains} = useDomain()
  const domainList = domains??[]
  
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="font-bold">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={20}
            height={20}
            alt="company logo"
            className="m-1"
          ></Image>
          CorinnaAI
        </div>
        <div className="m-0.5 border border-b-gray-200 shadow-lg" />
      </SidebarHeader>
      <SidebarContent>

        {/* dashboard  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Link href={"/dashboard"}>
              <div className="flex items-center hover:bg-gray-200/40 hover:cursor-pointer hover:drop-shadow-md p-1 border border-none rounded-lg">
                <LayoutDashboard className="mr-1" size={15} />
                Dashboard
              </div>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* conversations  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Link href={"/conversations"}>
              <div className="flex items-center  hover:bg-gray-200/40 hover:cursor-pointer hover:drop-shadow-md p-1 border border-none rounded-lg">
                <MessageSquareText className="mr-1" size={15} />
                Conversations
              </div>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* settings  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Link href={"/settings"}>
              <div className="flex items-center  hover:bg-gray-200/40 hover:cursor-pointer hover:drop-shadow-md p-1 border border-none rounded-lg">
                <Settings className="mr-2" size={15} /> Settings
              </div>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* email marketing  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Link href={"/email-marketing"}>
              <div className="flex items-center hover:bg-gray-200/40 hover:cursor-pointer hover:drop-shadow-md p-1 border border-none rounded-lg">
                <Mail className="mr-2" size={15} />
                Email Marketing
              </div>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator></SidebarSeparator>

         {/* add domains  */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* // a dialog which will appear when user clicks on the plus button
         the content of dialog box will be the form element which will take domain name validate it and
         use server actions to store in the db  */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Add Domain
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-xl shadow-xl sm:max-w-lg">
                <DialogHeader></DialogHeader>
                <DomainForm />
              </DialogContent>
            </Dialog>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarSeparator></SidebarSeparator>

      {/* user's domain  */}
      <SidebarGroup>
        <Button variant={"outline"}>Your Domains</Button>
  <SidebarGroupContent>
    <ul>
      {domainList.length > 0 ? (
        domainList.map((domain, index) => (
          <Link href={`/settings/${domain.name}`} key={index}>
            <li>
              <div className="flex items-center justify-center mt-2">
                <Image
                  src={domain.icon}
                  alt="logo"
                  width={30}
                  height={30}
                  className="rounded-lg mr-1"
                />
                <p className="font-semibold text-md">{domain.name}</p>
              </div>
            </li>
          </Link>
        ))
      ) : (
        // Skeleton UI when domains are loading or empty
        <>
          <li className="bg-gray-200/40 animate-pulse h-8 m-1 w-full rounded-md my-1"></li>
          <li className="bg-gray-200/40 animate-pulse h-8 m-1 w-full rounded-md my-1"></li>
        </>
      )}
    </ul>
  </SidebarGroupContent>
    </SidebarGroup>

{/* signout and sidebar trigger */}
      <SidebarFooter>
        <div className="flex items-center">
          <LogOut />
          <SignOutButton>
            <Button variant={"ghost"} className="sm ml-0">
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SidebarFooter>
      <SidebarTrigger />
    </Sidebar>
  );
};

export default CustomSidebar;
