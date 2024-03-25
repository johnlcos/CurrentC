import { OverviewContext } from "@/app/(protected)/layout";
import fetchSpecificFeed from "@/hooks/fetchSpecficFeed";
import { FeedSchema } from "@/types";
import { useContext, useEffect, useState, useRef } from "react";
import { FeedWrapper } from "./feed-wrapper";
import { NewFeedInputBox } from "./new-feed-input-box";

export const ReplyFeedModal = () => {
  const [selectedFeed, setSelectedFeed] = useState<FeedSchema | null>(null);

  const { showModal, setShowModal, selectedFeedID } =
    useContext(OverviewContext);

  const lastFetchedID = useRef<string | null>(null);

  const handleCloseModal = (e: React.MouseEvent) => {
    setShowModal(false);
    setSelectedFeed(null);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (
      showModal &&
      (selectedFeedID !== lastFetchedID.current || selectedFeed === null)
    ) {
      fetchSpecificFeed({ feedID: selectedFeedID }).then((data) => {
        setSelectedFeed(data);
        lastFetchedID.current = selectedFeedID;
      });
    }
  }, [selectedFeedID, showModal]);

  return (
    <div>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className="fixed left-0 top-0 bg-black bg-opacity-50 
          w-screen h-screen flex justify-center items-center"
        >
          {selectedFeed && (
            <div
              className="bg-[#3E4042] rounded shadow-md p-2 w-[50%] 
              h-max flex flex-col justify-center items-center 
              gap-y-5 z-10"
              onClick={handleContentClick}
            >
              <div className="w-[90%] flex justify-center items-center">
                <FeedWrapper
                  author={selectedFeed.profiles.username}
                  id={selectedFeedID}
                  likes={selectedFeed.like_count}
                  dislikes={selectedFeed.dislike_count}
                  content={selectedFeed.content}
                  created_at={selectedFeed.created_at}
                  type={"Modal"}
                />
              </div>
              <NewFeedInputBox type="REPLY" replyToId={selectedFeedID} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
