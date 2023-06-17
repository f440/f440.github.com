import "../styles/screen.scss";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "apatheia.info",
  alternates: {
    types: {
      "application/rss+xml": "/atom.xml",
    },
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <h1 id="site-title">
            <Link href="/">apatheia.info</Link>
          </h1>
        </header>

        <main>{children}</main>

        <footer>
          <ul>
            <li>Link:</li>
            <li>
              <a href="https://twitter.com/f440">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/f440">Github</a>
            </li>
            <li>
              <a href="https://pinbaord.in/u:f440">Pinbaord</a>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
