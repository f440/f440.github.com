import { NextPage } from "next";
import Link from "next/link";

type Props = {
  tags: string[] | undefined;
};

export const Tags: NextPage<Props> = ({ tags }) => {
  if (!tags) {
    return <></>;
  } else {
    return (
      <>
        {tags.map((tag: string) => {
          return (
            <span key={tag}>
              <Link href={`/blog/categories/${encodeURIComponent(tag)}`}>
                {tag}
              </Link>{" "}
            </span>
          );
        })}
      </>
    );
  }
};
