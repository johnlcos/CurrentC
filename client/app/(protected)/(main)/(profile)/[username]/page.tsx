"use client";
import { useContext, useEffect, useState } from "react";
import { FollowButton } from "@/components/FollowButton";
import { SessionContext } from "@/app/(protected)/layout";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { ProfileFeed } from "@/components/ProfileFeed";
import { socket } from "@/socket";

export default function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  const { userSession, setUserSession } = useContext(SessionContext);
  // store the profile information in state
  // const [username, setUsername] = useState<string>(params.username);
  const [displayName, setDisplayName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");
  const [profileId, setProfileId] = useState<string>("");
  // store status in state for conditional rendering
  const [uploading, setUploading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // store the previous profile info in state for canceling updates
  const [prevProfile, setPrevProfile] = useState<{
    displayName: string;
    description: string;
    avatarUrl: string | null;
  }>({
    displayName: "",
    description: "",
    avatarUrl: "",
  });
  // store the path and file in state when uploading a new avatar
  const [newAvatar, setNewAvatar] = useState<{
    path: string;
    file: File | null;
  }>({ path: "", file: null });
  // store the number of followers and following in state
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);

  const router = useRouter();

  // get the profileId from session if it is the users profile, or search params if someone else

  //! Might not need this
  // after updating info, get the new session which includes updated username in meta data and update the session context for use in sidebar
  const getCurrentSession = async () => {
    const response = await fetch("http://localhost:8080/auth/session");
    const json = await response.json();
    const session = await json.data.session;
    console.log(session);
    setUserSession(session);
  };
  // on render and after updates cause router.push, fetch the profile info and the updated session
  useEffect(() => {
    const fetchProfileInfo = async () => {
      const response = await fetch(
        `http://localhost:8080/users/info?user=${params.username}`
      );
      const json = await response.json();
      console.log("fetchProfileInfo: ", json);
      setDisplayName(json.data[0].display_name);
      setProfileId(json.data[0].id);
      setDescription(json.data[0].description || "");
      setAvatarUrl(json.data[0].profile_avatar);
      setFollowers(json.followers);
      setFollowing(json.following);
      setLoading(false);
    };

    fetchProfileInfo();
    getCurrentSession();
  }, []);

  const handleStartEdits = () => {
    setEditing(true);
    setPrevProfile({ displayName, description, avatarUrl });
  };

  const handleSaveEdits = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", profileId);
    if (newAvatar.file) {
      formData.append("file", newAvatar.file);
      formData.append("path", newAvatar.path);
    }
    const response = await fetch("http://localhost:8080/users/edit", {
      method: "POST",
      body: formData,
    });
    const url = await response.json();
    console.log("url", url);
    if (url && url.publicUrl) {
      setAvatarUrl(url.publicUrl);
    }
    getCurrentSession();
    setEditing(false);
  };

  const handleCancelEdits = () => {
    setDisplayName(prevProfile.displayName);
    setDescription(prevProfile.description);
    setAvatarUrl(prevProfile.avatarUrl);
    setEditing(false);
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!editing) return;

    // setUploading(true);

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = event.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    const fileExt = file.name.split(".").pop();
    const fileName = `avatar_${profileId}.${fileExt}?date=${Date.now()}`;
    const filePath = `${fileName}`;
    setNewAvatar({ path: filePath, file: file });
  };

  const handleStartMessage = async () => {
    const response = await fetch(
      `http://localhost:8080/messages/room?userId=${profileId}`,
      {
        method: "POST",
      }
    );
    const result = await response.json();
    const chatId = result.chatId;
    const user = userSession?.user.user_metadata.display_name;
    console.log("Start Chatroom: ", chatId);
    if (chatId) {
      console.log("Emmitting join_room");
      socket.emit("join_room", { chatId, user });
    }

    router.push(`/${params.username}/${chatId}`);
  };

  return loading ? null : (
    <div className="w-full flex flex-col items-center">
      <form
        id="header"
        className="w-full flex flex-col items-center xl:flex-row 
        xl:content-between px-5 py-8 gap-8 h-[575px] md:h-[525px] lg:h-[540px] xl:h-[325px]"
        encType="multipart/form-data"
        onSubmit={handleSaveEdits}
      >
        <div className="flex flex-col items-center w-min gap-6">
          <label
            htmlFor="avatarUpload"
            className="relative inline-block w-48 h-48"
          >
            <Avatar url={avatarUrl} type="profile" />
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              className="opacity-0 absolute inset-0 w-full h-full enabled:cursor-pointer disabled:invisible"
              onChange={handleAvatarChange}
              disabled={uploading || !editing}
            />
          </label>

          {!editing ? (
            <h1 className="text-[#E4E6EB]">{displayName}</h1>
          ) : (
            <input
              className="resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600focus:ring-blue-500 focus:border-blue-500 text-center"
              name="displayName"
              id="edit-profile-displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            ></input>
          )}
        </div>
        <div className="flex w-full h-full xl:w-[500px] items-center">
          {!editing ? (
            <p className="w-full h-full text-[#E4E6EB] p-2 break-all">
              {description}
            </p>
          ) : (
            <textarea
              className="p-2 w-full h-full resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600 focus:ring-blue-500 focus:border-blue-500 break-all"
              name="description"
              id="edit-profile-description"
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
        </div>
        <div className="flex w-10/12 items-center justify-start gap-2 flex-col xl:items-start xl:h-full xl:w-min">
          <div className="flex gap-2 xl:flex-col">
            <p className="text-white flex gap-1">
              {following}
              <span className="text-[#71767A]">Following</span>
            </p>
            <p className="text-white flex gap-1">
              {followers}
              <span className="text-[#71767A]">Followers</span>
            </p>
          </div>
          <div className="flex xl:flex-col gap-2">
            {userSession && userSession.user.id !== profileId ? (
              <FollowButton
                followed_id={profileId}
                setFollowers={setFollowers}
              />
            ) : !editing ? (
              <button
                onClick={handleStartEdits}
                className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 
                font-medium rounded-lg text-sm transition 
                duration-300 w-[100px] h-[32px] flex 
                justify-center items-center"
                disabled={
                  prevProfile.displayName === displayName &&
                  prevProfile.description === description &&
                  prevProfile.avatarUrl === avatarUrl
                }
              >
                Save Edits
              </button>
            )}
            {editing ? (
              <button
                onClick={handleCancelEdits}
                className="text-white bg-red-700 hover:bg-red-800 
                font-medium rounded-lg text-sm transition 
                duration-300 w-[100px] h-[32px] 
                flex justify-center items-center"
              >
                Cancel
              </button>
            ) : null}
            {userSession && userSession.user.id !== profileId && (
              <button
                className="text-white bg-green-700 hover:bg-green-800 
            font-medium rounded-lg text-sm transition 
            duration-300 w-[100px] h-[32px] 
            flex justify-center items-center"
                onClick={handleStartMessage}
              >
                Message
              </button>
            )}
          </div>
        </div>
      </form>

      <ProfileFeed id={profileId} />
    </div>
  );
}
