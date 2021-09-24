import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../components/layout";
import { PostType, getPosts } from "../lib/utils";

const Blog = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="aaa">
      <>{slug}</>
    </Layout>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostType[] = getPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.path.split("/") },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {
      slug: context.params?.slug,
    },
  };
};
