import { markdownToHtml, PostType } from "./utils";
import { format } from "date-fns";
import { writeFile } from "fs";
import { join } from "path";

const feedEntry = async (post: PostType): Promise<string> => {
  return `
<entry>
  <id>tag:apatheia.info,${format(new Date(post.createdAt), "yyyy-MM-dd")}:/${
    post.path
  }/</id>
  <title type="text">${post.title}</title>
  <published>${post.createdAt}</published>
  <updated>${post.updatedAt || post.createdAt}</updated>
  <link href="https://apatheia.info/${post.path}/"/>
  <content type="html">
  <![CDATA[${await markdownToHtml(post.content || "")}]]>
  </content>
</entry>
`.trim();
};

export const generateFeed = async (posts: PostType[]): Promise<void> => {
  const latestPost = posts.reduce((a, b): PostType => {
    return (a.updatedAt || a.createdAt) > (b.updatedAt || b.createdAt) ? a : b;
  });

  const entries = await posts.slice(0, 10).reduce(
    async (prev: Promise<string>, post: PostType): Promise<string> =>
      (await prev) + "\n" + (await feedEntry(post)),

    Promise.resolve("")
  );

  const feed = `
  <?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom" xml:base="https://apatheia.info/">
    <id>https://apatheia.info/</id>
    <title>apatheia.info</title>
    <updated>${latestPost.updatedAt || latestPost.createdAt}</updated>
    <link rel="self" href="https://apatheia.info/atom.xml"/>
    <author>
      <name>f440</name>
      <uri>https://apatheia.info/</uri>
    </author>
    ${entries}
  </feed>
  `.trim();

  writeFile(join(process.cwd(), "public", "atom.xml"), feed, () => {});
};
