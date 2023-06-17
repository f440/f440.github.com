import { PostType, getPosts } from "../lib/utils";
import { Posts } from "../components/posts";

export default async function Page() {
  const posts = getPosts().map((post) => {
    return (({ localPath, path, title, createdAt }) => ({
      localPath,
      path,
      title,
      createdAt,
    }))(post);
  });

  return (
    <article>
      <Posts posts={posts} />
    </article>
  );
}
