import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export const Avatar = ({
  url,
  type,
}: {
  url: string | null;
  type: "profile" | "feed";
}) => {
  console.log("Avatar url: ", url);
  return (
    <div>
      {url ? (
        <Image src={url} alt="Profile Picture" width={200} height={200} />
      ) : (
        <FaUserCircle size={200} color="#8A8D91" className="absolute inset-0" />
      )}
    </div>
  );
};
