import { PostType, getPosts } from "../../../../lib/utils";
import { Posts } from "../../../../components/posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return {
    title: `tagged ${params.tag} - aptheia.info`,
  };
}

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
