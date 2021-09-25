import { readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { join } from "path";
import Layout from "../../components/layout";
import {
  PostType,
  getPosts,
  PostsDirectory,
  markdownToHtml,
} from "../../lib/utils";

const Blog = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={post.title}>
      <article>
        <p id="article-info">
          published on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
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

export const getStaticProps: GetStaticProps = async (context) => {
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
