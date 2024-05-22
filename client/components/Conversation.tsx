import Link from "next/link";
import { Avatar } from "./Avatar";
import { socket } from "@/socket";
import { SessionContext } from "@/app/(protected)/layout";
import { useContext } from "react";

interface ConversationProps {
  chatroomId: string;
  username: string;
  display_name: string;
  profile_avatar: string;
  lastMessageSentAt: Date;
}

export const Conversation = ({
  chatroomId,
  username,
  display_name,
  profile_avatar,
  lastMessageSentAt,
}: ConversationProps) => {
  const { userSession, setUserSession } = useContext(SessionContext);
  const formatTime = (isoString: Date) => {
    const date = new Date(isoString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  const handleStartMessage = async () => {
    const user = userSession?.user.user_metadata.display_name;
    const chatId = chatroomId;
    if (chatroomId) {
      console.log("Emmitting join_room: ", chatroomId);
      socket.emit("join_room", { chatId, user });
    }
  };

  return (
    <Link href={`/${username}/${chatroomId}`} onClick={handleStartMessage}>
      <Avatar url={profile_avatar} type="conversation" />
      <div>
        <p>{display_name}</p>
        <p>{formatTime(lastMessageSentAt)}</p>
      </div>
    </Link>
  );
};
