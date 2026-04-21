"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

function getUptime() {
  const start = new Date("2020-07-01");
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return `${y}y ${m}m`;
}

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bar" role="status" aria-label="System status">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="text-accent-green">SYS:ONLINE</span>
          </span>
          <span className="hidden text-border sm:inline">|</span>
          <span className="hidden sm:inline">UPTIME: {getUptime()}</span>
        </div>

        {/* Center */}
        <div className="hidden items-center gap-4 md:flex">
          <span>LOC: {profile.location}</span>
          <span className="text-border">|</span>
          <span className="text-accent-amber">STATUS: Open to roles</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="font-mono">{time || "--:--:--"}</span>
        </div>
      </div>
    </div>
  );
}
