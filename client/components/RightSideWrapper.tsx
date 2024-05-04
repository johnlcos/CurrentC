"use client";

import { usePathname } from "next/navigation";
import { UserSearch } from "./UserSearch";
import { AccountSettingForm } from "./AccountSettingForm";

export const RightSideWrapper = () => {
  const pathname = usePathname();
  return <div>{pathname === "/overview" && <UserSearch />}</div>;
};
