import { generateSitemap } from "../../lib/sitemap";
import { PostType, getPosts } from "../../lib/utils";

export default async function Page({}) {
  return <></>;
}

export async function generateStaticParams() {
  const posts: PostType[] = getPosts();

  await generateSitemap(posts);

  return [];
}
