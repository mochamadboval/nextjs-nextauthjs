import Head from "next/head";

import { useRef } from "react";

import FormInput from "@/components/UI/FormInput";
import SwitchPageButton from "@/components/UI/SwitchPageButton";

export default function SignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const signUpHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await response.json();

    console.log(data);
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
            />
            <button className="bg-green-700 font-semibold mt-4 py-3 rounded text-green-50">
              Buat Akun
            </button>
          </form>
          <SwitchPageButton name="Login" url="/login" />
        </div>
      </div>
    </>
  );
}
