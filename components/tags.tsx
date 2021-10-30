import { NextPage } from "next";
import Link from "next/link";

export const Tags: NextPage<{ tags: string[] | undefined }> = ({ tags }) => {
  if (!tags) {
    return <></>;
  } else {
    return (
      <>
        {tags.map((tag: string) => {
          return (
            <span key={tag}>
              <Link href={`/blog/categories/${encodeURIComponent(tag)}`}>
                <a>{tag}</a>
              </Link>{" "}
            </span>
          );
        })}
      </>
    );
  }
};
