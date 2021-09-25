import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { PostType, getPosts } from "../lib/utils";

type Props = {
  posts: PostType[];
};

const Index: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout>
      <ul>
        {posts.map((post) => {
          if (post.title) {
            return (
              <li key={post.path}>
                <Link href={`/${post.path}`}>
                  <a>
                    {post.title} (created_at: {formatDate(post.createdAt)})
                  </a>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts: PostType[] = getPosts();

  return {
    props: { posts: posts },
  };
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString();
};
