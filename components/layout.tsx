import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="apatheia.info"
          href="/atom.xml"
        />
        <title>aptheia.info</title>
      </Head>

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
    </>
  );
};
