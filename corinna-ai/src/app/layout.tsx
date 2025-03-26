"use client"
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { DomainProvider } from "@/context/Domain-Context";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased min-h-[calc(100vh-1px)] flex flex-col">
        <ClerkProvider>
          <DomainProvider>
            {children}
            </DomainProvider>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}

