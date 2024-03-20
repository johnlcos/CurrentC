"use client";
import { userInfo } from "os";
import { MainFeed } from "@/components/main-feed";
import { useEffect, useState } from "react";
import { UserSearch } from "@/components/user-search";

export default function Home() {
  const [data, setData] = useState();

  return (
    <div id="main-container" className="h-screen w-full flex bg-slate-100">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-7/12">
          <MainFeed />
        </div>
        <div className="w-full md:w-5/12 h-full bg-white flex flex-col">
          <UserSearch />
        </div>
      </div>
    </div>
  );
}
