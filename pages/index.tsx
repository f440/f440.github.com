import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { generateSitemap } from "../lib/sitemap";
import { generateFeed } from "../lib/feed";
import { PostType, getPosts } from "../lib/utils";

type Props = {
  posts: PostType[];
};

const Index: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout>
      <article>
        {posts.map((post) => {
          return (
            <section key={post.path}>
              <h2>
                <Link href={`/${post.path}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
              <span>{format(new Date(post.createdAt), "yyyy.MM.dd")}</span>
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

  await generateSitemap(posts);
  await generateFeed(posts);

  return {
    props: { posts: posts },
  };
};
