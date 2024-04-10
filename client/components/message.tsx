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
    <div className={`${type === "sent" ? "bg-primary-500" : "bg-surface"}`}>
      <p>{content}</p>
      <p>{display_name}</p>
      <p>
        {created_at === "0 minutes"
          ? "now"
          : created_at === "1 minutes"
          ? "1 minute ago"
          : `${created_at} ago`}
      </p>
    </div>
  );
};
