"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../ui/Alert";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any>({
    name: "",
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
      if (!user.name || !user.email || !user.password) {
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
      console.log(user)
      const res = await axios.post("/api/register", user);
      console.log(res);
      if (res.status == 200 || res.status == 201) {
        console.log("user added successfully");
        setMessage("Account Created !");
        router.push("/");
      }
      setFormSuccess(true);
      router.push("/login");
      setLoading(true);
      closeAlert();
    } catch (error: any) {
      setFormSuccess(false);
      console.log("Signup failed", error);
    }
  };

  return (
    <>
      <div className="top-5 absolute right-[43%] max-sm:right-[30%]">
        {loading && <Alert success={formSuccess} message={message} />}
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-200">
            Create your account
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
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  //   required
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

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
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member? &nbsp;
            <Link
              href="/login"
              className="font-semibold leading-6 text-purple-600 hover:text-fuchsia-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
