import { format } from "date-fns";
import { readFileSync } from "fs";
import matter from "gray-matter";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { join } from "path";
import {
  PostType,
  getPosts,
  PostsDirectory,
  markdownToHtml,
} from "../../lib/utils";
import { Tags } from "../../components/tags";
import React from "react";
import Head from "next/head";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blog: NextPage<Props> = ({ post }) => {
  if (post === undefined || post.content === undefined) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{`${post.title} - aptheia.info`}</title>
      </Head>

      <article>
        <h1>{post.title}</h1>
        <p id="article-info">
          {format(new Date(post.createdAt), "yyyy.MM.dd")}{" "}
          <Tags tags={post.tags} />
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostType[] = getPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.path.replace("blog/", "").split("/") },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      post: Array.isArray(context.params?.slug)
        ? await getPostBySlug(context.params?.slug)
        : undefined,
    },
  };
};

const getPostBySlug = async (
  slug: string[] | undefined
): Promise<PostType | undefined> => {
  if (slug === undefined) {
    return undefined;
  }

  const localPath = join(
    PostsDirectory,
    slug.join("-").replace("/", "") + ".markdown"
  );
  const fileContents = readFileSync(localPath, "utf-8");
  const { data, content } = matter(fileContents);

  const post: PostType = {
    localPath: localPath,
    path: slug.join("/"),
    layout: data.layout,
    title: data.title,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    kind: data.kind,
    comments: data.comments,
    tags: data.tags,
    content: await markdownToHtml(content),
  };

  return JSON.parse(JSON.stringify(post));
};
