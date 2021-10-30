import { NextPage } from "next";
import { generateSitemap } from "../lib/sitemap";
import { PostType, getPosts } from "../lib/utils";

const Sitemap: NextPage = () => <></>;

export default Sitemap;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  await generateSitemap(posts);

  return { props: {} };
};
