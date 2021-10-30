import { Layout } from "../../../components/layout";
import { PostType, getPosts } from "../../../lib/utils";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Posts } from "../../../components/posts";
import Head from "next/head";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Tag: NextPage<Props> = ({ tag, posts }) => {
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
};

export default Tag;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const posts: PostType[] = getPosts();
  const tag: string =
    context.params != undefined
      ? Array.isArray(context.params.tag)
        ? context.params.tag[0]
        : context.params.tag || ""
      : "";

  return {
    props: {
      tag: tag,
      posts: posts.filter((post) => {
        return post.tags?.includes(tag);
      }),
    },
  };
};

export const getStaticPaths = async () => {
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
