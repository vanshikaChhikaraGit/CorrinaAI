"use client";
import React, { useState, useEffect } from "react";
import { MaxWidthWrapper } from "./max-widht-wrapeer";
import { THEMES } from "@/constants/themes";
import { Heading } from "./Heading";

const CustomTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"; // Load from localStorage
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  console.log("Current theme:", theme);
console.log("HTML data-theme:", document.documentElement.getAttribute("data-theme"));


  return (
    <div className="mt-2">
     
        <div >
          <h1 className="text-xl font-semibold">Interface</h1>
          <h2 className="mt-2">Select or customize your UI theme</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b mb-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? "bg-base-200 border-2 border-sky-500" : "hover:bg-base-200/50"
              }`}
              onClick={() => {
                setTheme(t);
                document.documentElement.setAttribute("data-theme", t);
                localStorage.setItem("theme", t);
              }}
            >
              {/* Theme Preview Box */}
              <div className="relative h-10 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
     
    </div>
  );
};

export default CustomTheme;
