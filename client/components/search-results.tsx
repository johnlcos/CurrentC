"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { OverviewContext } from "@/app/(protected)/layout";

interface SearchResultType {
  id: string;
  username: string;
  profile_avatar: string;
}

export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const session = useContext(OverviewContext);

  const fetchSearchResults = async () => {
    if (searchValue) {
      console.log("searchValue: ", searchValue);
      const searchString = `http://localhost:8080/users?name=${searchValue}`;
      console.log("searchString: ", searchString);
      const response = await fetch(searchString);
      const json = await response.json();
      setSearchResults(json.data);
      console.log("searchResults: ", searchResults);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchValue]);

  return searchResults.length > 0 ? (
    <div className="p-2">
      {searchResults.map((result) => {
        return (
          <div key={result.id} className="flex items-center justify-between">
            <Link
              href={`/profile/${result.username}`}
              className="flex items-center w-full gap-4"
            >
              <FaUserCircle />
              <h1>{result.username}</h1>
            </Link>
            {result.id !== session?.user.id ? <button>Follow</button> : null}
          </div>
        );
      })}
    </div>
  ) : null;
};
