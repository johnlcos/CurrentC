import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export const Avatar = ({
  url,
  type,
}: {
  url: string | null | undefined;
  type: "profile" | "feed" | "search";
}) => {
  let size: number;
  switch (type) {
    case "profile":
      size = 200;
      break;
    case "feed":
      size = 35;
      break;
    case "search":
      size = 35;
      break;
    default:
      // Default size if type doesn't match any case
      size = 35;
      break;
  }
  return (
    <div className={`h-[${size}px] w-[${size}px] relative`}>
      {url ? (
        <Image
          src={url}
          alt="Profile Picture"
          style={{ borderRadius: "50%" }}
          fill
        />
      ) : (
        <FaUserCircle
          size={size}
          color="#8A8D91"
          className={type === "profile" ? "absolute inset-0" : ""}
        />
      )}
    </div>
  );
};
