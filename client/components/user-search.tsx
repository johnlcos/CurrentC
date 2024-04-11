"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { SearchResults } from "./search-results";
import { useDebounce } from "use-debounce";

export const UserSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  // store the search bar text in state
  const [text, setText] = useState<string>("");

  // update query after user stops typeing for 0.5s with the current value in input
  const [query] = useDebounce(text, 500);

  // when query changes, if it is empty clear search params, else push the story to the search params
  useEffect(() => {
    const handleSearch = () => {
      router.push(`/overview?search=${query}`);
    };
    if (pathname !== "/overview") return;
    else if (!query) router.push("/overview");
    else handleSearch();
  }, [query, pathname, router]);

  return (
    <div className="py-4 px-10">
      <div className="flex bg-white items-center p-2 rounded-md shadow-sm gap-1 max-w-[300px]">
        <BiSearch size={25} />
        <input
          type="text"
          placeholder="Search users..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-2"
        />
      </div>
      {text.length ? <SearchResults setText={setText} /> : null}
    </div>
  );
};
