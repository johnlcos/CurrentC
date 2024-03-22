"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { OverviewContext } from "@/app/(protected)/layout";
import { FollowButton } from "./follow-button";

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
      const response = await fetch(
        `http://localhost:8080/users?name=${searchValue}`
      );
      const json = await response.json();
      setSearchResults(json.data);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchValue]);

  return searchResults.length > 0 ? (
    <div className="py-2">
      {searchResults.map((result) => {
        return (
          <div
            key={result.id}
            className="flex items-center justify-between bg-white rounded-md shadow-sm py-2 px-1"
          >
            <Link
              href={{
                pathname: `/profile/${result.username}`,
                query: { id: result.id },
              }}
              className="flex items-center w-full gap-4 "
            >
              <FaUserCircle size={25} />
              <h1>{result.username}</h1>
            </Link>
            {session && result.id !== session.user.id ? (
              <FollowButton followed_id={result.id} />
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
};