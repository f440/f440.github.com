import { generateFeed } from "../../lib/feed";
import { PostType, getPosts } from "../../lib/utils";

export default async function Page({}) {
  return <></>;
}

export async function generateStaticParams() {
  const posts: PostType[] = getPosts();

  await generateFeed(posts);

  return [];
}
