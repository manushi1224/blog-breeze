"use client";
import Image from "next/image";
import Link from "next/link";
import { getUserById } from "@/app/lib/getUserById";

async function BlogCard({ blogs }: any) {
  return (
    <div className="w-[75%] grid grid-cols-3 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
      {blogs.map(async (blog: any) => {
        const { user } = await getUserById(blog.creator);
        return (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-gray-600"
          >
            <div>
              <div className="p-3">
                <Image
                  className="rounded-lg"
                  src={blog.image}
                  height={200}
                  width={400}
                  alt="blog-image"
                />
              </div>
              <div className="border-l-4 border-l-fuchsia-600 h-8">
                <div className="mx-3 pt-1 text-base text-fuchsia-500 font-semibold">
                  {blog.category}
                </div>
              </div>
              <div className="p-5 mb-12">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {blog.title}
                </h5>
              </div>
              <div className="flex justify-between absolute inset-x-0 bottom-0 p-5">
                <div className="text-gray-200 text-opacity-60">
                  {blog.createdDate.split("T")[0]}
                </div>
                <div className="text-gray-200 text-opacity-60">{user.name}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default BlogCard;
