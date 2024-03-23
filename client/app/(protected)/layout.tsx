"use client";
import { SideNavBar } from "../side-navbar";
import { UserSearch } from "@/components/user-search";
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { ReplyFeedModal } from "@/components/reply-feed-modal";
import { FeedSchema } from "@/types";
import fetchSpecificFeed from "@/hooks/fetchSpecficFeed";
import { RightSideWrapper } from "@/components/right-side-wrapper";

interface OverviewContextSchema {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  selectedFeedID: string;
  setSelectedFeedID: (id: string) => void;
  selectedFeed: FeedSchema | null;
  setSelectedFeed: (feed: FeedSchema | null) => void;
}

export const SessionContext = createContext<Session | null>(null);
export const OverviewContext = createContext<OverviewContextSchema>({
  showModal: false,
  setShowModal: () => {},
  selectedFeedID: "",
  setSelectedFeedID: () => {},
  selectedFeed: null,
  setSelectedFeed: () => {},
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFeedID, setSelectedFeedID] = useState<string>("");
  const [selectedFeed, setSelectedFeed] = useState<FeedSchema | null>(null);

  const router = useRouter();
  useEffect(() => {
    const getCurrentSession = async () => {
      const response = await fetch("http://localhost:8080/auth/session");
      const json = await response.json();
      const session: Session = json.data.session;
      if (!session) {
        router.push("http://localhost:3000/");
      } else {
        setUserSession(session);
        setIsLoading(false);
      }
    };

    getCurrentSession();
  }, [router]);

  useEffect(() => {
    console.log("selectedFeedID", selectedFeedID);
    fetchSpecificFeed({ feedID: selectedFeedID }).then((data) => {
      console.log(data);
      setSelectedFeed(data);
    });
  }, [selectedFeedID]);

  return (
    <SessionContext.Provider value={userSession}>
      <OverviewContext.Provider
        value={{
          showModal,
          setShowModal,
          selectedFeedID,
          setSelectedFeedID,
          selectedFeed,
          setSelectedFeed,
        }}
      >
        <div className="w-screen">
          <ReplyFeedModal />
          {!isLoading && (
            <div className="flex w-full">
              <div className="w-1/6 p-0 fixed h-screen">
                <SideNavBar />
              </div>
              <div className="w-full flex">
                <div className="w-1/6"></div>
                <div className="w-5/6 md:w-3/6 flex justify-center">
                  {children}
                </div>
                <div className="w-2/6 hidden md:block"></div>
              </div>
              <div className="w-2/6 p-0 fixed right-0 bg-green-700 h-screen hidden md:block">
                <RightSideWrapper />
              </div>
            </div>
          )}
        </div>
      </OverviewContext.Provider>
    </SessionContext.Provider>
  );
}
