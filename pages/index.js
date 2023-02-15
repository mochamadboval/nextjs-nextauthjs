import Head from "next/head";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]";

export default function Home(props) {
  const { user } = props;

  return (
    <>
      <Head>
        <title>Next.js x NextAuth.js</title>
        <meta name="description" content="Templat Next.js dengan NextAuth.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Hello, {user ? user.name : "Stranger"}!</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      props: {
        user: session.user,
      },
    };
  }

  return {
    props: { user: null },
  };
}
