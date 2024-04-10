"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { SessionContext } from "@/app/(protected)/layout";
import { FollowButton } from "./follow-button";
import { Avatar } from "./avatar";

interface SearchResultType {
  id: string;
  username: string;
  profile_avatar: string;
  display_name: string;
}

export const SearchResults = ({
  setText,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // pull the search params from the url
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  // store the search results in state
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { userSession } = useContext(SessionContext);

  const fetchSearchResults = async () => {
    if (searchValue) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/users?name=${searchValue}`
      );

      const json = await response.json();
      // console.log(json);
      setSearchResults(json.data);
      setLoading(false);
    }
  };

  // whenever the search params change, fetch the backend for results and update state for rendering
  useEffect(() => {
    fetchSearchResults();
  }, [searchValue]);

  return searchResults.length > 0 ? (
    loading ? (
      "loading"
    ) : (
      <div className="py-2 flex flex-col gap-2">
        {searchResults.map((result) => {
          return (
            <div
              key={result.id}
              className="flex items-center justify-between bg-white rounded-md shadow-sm py-2 px-2"
            >
              <Link
                href={{
                  pathname: `/${result.username}`,
                }}
                className="flex items-center w-full gap-3 "
                onClick={() => {
                  setText("");
                }}
              >
                <Avatar url={result.profile_avatar} type="search" />
                <h1>{result.display_name}</h1>
              </Link>
              {userSession && result.id !== userSession.user.id ? (
                <FollowButton followed_id={result.id} setFollowers={null} />
              ) : null}
            </div>
          );
        })}
      </div>
    )
  ) : null;
};
