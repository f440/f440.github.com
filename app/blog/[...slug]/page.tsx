import { format } from "date-fns";
import { readFileSync } from "fs";
import matter from "gray-matter";

import { join } from "path";
import {
  PostType,
  getPosts,
  PostsDirectory,
  markdownToHtml,
} from "../../../lib/utils";
import { Tags } from "../../../components/tags";
import React from "react";
import Head from "next/head";

export default async function Page({
  params,
}: {
  params: { slug: string[] | undefined };
}) {
  if (!params.slug) return <></>;
  const post = await getPostBySlug(params.slug);
  if (!post) return <></>;

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

        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts: PostType[] = getPosts();

  return posts.map((post) => ({
    slug: post.path.replace("blog/", "").split("/"),
  }));
}

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
