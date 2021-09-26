import React from "react";
import Layout from "../components/layout";
import { PostType, getPosts } from "../lib/utils";
import { Posts } from "../components/posts";
import { InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout>
      <article>
        <Posts posts={posts} />
      </article>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  return {
    props: { posts: posts },
  };
};
