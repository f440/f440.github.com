import React from "react";
import { generateSitemap } from "../lib/sitemap";
import { PostType, getPosts } from "../lib/utils";

const Sitemap: React.VFC = () => <></>;

export default Sitemap;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  await generateSitemap(posts);

  return { props: {} };
};
