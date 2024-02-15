"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../ui/Alert";
import google from "@/public/g_icon.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const closeAlert = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const onSignup = async (event: any) => {
    event.preventDefault();
    try {
      if (!user.email || !user.password) {
        setMessage("Please fill all the fields");
        setLoading(true);
        closeAlert();
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setMessage("Invalid email id");
        setLoading(true);
        closeAlert();
        return;
      }
      console.log(user);
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      if (res?.error) {
        console.log(res);
        setMessage("Some error occured!");
      }
      console.log(res);
      setFormSuccess(true);
      router.push("/");
      setLoading(true);
      closeAlert();
    } catch (error: any) {
      setFormSuccess(false);
      console.log("SignIn failed", error);
    }
  };

  const signInWithGoogle = async () => {
    const res = await signIn("google", { callbackUrl: '/' });
    console.log("res is", res)
    router.push("/");
    setFormSuccess(true);
    setLoading(true);
    closeAlert();
  };

  return (
    <>
      <div className="top-5 absolute right-[43%] max-sm:right-[30%]">
        {loading && <Alert success={formSuccess} message={message} />}
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-200">
            Sign In
          </h2>
        </div>

        <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(event) => onSignup(event)}
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  //   required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  //   required
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex justify-center items-center w-full gap-8 pb-8 mt-8">
            <div
              onClick={() => signInWithGoogle()}
              className="rounded px-6 py-2 shadow cursor-pointer w-full justify-center text-black bg-gray-50 flex mx-auto mb-4"
            >
              <Image
                src={google}
                alt="bg"
                width={30}
                height={30}
                className="align-left"
              />
              <div className="mt-1 flex justify-center">
                Sign In with Google
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-gray-500">
            Want to be a member? &nbsp;
            <Link
              href="/signup"
              className="font-semibold leading-6 text-purple-600 hover:text-fuchsia-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
