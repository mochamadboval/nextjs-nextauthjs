import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

import { authOptions } from "./api/auth/[...nextauth]";

export default function Home(props) {
  const { user } = props;

  const logoutHandler = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>Next.js x NextAuth.js</title>
        <meta name="description" content="Templat Next.js dengan NextAuth.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white mx-auto my-4 p-4 rounded-lg shadow-sm text-center w-72">
          <p>Hai, {user ? user.name : "orang asing"}!</p>
          {user ? (
            <>
              <Link
                href="/change-password"
                className="block border border-neutral-900 mt-4 p-3 rounded text-center"
              >
                Ubah Kata Sandi
              </Link>
              <button
                className="bg-red-700 block mt-2 py-3 rounded text-red-50 w-full"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block border border-neutral-900 mt-4 p-3 rounded text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
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
