import getAllBlogs from "@/app/lib/blog";
import { getUserById } from "@/app/lib/getUserById";
import Image from "next/image";

export const dynamicParams = false;

export async function generateStaticParams() {
  const blogData = await getAllBlogs();

  return blogData.blogs.map((item: any) => ({ slug: item.slug }));
}

async function getBlogBySlug(slug: any) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`,
    { cache: "no-cache" }
  );

  if(!result.ok){
    throw new Error("Failed to fetch data from server");
  }
  return result.json();
}

export default async function Page({ params }: any) {
  const { blogs } = await getBlogBySlug(params.slug);
  const { user } = await getUserById(blogs.creator);
  return (
    <div
      key={blogs.slug}
      className="flex flex-col items-center justify-center p-10"
    >
      <div className="p-2 text-center">
        <h3 className="text-3xl text-fuchsia-500 font-semibold">
          {blogs.category}
        </h3>
        <h2 className="text-4xl font-bold pt-5">{blogs.title}</h2>
      </div>
      <div className="mt-20">
        <div className="flex justify-center">
          <h4 className="text-lg font-semibold text-gray-300 text-opacity-70 px-3">
            {blogs.createdDate.split("T")[0]}
          </h4>
          |
          <h4 className="text-lg font-semibold text-gray-300 text-opacity-70 px-3">
            {user.name}
          </h4>
        </div>
        <Image
          height={200}
          width={500}
          src={blogs.image}
          alt="blogs-img"
          className="pt-5"
        />
      </div>
      <div className="text-lg text-center mt-10">{blogs.description}</div>
    </div>
  );
}
