import { PostType, getPosts } from "../../../../lib/utils";
import { Posts } from "../../../../components/posts";
import Head from "next/head";

export default function Page({ params }: { params: { tag: string } }) {
  const tag: string =
    params != undefined
      ? Array.isArray(params.tag)
        ? params.tag[0]
        : params.tag || ""
      : "";
  const posts: PostType[] = getPosts().filter((post) => {
    return post.tags?.includes(tag);
  });

  return (
    <>
      <Head>
        <title>{`tagged ${tag} - aptheia.info`}</title>
      </Head>
      <article>
        <h1>Articles tagged &apos;{tag}&apos; </h1>
        <Posts posts={posts} />
      </article>
    </>
  );
}

export async function generateStaticParams() {
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

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}
