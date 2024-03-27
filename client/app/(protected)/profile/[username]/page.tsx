"use client";
import { useContext, useEffect, useState } from "react";
import { FollowButton } from "@/components/follow-button";
import { SessionContext } from "@/app/(protected)/layout";
import { FaUserCircle } from "react-icons/fa";
import { MainFeed } from "@/components/main-feed";
import { useRouter } from "next/navigation";

export default function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  const [username, setUsername] = useState<string>(params.username);
  const [description, setDescription] = useState<string>("");
  const [profileAvater, setProfileAvatar] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);

  const router = useRouter();

  const { userSession, setUserSession } = useContext(SessionContext);
  const profileId =
    !searchParams.id && userSession ? userSession.user.id : searchParams.id;

  const fetchProfileInfo = async () => {
    const response = await fetch(
      `http://localhost:8080/users/info?id=${profileId}`
    );
    const json = await response.json();
    setDescription(json.data[0].description);
    setProfileAvatar(json.data[0].profile_avatar);
  };

  const getCurrentSession = async () => {
    const response = await fetch("http://localhost:8080/auth/session");
    const json = await response.json();
    const session = await json.data.session;
    setUserSession(session);
  };

  useEffect(() => {
    fetchProfileInfo();
    getCurrentSession();
  }, []);

  const handleSaveEdits = async () => {
    const response = await fetch("http://localhost:8080/users/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: profileId,
        username,
        description,
      }),
    });
    setEditing(false);
    router.push(`http://localhost:3000/profile/${username}`);
  };

  return (
    <div className="w-full flex flex-col">
      <div id="header" className="w-full flex content-between px-4 py-8">
        <div className="flex flex-col items-center w-2/6 gap-2">
          <FaUserCircle size={200} color="#8A8D91" />
          {!editing ? (
            <h1 className="text-[#E4E6EB]">{username}</h1>
          ) : (
            <input
              className="text-[#E4E6EB] bg-[#17191A] text-center"
              name="username"
              id="edit-profile-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          )}
        </div>
        <div className="w-3/6 h-full">
          {!editing ? (
            <p className="w-full h-full text-[#E4E6EB] pr-3">{description}</p>
          ) : (
            <textarea
              className="w-full h-full text-[#E4E6EB] bg-[#17191A] pr-3"
              name="description"
              id="edit-profile-description"
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
        </div>
        <div className="w-1/6">
          {searchParams.id ? (
            <FollowButton followed_id={searchParams.id} />
          ) : !editing ? (
            <button
              onClick={() => setEditing(true)}
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSaveEdits}
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center"
            >
              Save Edits
            </button>
          )}
        </div>
      </div>
      <MainFeed type="profile" id={profileId} />
    </div>
  );
}
