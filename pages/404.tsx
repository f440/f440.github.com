import { NextPage } from "next";
import { Layout } from "../components/layout";

const Custom404: NextPage = () => {
  return (
    <Layout>
      <article>
        <h1>Not Found</h1>
      </article>
    </Layout>
  );
};

export default Custom404;
