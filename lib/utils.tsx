import { lstatSync, readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export type PostType = {
  localPath: string;
  path: string;
  title: string;
  layout: string;
  createdAt: string;
  updatedAt?: string;
  kind?: string;
  comments?: boolean;
  tags?: string[];
};

export const PostsDirectory = join(process.cwd(), "content");

export const getFiles = (
  root: string,
  filter: RegExp | undefined = undefined,
  files: string[] = []
): string[] => {
  readdirSync(root).forEach((fileName) => {
    const path = join(root, fileName);

    if (lstatSync(path).isDirectory()) {
      getFiles(path, filter, files);
    } else {
      if (filter && path.match(filter)) {
        files.push(path);
      }
    }
  });

  return files;
};

export const getPosts = (): PostType[] => {
  const posts: PostType[] = getFiles(PostsDirectory, /\.markdown$/)
    .map((f) => {
      const fileContents = readFileSync(f, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        localPath: f,
        path: f
          .replace(PostsDirectory + "/", "")
          .replace(/(\d{4})-(\d{2})-(\d{2})-(.*)\.markdown$/, "$1/$2/$3/$4"),
        layout: data.layout,
        title: data.title,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        kind: data.kind,
        comments: data.comments,
        tags: data.tags,
      };
    })
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })
    .map((f) => {
      return JSON.parse(JSON.stringify(f));
    });

  return posts;
};
