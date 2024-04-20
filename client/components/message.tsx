interface MessageProps {
  content: string;
  display_name: string;
  created_at: string;
  type: "sent" | "received";
}

export const Message = ({
  content,
  display_name,
  created_at,
  type,
}: MessageProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-primary-500 self-end" : "bg-surface self-start"
      } w-5/6 sm:w-2/3 p-4 rounded-2xl shadow-md`}
    >
      <div className="flex items-center justify-between border-b border-text-white">
        <p className="text-[14px] bolded text-text-white">{display_name}</p>
        <p className="opacity- text-[14px] ml-1 text-text-white">
          {created_at === "0 minutes"
            ? "now"
            : created_at === "1 minutes"
            ? "1 minute ago"
            : `${created_at} ago`}
        </p>
      </div>
      <p className="text-[14px] py-3 text-[#E4E6EB]">{content}</p>
    </div>
  );
};
