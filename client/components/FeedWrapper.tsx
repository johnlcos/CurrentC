"use client";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { MessageWrapper } from "./MessageWrapper";
import { OverviewContext, SessionContext } from "@/app/(protected)/layout";
import { useContext, useState, useRef, useEffect } from "react";
import { DropDown } from "./DropDown";
import { Avatar } from "./Avatar";
import { getTimeDifferenceInMinutes } from "@/utils";

interface FeedWrapperProps {
  author: string | undefined;
  author_id: string;
  profile_avatar: string | null | undefined;
  id: string;
  likes: number;
  dislikes: number;
  content: string;
  created_at: string;
  type?: string;
  author_username: string | null | undefined;
}

export const FeedWrapper = ({
  author,
  author_id,
  profile_avatar,
  id,
  likes,
  dislikes,
  content,
  created_at,
  type,
  author_username,
}: FeedWrapperProps) => {
  const router = useRouter();
  let dropDownRef = useRef<HTMLDivElement>(null);

  const { showModal, setShowModal, setSelectedFeedID } =
    useContext(OverviewContext);

  const { userSession } = useContext(SessionContext);

  const [dropDown, setDropDown] = useState(false);

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFeedID(id);
    setShowModal(true);
  };

  const handleDropDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleProfileClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${author_username}`);
  };

  return (
    <div
      className="outline h-[200px] w-[90%] md:w-[80%] max-w-[500px] 
      flex flex-col justify-between shadow-lg outline-none bg-surface rounded-lg cursor-pointer"
      onClick={() => router.push(`/feed/${id}`)}
    >
      <div className="flex m-2 w-full">
        <div onClick={handleProfileClick} className="h-[35px] w-[35px]">
          <Avatar url={profile_avatar} type="feed" />
        </div>
        <div className="flex flex-col w-full">
          <div
            id="feed-wrapper-identifiers"
            className="w-[94%] flex justify-between items-center ml-3"
          >
            <div className="flex justify-center items-center">
              <div
                className="text-[14px] bolded text-text-white"
                onClick={handleProfileClick}
              >
                {author}
              </div>
              <p className="opacity- text-[12px] ml-1 text-subtext-color">{`@${author_username}`}</p>
              <div className="opacity- text-[12px] ml-1 text-subtext-color">{`· ${getTimeDifferenceInMinutes(
                created_at
              )}`}</div>
            </div>
            <div className="flex">
              <div className="feed-dropdown-icon" ref={dropDownRef}>
                <button
                  className="text-subtext-color relative"
                  onClick={handleDropDown}
                >
                  ...
                  {dropDown && (
                    <div className="z-10 absolute bg-surface rounded-xl shadow-md">
                      <DropDown menu={["follow", "add/remove", "block"]} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="ml-3">
            <MessageWrapper message={content} />
          </div>
        </div>
      </div>

      <div id="feed-footer" className="text-[13px] mx-3 flex justify-between">
        <div
          id="views-likes-dislike-box"
          className="flex justify-between w-1/3"
        >
          <div className="flex gap-4">
            <div className="flex items-center justify-center group">
              <span className="feed-like-icon">
                <BiLike size={17} />
              </span>
              <span className="group-hover:text-green-500 text-subtext-color">
                {likes}
              </span>
            </div>
            <div className="flex items-center justify-center group">
              <div className="feed-dislike-icon">
                <BiDislike size={17} />
              </div>
              <span className="group-hover:text-red-500 text-subtext-color">
                {dislikes}
              </span>
            </div>
          </div>
        </div>
        {type !== "Modal" && (
          <div className="flex items-center justify-center group">
            <button onClick={handleReplyClick} className="feed-reply-icon">
              <FaReply />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
