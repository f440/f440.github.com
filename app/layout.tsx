import "../styles/screen.scss";
import { Layout } from "../components/layout";
import { Metadata } from "next";

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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
