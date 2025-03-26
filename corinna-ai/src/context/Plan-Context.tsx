"use client"

import { getUserSubscriptionPlan } from "@/app/actions/getSubscriptionPlan";
import { useUser } from "@clerk/nextjs";
import { error } from "console";
import { createContext, useContext, useEffect, useState } from "react";


type Plan = "STANDARD" | "PRO" | "ULTIMATE" 

interface PlanContextType {
    plan:Plan|null;
    loading:boolean;
}

const PlanContext = createContext<PlanContextType|undefined>(undefined)

export const PlanProvider = ({children}:{children:React.ReactNode})=>{
    const { user,isLoaded } = useUser()
    const [plan, setPlan] = useState<Plan|null>(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(!isLoaded||!user)return;

        const fetchPlan = async ()=>{
            setLoading(true)
            const plan = await getUserSubscriptionPlan()
            setPlan(plan as Plan | null)
            setLoading(false)
        }

        fetchPlan()
    },[isLoaded,user])

    return (
        <PlanContext.Provider value={{plan,loading}}>{children}</PlanContext.Provider>
    )


}

export const usePlan = ()=>{
    const context = useContext(PlanContext)
    if(!context){
        throw new Error("useplan must be usd within a plan provider ")
    }
    return context;
}

