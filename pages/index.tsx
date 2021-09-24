import Layout from "../components/layout";
import { join } from "path";
import { lstatSync, readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

type Post = { title?: string; path: string; createdAt: string };
type Posts = Post[];
type Props = {
  posts: Posts;
};

const postsDirectory = join(process.cwd(), "content");

const Index: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout title="index">
      <ul>
        {posts.map((post) => {
          if (post.title) {
            return (
              <li key={post.path}>
                {post.title} {post.path} {post.createdAt}
              </li>
            );
          }
        })}
      </ul>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
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

  return {
    props: { posts: posts },
  };
}
