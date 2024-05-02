import { ChatRoom } from "@/components/ChatRoom";

interface ChatRoomPageProps {
  params: {
    username: string;
    chatId: string;
  };
}
const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  return (
    <div className="h-full w-full">
      <ChatRoom chatId={params.chatId} />
    </div>
  );
};

export default ChatRoomPage;
