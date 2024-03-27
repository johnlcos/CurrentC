"use client";

import { usePathname } from "next/navigation";
import { UserSearch } from "./user-search";

export const RightSideWrapper = () => {
  const pathname = usePathname();
  return <div>{pathname === "/overview" && <UserSearch />}</div>;
};
