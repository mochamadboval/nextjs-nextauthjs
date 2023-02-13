import Head from "next/head";

import { useRef } from "react";

import FormInput from "@/components/UI/FormInput";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(email, password);
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
            <button className="bg-green-700 font-semibold mt-4 py-3 rounded text-green-50">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
