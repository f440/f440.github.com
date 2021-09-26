import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { PostType } from "../lib/utils";
import { Tags } from "./tags";


export const Posts: React.VFC<{ posts: PostType[]; }> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <section key={post.path} style={{ marginBottom: "1em" }}>
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
