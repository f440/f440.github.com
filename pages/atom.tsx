import { NextPage } from "next";
import React from "react";
import { generateFeed } from "../lib/feed";
import { PostType, getPosts } from "../lib/utils";

const Atom: NextPage = () => <></>;

export default Atom;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  await generateFeed(posts);

  return { props: {} };
};
