import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Layout from "../../../components/layout";
import { PostType, getPosts } from "../../../lib/utils";
import { GetStaticPaths } from "next";
import { Tags } from "../../../components/tags";

type Props = {
  tag: string;
  posts: PostType[];
};

const Tag: React.VFC<Props> = ({ tag, posts }) => {
  return (
    <Layout title={`tagged ${tag}`}>
      <article>
        <h1>Articles tagged '{tag}'</h1>
        {posts.map((post) => {
          return (
            <section key={post.path}>
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

export default Tag;

export const getStaticProps = async (context: {
  params: { tag: string };
}): Promise<{ props: Props }> => {
  const posts: PostType[] = getPosts();

  return {
    props: {
      tag: context.params.tag,
      posts: posts.filter((post) => {
        return post.tags?.includes(context.params.tag);
      }),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostType[] = getPosts();
  let tags = new Set<string>();

  posts.forEach((post) => {
    if (!post.tags) {
      return;
    }

    post.tags.forEach((tag) => {
      if (tag) {
        tags.add(tag);
      }
    });
  });

  let paths: { params: { tag: string } }[] = [];
  tags.forEach((tag) => {
    paths.push({ params: { tag: tag } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};
