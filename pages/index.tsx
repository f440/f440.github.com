import Layout from "../components/layout";
import { PostType, getPosts } from "../lib/utils";

type Props = {
  posts: PostType[];
};

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

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts: PostType[] = getPosts();

  return {
    props: { posts: posts },
  };
};
