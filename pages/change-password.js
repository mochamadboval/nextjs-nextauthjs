import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";

import { useRef, useState } from "react";

import { authOptions } from "./api/auth/[...nextauth]";
import { isUserExists } from "@/helpers/fetchFirebase";

import AuthButton from "@/components/UI/AuthButton";
import FormInput from "@/components/UI/FormInput";

export default function ChangePassword(props) {
  const { userKey, userPassword } = props;

  const router = useRouter();

  const newPasswordRef = useRef();
  const newPasswordConfirmationRef = useRef();
  const oldPasswordRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isMatching, setIsMatching] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const comparePasswordHandler = () => {
    const newPassword = newPasswordRef.current.value;
    const newPasswordConfirmation = newPasswordConfirmationRef.current.value;

    if (newPasswordConfirmation !== newPassword) {
      setIsMatching(false);
    } else {
      setIsMatching(true);
    }
  };

  const saveNewPasswordHandler = async (event) => {
    event.preventDefault();

    setErrorMessage(null);
    setIsWaiting(true);

    const newPassword = newPasswordRef.current.value;
    const newPasswordConfirmation = newPasswordConfirmationRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    if (newPasswordConfirmation !== newPassword) {
      setErrorMessage("Kata sandi baru tidak cocok.");
      setIsWaiting(false);

      return;
    }

    const response = await fetch("/api/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, oldPassword, userKey, userPassword }),
    });
    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);

      router.replace("/");
    } else {
      setErrorMessage(data.message);
      setIsWaiting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ubah Kata Sandi - Next.js x NextAuth.js</title>
        <meta
          name="description"
          content="Templat Next.js dengan NextAuth.js - Halaman Ubah Kata Sandi"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white mx-auto my-4 p-4 rounded-lg shadow-sm w-72">
          <h2 className="font-semibold text-center text-xl">UBAH KATA SANDI</h2>
          {errorMessage && (
            <p className="bg-red-100 mt-4 px-4 py-3 rounded text-center text-red-700 text-sm">
              {errorMessage}
            </p>
          )}
          <form
            className="flex flex-col gap-2 mt-4"
            onSubmit={saveNewPasswordHandler}
          >
            <FormInput
              name="Kata Sandi Lama"
              placeholder="******"
              ref={oldPasswordRef}
              type="password"
            />
            <FormInput
              name="Kata Sandi Baru"
              placeholder="******"
              ref={newPasswordRef}
              type="password"
              comparePassword={comparePasswordHandler}
            />
            <FormInput
              name="Konfirmasi Kata Sandi Baru"
              placeholder="******"
              ref={newPasswordConfirmationRef}
              type="password"
              comparePassword={comparePasswordHandler}
            />
            {!isMatching && (
              <p className="text-red-700 text-xs">
                Kata sandi baru tidak cocok.
              </p>
            )}
            <AuthButton isWaiting={isWaiting} name="Simpan" />
            <Link
              href="/"
              className="block border border-neutral-900 p-3 rounded text-center"
            >
              Kembali
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await isUserExists(session.user.email);

  const userKey = Object.keys(user)[0];
  const userPassword = user[userKey].password;

  return {
    props: { userKey, userPassword },
  };
}
