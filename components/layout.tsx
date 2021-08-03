import Head from "next/head";
import Link from "next/link";

type Props = {
  title?: string;
  children: JSX.Element;
};

export default function Layout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title ? title : "aptheia.info"}</title>
      </Head>

      <header>
        <div id="site-title">{title && <h1>{title}</h1>}</div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {/* <li><a href="/archives">Archive</a></li> */}
            {/* <li><a href="/atom.xml">RSS</a></li> */}
          </ul>
        </nav>
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
}
