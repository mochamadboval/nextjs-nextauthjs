import Head from "next/head";
import Link from "next/link";

export default function Activation() {
  return (
    <>
      <Head>
        <title>Aktivasi - Next.js x NextAuth.js</title>
        <meta
          name="description"
          content="Templat Next.js dengan NextAuth.js - Halaman Aktivasi"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white mx-auto my-4 p-4 rounded-lg shadow-sm text-center w-72">
          <p>Akun berhasil diaktivasi.</p>
          <Link
            href="/login"
            className="border border-neutral-900 inline-block mt-4 p-3 rounded text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const verifyToken = context.query.token;

  const response = await fetch(
    `${process.env.FIREBASE_URL}/users.json?orderBy="verifyEmailToken"&equalTo="${verifyToken}"`
  );
  const data = await response.json();

  if (Object.keys(data).length !== 0) {
    const userKey = Object.keys(data)[0];

    await fetch(`${process.env.FIREBASE_URL}/users/${userKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verified: true, verifyEmailToken: null }),
    });

    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
