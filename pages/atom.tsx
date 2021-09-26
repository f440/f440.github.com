import React from "react";
import { generateFeed } from "../lib/feed";
import { PostType, getPosts } from "../lib/utils";

const Atom: React.VFC = () => <></>;

export default Atom;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  await generateFeed(posts);

  return { props: {} };
};
