import getAllBlogs from "@/app/lib/blog";

export async function generateStaticParams() {
  const blogData = await getAllBlogs();

  return blogData.blog.map((item: any) => ({ title: item.title }));
}

async function getBlogsBySearch(title: string) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/searchBlog/${title}`
  );
  if (!result.ok) {
    throw new Error("Failed to fetch blog");
  }
  return result.json();
}

export default async function Page({ params }: any) {
  const { data } = await getBlogsBySearch(params.title);
  if (data) {
    console.log(data);
  }
  return <div></div>;
}
