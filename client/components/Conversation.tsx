import Link from "next/link";
import { Avatar } from "./Avatar";

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
  const convertToTime12Hour = (isoString: Date) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Link href={`/${username}/${chatroomId}`}>
      <Avatar url={profile_avatar} type="conversation" />
      <div>
        <p>{display_name}</p>
        <p>{convertToTime12Hour(lastMessageSentAt)}</p>
      </div>
    </Link>
  );
};
