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
  const [prevProfile, setPrevProfile] = useState({
    username: "",
    description: "",
  });

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

  const handleStartEdits = () => {
    setEditing(true);
    setPrevProfile({ username: username, description: description });
  };

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

  const handleCancelEdits = () => {
    setUsername(prevProfile.username);
    setDescription(prevProfile.description);
    setEditing(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        id="header"
        className="w-full flex flex-col items-center lg:flex-row lg:content-between px-4 py-8 gap-8"
      >
        <div className="flex flex-col items-center w-min gap-2">
          <FaUserCircle size={200} color="#8A8D91" />
          {!editing ? (
            <h1 className="text-[#E4E6EB]">{username}</h1>
          ) : (
            <input
              className="resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600focus:ring-blue-500 focus:border-blue-500 text-center"
              name="username"
              id="edit-profile-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          )}
        </div>
        <div className="w-full h-full">
          {!editing ? (
            <p className="w-full h-full text-[#E4E6EB] p-2">{description}</p>
          ) : (
            <textarea
              className="p-2 w-full h-full resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600focus:ring-blue-500 focus:border-blue-500"
              name="description"
              id="edit-profile-description"
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
        </div>
        <div className="w-min h-full flex flex-col justify-between items-start">
          {searchParams.id ? (
            <FollowButton followed_id={searchParams.id} />
          ) : !editing ? (
            <button
              onClick={handleStartEdits}
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
          {editing ? (
            <button
              onClick={handleCancelEdits}
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
      <MainFeed type="profile" id={profileId} />
    </div>
  );
}
