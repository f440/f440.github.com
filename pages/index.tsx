import { PostType, getPosts } from "../lib/utils";
import { Posts } from "../components/posts";
import { InferGetStaticPropsType, NextPage } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ posts }) => {
  return (
    <article>
      <Posts posts={posts} />
    </article>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts: PostType[] = getPosts();

  return {
    props: { posts: posts },
  };
};
