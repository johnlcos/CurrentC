"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { SessionContext } from "@/app/(protected)/layout";
import { FollowButton } from "./follow-button";

interface SearchResultType {
  id: string;
  username: string;
  profile_avatar: string;
}

export const SearchResults = ({
  setText,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const { userSession } = useContext(SessionContext);

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
            className="flex items-center justify-between bg-white rounded-md shadow-sm py-2 px-2"
          >
            <Link
              href={{
                pathname: `/profile/${result.username}`,
                query: { id: result.id },
              }}
              className="flex items-center w-full gap-3 "
              onClick={() => {
                setText("");
              }}
            >
              <FaUserCircle size={25} />
              <h1>{result.username}</h1>
            </Link>
            {userSession && result.id !== userSession.user.id ? (
              <FollowButton followed_id={result.id} />
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
};
