"use client";
import { SideNavBar } from "../../components/SideNavbar";
import { useEffect, useState, createContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { ReplyFeedModal } from "@/components/ReplyFeedModal";

interface OverviewContextSchema {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  selectedFeedID: string;
  setSelectedFeedID: (id: string) => void;
}

interface SessionContextSchema {
  userSession: Session | null;
  setUserSession: (sess: Session) => void;
}

export const SessionContext = createContext<SessionContextSchema>({
  userSession: null,
  setUserSession: () => {},
});
export const OverviewContext = createContext<OverviewContextSchema>({
  showModal: false,
  setShowModal: () => {},
  selectedFeedID: "",
  setSelectedFeedID: () => {},
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

  const router = useRouter();
  const pathname = usePathname();

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
  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      <OverviewContext.Provider
        value={{
          showModal,
          setShowModal,
          selectedFeedID,
          setSelectedFeedID,
        }}
      >
        <div className="w-full h-full bg-background flex">
          <div className="z-10 relative">
            <ReplyFeedModal />
          </div>
          {!isLoading && (
            <div
              id="main-wrapper"
              className="flex w-full h-full justify-center"
            >
              <div
                id="left-wrapper"
                className="w-[80px] md:w-[120px] lg:w-[220px] h-full"
              >
                <div className="fixed w-[80px] md:w-[120px] lg:w-[220px] h-full">
                  <SideNavBar />
                </div>
              </div>
              <div
                id="middle-right-wrapper"
                className="flex-grow lg:flex-grow-0 lg:w-[800px] xl:w-[1050px] h-full"
              >
                {children}
              </div>
            </div>
          )}
        </div>
      </OverviewContext.Provider>
    </SessionContext.Provider>
  );
}
