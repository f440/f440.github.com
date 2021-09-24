import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { join } from "path";
import Layout from "../components/layout";

const postsDirectory = join(process.cwd(), "content");

const Blog = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="aaa">
      <>{slug}</>
    </Layout>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: ["aaa"] } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {},
  };
};
