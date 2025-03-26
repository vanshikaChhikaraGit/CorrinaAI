"use client";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CustomSidebar from "@/components/Custom-Sidebar";
import { MaxWidthWrapper } from "@/components/max-widht-wrapeer";
import { PlanProvider } from "@/context/Plan-Context";
import { DomainProvider } from "@/context/Domain-Context";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <CustomSidebar />
        <DomainProvider>
        <PlanProvider>
          {children}
          </PlanProvider>
          </DomainProvider>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
