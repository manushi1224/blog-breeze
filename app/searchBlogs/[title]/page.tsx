import { getAllBlogs } from "@/app/lib/blog";

export async function generteStaticParams() {
  const blogData = await getAllBlogs();

  return blogData.blog.map((item: any) => ({ title: item.title }));
}

export async function getBlogsBySearch(title: string) {
  const result = await fetch(`http://localhost:3000/api/searchBlog/${title}`);
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
  return <div>{}</div>;
}
