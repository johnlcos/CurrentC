export default function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div>
      <h1>{params.username}s Profile</h1>
    </div>
  );
}
