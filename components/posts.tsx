import { format } from "date-fns";
import { NextPage } from "next";
import Link from "next/link";
import { PostType } from "../lib/utils";
import { Tags } from "./tags";

type Props = {
  posts: PostType[];
};

export const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <section key={post.path}>
            <h2>
              <Link href={`/${post.path}`}>
                <a>{post.title}</a>
              </Link>
            </h2>
            <span>{format(new Date(post.createdAt), "yyyy.MM.dd")}</span>{" "}
            <Tags tags={post.tags} />
          </section>
        );
      })}
    </>
  );
};
