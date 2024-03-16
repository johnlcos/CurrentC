"use client";
import { userInfo } from "os";
import { SideNavBar } from "../side-navbar";
import { MainFeed } from "@/components/main-feed";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoRes = await fetch("http://localhost:8080/auth/getUserInfo");
      const userInfo = await userInfoRes.json();
      console.log(userInfo);
    };

    getUserInfo();
  }, []);

  return (
    <div id="main-container" className="h-screen w-full flex bg-slate-100">
      <div className="w-2/12 p-0">
        <SideNavBar />
      </div>
      <div className="w-6/12">
        <MainFeed />
      </div>
      <div className="w-4/12 h-full bg-white"></div>
    </div>
  );
}
