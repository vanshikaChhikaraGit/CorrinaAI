"use client"

import { SignIn } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
  return <div className="w-full flex-1 flex items-center justify-center my-auto">
    <SignIn fallbackRedirectUrl={"/welcome"} />
  </div>
}

export default Page;
