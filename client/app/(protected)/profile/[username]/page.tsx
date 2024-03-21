import { FollowButton } from "@/components/follow-button";

export default function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  return (
    <div>
      <h1>{params.username}s Profile</h1>
      <FollowButton followed_id={searchParams.id} />
    </div>
  );
}
