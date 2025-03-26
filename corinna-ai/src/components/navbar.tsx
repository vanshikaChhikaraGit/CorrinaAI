"use client";
import React, { useState } from "react";
import { MaxWidthWrapper } from "./max-widht-wrapeer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = () => {
  // wip : sidebar and linking of nav list items to particular section on landing page also clerk auth 
  const [menuOpen, setMenuOpen] = useState(false);
  const {isSignedIn} = useAuth()

  return (
    <div className="z-[999] sticky top-0 w-full transition-all bg-white/80 inset-x-0 h-16 border-b border-gray-200 backdrop-blur-lg">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          {/* brand_name */}
          <div className="flex flex-row items-center h-full">
            <Image src={"/logo.png"} alt="logo" width={25} height={18}></Image>
            <Link href="/" className="flex z-40 font-semibold ml-1 text-2xl">
              CorinnaAI
            </Link>
          </div>
          {/* large screens */}
          <div className="hidden lg:flex">
            <ul className="hidden lg:flex gap-8 font-medium">
              <li className="m-1 hover:text-gray-400 cursor-pointer">Home</li>
              <li className="m-1 hover:text-gray-400 cursor-pointer">
                Pricing
              </li>
              <li className="m-1 hover:text-gray-400 cursor-pointer">
                NewsRoom
              </li>
              <li className="m-1 hover:text-gray-400 cursor-pointer">
                Features
              </li>
              <li className="m-1 hover:text-gray-400 cursor-pointer">
                ContactUs
              </li>
            </ul>
            <div className="hidden lg:flex items-center gap-4">
            {isSignedIn?<>
                <SignOutButton>
                    <Button variant={"ghost"} className="sm">Sign Out</Button>
                </SignOutButton>
                <Link href={"/settings"} className={buttonVariants({
                  size:"sm",
                  className:"flex gap-1 items-center"
                })}> Dashboard <ArrowRight className="size-4 ml-1.5"></ArrowRight></Link>
                </>:<>
                <Link href={"/sign-in"} className={buttonVariants({
                  size:"sm",
                  variant:"ghost"
                })}> Sign In </Link>
                <Link href={"/sign-up"} className={buttonVariants({
                  size:"sm",
                  className:"flex gap-1 items-center"
                })}> Sign Up <ArrowRight className="size-4 ml-1.5"></ArrowRight></Link>
                
                </>}
            </div>
          </div>

          {/* medium and small screens  */}
          <div className=" lg:hidden items-center gap-4">
            <button className="text-gray-800 hover:text-white">Sign In</button>
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
              Start Free Trial
            </button>
          </div>
          {/* Menu Button */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Sidebar */}
          <div
            className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-[300px] bg-white shadow-lg border-l border-gray-200 transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col gap-6 text-center p-6 bg-white z-10">
              <li className="hover:text-gray-400 cursor-pointer">Home</li>
              <li className="hover:text-gray-400 cursor-pointer">Pricing</li>
              <li className="hover:text-gray-400 cursor-pointer">NewsRoom</li>
              <li className="hover:text-gray-400 cursor-pointer">Features</li>
              <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
