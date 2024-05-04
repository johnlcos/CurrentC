"use client";

import { MainFeed } from "@/components/MainFeed";
import { SessionContext } from "@/app/(protected)/layout";
import { useContext } from "react";

export default function Home() {
  const { userSession } = useContext(SessionContext);
  return (
    <div className="w-full flex flex-col">
      {userSession && <MainFeed type="main" />}
    </div>
  );
}
