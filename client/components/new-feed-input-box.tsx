"use client";
import { FeedSchema } from "@/types";
import { useState, useContext } from "react";
import { SessionContext } from "@/app/(protected)/layout";

interface NewFeedInputBoxProps {
  //MAYBE MOVE SETALLFEED TO CONTEXT
  setAllFeed: React.Dispatch<React.SetStateAction<FeedSchema[]>>;
  type: "POST" | "REPLY";
  replyToId: string | undefined;
}

export const NewFeedInputBox = ({
  setAllFeed,
  type,
  replyToId,
}: NewFeedInputBoxProps) => {
  const [value, setValue] = useState("");

  const { userSession } = useContext(SessionContext);

  const handleClick = async () => {
    if (userSession) {
      const fetchUrl =
        type === "POST"
          ? `http://localhost:8080/feed/create?id=${userSession.user.id}`
          : `http://localhost:8080/feed/reply?id=${replyToId}`;
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          author_id: userSession.user.id,
          type,
          replyToId,
        }),
      });
      const data = await response.json();
      console.log(data);
      setAllFeed(data);
      setValue("");
    } else {
      return null;
    }
  };
  return (
    <div className="flex justify-center h-[150px] w-full mb-5">
      <div className="w-[90%] md:w-[80%] max-w-[500px]">
        <div className="m-2 flex flex-col">
          <textarea
            className="p-2 w-full h-[100px] resize-none text-sm text-text-white bg-surface
            rounded-lg border border-gray-300 focus:ring-2 focus:outline-none
            focus:ring-primary-500 focus:border-primary-500"
            name="message"
            id="new-feed-textarea"
            placeholder={
              type === "POST" ? "What is happening?!" : "Post your reply!"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className="flex justify-end text-[#E4E6EB]">
            <button
              onClick={handleClick}
              disabled={!value}
              className="bg-[#D7DBDC] rounded-xl px-3 py-0.5 my-2 
              text-[#0F1419] hover:bg-[#aeb1b2] 
              disabled:text-[#88898A] disabled:hover:bg-[#D7DBDC]"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
