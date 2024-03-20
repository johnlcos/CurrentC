"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export const UserSearch = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const search = useSearchParams();

  const handleSearch = () => {
    console.log("in handleSearch: ", text);
    router.push(`/overview?search=${text}`);
  };

  return (
    <div className="bg-green-700 p-4 shadow-sm">
      <div className="flex bg-white items-center p-2 rounded-md shadow-sm gap-1">
        <BiSearch />
        <input
          type="text"
          placeholder="Search users..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
          className="w-full"
        />
      </div>
    </div>
  );
};
