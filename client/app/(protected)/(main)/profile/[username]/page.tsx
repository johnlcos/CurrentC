'use client';
import { useContext, useEffect, useState } from 'react';
import { FollowButton } from '@/components/follow-button';
import { SessionContext } from '@/app/(protected)/layout';
import { FaUserCircle } from 'react-icons/fa';
import { MainFeed } from '@/components/main-feed';
import { useRouter } from 'next/navigation';

export default function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  // store the profile information in state
  const [username, setUsername] = useState<string>(params.username);
  const [description, setDescription] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>('');
  // store status in state for conditional rendering
  const [uploading, setUploading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  // store the previous profile info in state for canceling updates
  const [prevProfile, setPrevProfile] = useState<{
    username: string;
    description: string;
    avatarUrl: string | null;
  }>({
    username: '',
    description: '',
    avatarUrl: '',
  });
  // store the path and file in state when uploading a new avatar
  const [newAvatar, setNewAvatar] = useState<{
    path: string;
    file: File | null;
  }>({ path: '', file: null });

  const router = useRouter();

  const { userSession, setUserSession } = useContext(SessionContext);
  // get the profileId from session if it is the users profile, or search params if someone else
  const profileId =
    !searchParams.id && userSession ? userSession.user.id : searchParams.id;

  const fetchProfileInfo = async () => {
    const response = await fetch(
      `http://localhost:8080/users/info?id=${profileId}`
    );
    const json = await response.json();
    setDescription(json.data[0].description);
    setAvatarUrl(json.data[0].profile_avatar);
  };

  // after updating info, get the new session which includes updated username in meta data and update the session context
  const getCurrentSession = async () => {
    const response = await fetch('http://localhost:8080/auth/session');
    const json = await response.json();
    const session = await json.data.session;
    setUserSession(session);
  };

  // on render and after updates cause router.push, fetch the profile info and the updated session
  useEffect(() => {
    fetchProfileInfo();
    getCurrentSession();
  }, []);

  const handleStartEdits = () => {
    setEditing(true);
    setPrevProfile({ username, description, avatarUrl });
  };

  const handleSaveEdits = async () => {
    const response = await fetch('http://localhost:8080/users/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    setAvatarUrl(prevProfile.avatarUrl);
    setEditing(false);
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!editing) return;

    // setUploading(true);

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `avatar_${profileId}.${fileExt}`;
    const filePath = `${fileName}`;
    setNewAvatar({ path: filePath, file: file });
    // const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div
        id='header'
        className='w-full flex flex-col items-center xl:flex-row xl:content-between px-4 py-8 gap-8'
      >
        <div className='flex flex-col items-center w-min gap-2'>
          {/* {!avatarUrl && <FaUserCircle size={200} color="#8A8D91" />} */}

          <label
            htmlFor='avatarUpload'
            className='relative inline-block w-48 h-48'
          >
            {avatarUrl ? null : (
              <FaUserCircle
                size={200}
                color='#8A8D91'
                className='absolute inset-0'
              />
            )}
            <input
              type='file'
              id='avatarUpload'
              accept='image/*'
              className='opacity-0 absolute inset-0 w-full h-full enabled:cursor-pointer disabled:invisible'
              onChange={handleAvatarChange}
              disabled={uploading || !editing}
            />
          </label>

          {!editing ? (
            <h1 className='text-[#E4E6EB]'>{username}</h1>
          ) : (
            <input
              className='resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600focus:ring-blue-500 focus:border-blue-500 text-center'
              name='username'
              id='edit-profile-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          )}
        </div>
        <div className='w-full h-full'>
          {!editing ? (
            <p className='w-full h-full text-[#E4E6EB] p-2'>{description}</p>
          ) : (
            <textarea
              className='p-2 w-full h-full resize-none rounded-lg text-[#E4E6EB] bg-gray-700 dark-border-gray-600focus:ring-blue-500 focus:border-blue-500'
              name='description'
              id='edit-profile-description'
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
        </div>
        <div className='w-min h-full flex flex-col justify-between items-start'>
          {searchParams.id ? (
            <FollowButton followed_id={searchParams.id} />
          ) : !editing ? (
            <button
              onClick={handleStartEdits}
              className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center'
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSaveEdits}
              className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center'
              disabled={
                prevProfile.username === username &&
                prevProfile.description === description
              }
            >
              Save Edits
            </button>
          )}
          {editing ? (
            <button
              onClick={handleCancelEdits}
              className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center'
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
      <MainFeed type='profile' id={profileId} />
    </div>
  );
}
