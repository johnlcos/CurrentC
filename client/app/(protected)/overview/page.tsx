"use client";
import { userInfo } from "os";
import { MainFeed } from "@/components/main-feed";
import { useEffect, useState } from "react";
import { UserSearch } from "@/components/user-search";

export default function Home() {
  return (
    <div className="bg-slate-100 w-full flex flex-col">
      <MainFeed />
    </div>
  );
}
