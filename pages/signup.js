import Head from "next/head";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";

import { useRef, useState } from "react";

import { authOptions } from "./api/auth/[...nextauth]";

import AuthButton from "@/components/UI/AuthButton";
import FormInput from "@/components/UI/FormInput";
import SwitchPageButton from "@/components/UI/SwitchPageButton";

export default function SignUp() {
  const router = useRouter();

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isMatching, setIsMatching] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const comparePasswordHandler = () => {
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    if (passwordConfirmation !== password) {
      setIsMatching(false);
    } else {
      setIsMatching(true);
    }
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    setErrorMessage(null);
    setIsWaiting(true);

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    if (passwordConfirmation !== password) {
      setErrorMessage("Kata sandi tidak cocok.");
      setIsWaiting(false);

      return;
    }

    const response = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);

      router.replace("/login");
    } else {
      setErrorMessage(data.message);
      setIsWaiting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar - Next.js x NextAuth.js</title>
        <meta
          name="description"
          content="Templat Next.js dengan NextAuth.js - Halaman Daftar"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white mx-auto my-4 p-4 rounded-lg shadow-sm w-72">
          <h2 className="font-semibold text-center text-xl">DAFTAR</h2>
          {errorMessage && (
            <p className="bg-red-100 mt-4 px-4 py-3 rounded text-center text-red-700 text-sm">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col gap-2 mt-4" onSubmit={signUpHandler}>
            <FormInput
              name="Nama"
              placeholder="Mochamad Boval"
              ref={nameRef}
              type="text"
            />
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
              comparePassword={comparePasswordHandler}
            />
            <FormInput
              name="Konfirmasi Kata Sandi"
              placeholder="******"
              ref={passwordConfirmationRef}
              type="password"
              comparePassword={comparePasswordHandler}
            />
            {!isMatching && (
              <p className="text-red-700 text-xs">Kata sandi tidak cocok.</p>
            )}
            <AuthButton isWaiting={isWaiting} name="Buat Akun" />
          </form>
          <SwitchPageButton name="Login" url="/login" />
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
