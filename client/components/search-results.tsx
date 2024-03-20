"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchResultType {
  id: string;
  username: string;
  profile_avatar: string;
}

export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

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
    <div>
      {searchResults.map((result) => {
        return <h1 key={result.id}>{result.username}</h1>;
      })}
    </div>
  ) : null;
};
