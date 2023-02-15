import Head from "next/head";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";

import { useRef, useState } from "react";

import { authOptions } from "./api/auth/[...nextauth]";

import AuthButton from "@/components/UI/AuthButton";
import FormInput from "@/components/UI/FormInput";
import SwitchPageButton from "@/components/UI/SwitchPageButton";

export default function Login() {
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();

    setErrorMessage(null);
    setIsWaiting(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result.error) {
      router.replace("/");
    } else {
      setErrorMessage(result.error);
      setIsWaiting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Next.js x NextAuth.js</title>
        <meta
          name="description"
          content="Templat Next.js dengan NextAuth.js - Halaman Login"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white mx-auto my-4 p-4 rounded-lg shadow-sm w-72">
          <h2 className="font-semibold text-center text-xl">LOGIN</h2>
          {errorMessage && (
            <p className="bg-red-100 mt-4 px-4 py-3 rounded text-center text-red-700 text-sm">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col gap-2 mt-4" onSubmit={loginHandler}>
            <FormInput
              name="Email"
              placeholder="abc@xyz.com"
              ref={emailRef}
              type="email"
            />
            <FormInput
              name="Kata Sandi"
              placeholder="******"
              ref={passwordRef}
              type="password"
            />
            <AuthButton isWaiting={isWaiting} name="Masuk" />
          </form>
          <SwitchPageButton name="Daftar" url="/signup" />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
