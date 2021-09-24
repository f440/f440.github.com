import { lstatSync, readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
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

type Post = { title?: string; path: string; createdAt: string };
type Posts = Post[];

export const getStaticPaths: GetStaticPaths = async () => {
  const getFiles = (root: string, files: string[] = []): string[] => {
    readdirSync(root).forEach((fileName) => {
      const path = join(root, fileName);

      if (lstatSync(path).isDirectory()) {
        getFiles(path, files);
      } else {
        if (path.match(/\.markdown$/)) {
          files.push(path);
        }
      }
    });

    return files;
  };

  const posts: Posts = getFiles(postsDirectory)
    .map((f) => {
      const fileContents = readFileSync(f, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        path: f,
        title: data.title,
        createdAt: data.created_at,
      };
    })
    .sort((a: Post, b: Post) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })
    .map((post) => {
      return {
        ...post,
        createdAt: post.createdAt.toString(),
      };
    });

  const slugs = posts.map((post) => {
    return post.path
      .replace(postsDirectory + "/", "")
      .replace(/(\d{4})-(\d{2})-(\d{2})-(.*)\.markdown$/, "$1/$2/$3/$4");
  });

  return {
    paths: slugs.map((slug) => {
      return {
        params: { slug: slug.split("/") },
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
