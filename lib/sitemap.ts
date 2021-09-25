import { PostType } from "./utils";
import { formatISO } from "date-fns";
import { writeFile } from "fs";
import { join } from "path";

export const generateSitemap = async (posts: PostType[]): Promise<void> => {
  const latestPost = posts.reduce((a, b): PostType => {
    return (a.updatedAt || a.createdAt) > (b.updatedAt || b.createdAt) ? a : b;
  });

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
    .map((post) => {
      return `
    <url>
    <loc>https://apatheia.info/${post.path}/</loc>
    <lastmod>${formatISO(new Date(post.updatedAt || post.createdAt))}</lastmod>
    </url>
    `;
    })
    .join("")}
  <url>
    <loc>https://apatheia.info/</loc>
    <lastmod>${formatISO(
      new Date(latestPost.updatedAt || latestPost.createdAt)
    )}</lastmod>
  </url>
</urlset>
  `.trim();

  writeFile(join(process.cwd(), "public", "sitemap.xml"), sitemap, () => {});
};
