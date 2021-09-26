import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { PostType, getPosts } from "../lib/utils";
import { Tags } from "../components/tags";

type Props = {
  posts: PostType[];
};

const Index: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout>
      <article>
        {posts.map((post) => {
          return (
            <section key={post.path} style={{ marginBottom: "1em" }}>
              <h2>
                <Link href={`/${post.path}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
              <span>{format(new Date(post.createdAt), "yyyy.MM.dd")}</span>{" "}
              <Tags tags={post.tags} />
            </section>
          );
        })}
      </article>
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
