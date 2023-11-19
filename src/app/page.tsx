/* eslint-disable @typescript-eslint/require-await */
import { CreatePost } from "@/components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return <Button>Hello</Button>;
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
