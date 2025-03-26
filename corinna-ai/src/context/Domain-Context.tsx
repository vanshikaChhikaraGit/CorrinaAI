//loading, id, name, icon,
"use client"

import React, { createContext, useState, useEffect, useContext } from "react";
import { getDomains } from "@/app/actions/getDomains";

interface DomainContextType {
  domains:DomainResponse[]|undefined;
  loading: boolean;
}
interface DomainResponse {
  id: string;
  name: string;
  icon: string;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const DomainProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState<DomainResponse[] | undefined>(undefined);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const res = await getDomains();
        const updatedDomains = (res || []).map((domain) => ({
          ...domain,
          icon: domain.icon ? `https://ucarecdn.com/${domain.icon}/` : "", // Handle missing icon
        }));

        setDomains(updatedDomains);
        
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  return (
    <DomainContext.Provider value={{ domains,loading }}>{children}</DomainContext.Provider>
  )
};

export const useDomain = ()=>{
    const context = useContext(DomainContext)
    if(!context){
        throw new Error("usedomain must be usd within a plan provider ")
    }
    return context;
}
