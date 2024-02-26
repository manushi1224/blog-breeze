"use client";
import Link from "next/link";
import { useState } from "react";
import Alert from "../ui/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blog, setBlog] = useState<any>({
    title: "",
    category: "",
    description: "",
    createdDate: "",
  });
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const closeAlert = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const loadAlertData = ({
    success,
    msg,
    load,
  }: {
    success: boolean;
    msg: string;
    load: boolean;
  }) => {
    setFormSuccess(success);
    setMessage(msg);
    setLoading(load);
    closeAlert();
  };

  const onSignup = async (event: any) => {
    event.preventDefault();
    console.log(blog);
    try {
      if (
        !blog.title ||
        !blog.description ||
        !blog.category ||
        !blog.createdDate
      ) {
        loadAlertData({
          success: false,
          msg: "Please fill all the fields",
          load: true,
        });
        return;
      }

      const res = await axios.post("/api/createBlog/new", {
        title: blog.title,
        category: blog.category,
        createdDate: blog.createdDate,
        description: blog.description,
        userId: session?.user?.id,
      });
      if (res.data.status == 200 || res.data.status == 201) {
        loadAlertData({
          success: true,
          msg: "Account Created !",
          load: true,
        });
        router.push("/login");
      }
      loadAlertData({
        success: false,
        msg: res.data.message,
        load: true,
      });
    } catch (error) {
      console.log(error);
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
            Create A New Blog
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
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  //   required
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Category
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  autoComplete="email"
                  //   required
                  onChange={(e) =>
                    setBlog({ ...blog, category: e.target.value })
                  }
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  autoComplete="email"
                  //   required
                  onChange={(e) =>
                    setBlog({ ...blog, description: e.target.value })
                  }
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="createdDate"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Created Date
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="createdDate"
                  name="createdDate"
                  type="date"
                  autoComplete="current-password"
                  //   required
                  onChange={(e) =>
                    setBlog({ ...blog, createdDate: e.target.value })
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
                Post This Blog!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
