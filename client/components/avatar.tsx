import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export const Avatar = ({
  url,
  type,
}: {
  url: string | null | undefined;
  type: "profile" | "feed";
}) => {
  return (
    <div>
      {url ? (
        <Image
          src={url}
          alt="Profile Picture"
          width={type === "profile" ? 200 : 35}
          height={type === "profile" ? 200 : 35}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <FaUserCircle
          size={type === "profile" ? 200 : 35}
          color="#8A8D91"
          className={type === "profile" ? "absolute inset-0" : ""}
        />
      )}
    </div>
  );
};
