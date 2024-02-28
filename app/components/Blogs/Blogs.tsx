import { fetchFilteredBlogs } from "@/app/lib/fetchFilteredBlogs";
import getAllBlogs from "@/app/lib/blog";
import BlogCard from "@/app/ui/BlogCard";

export default async function Blogs({ query }: { query: string }) {
  let blogData = await getAllBlogs();
  if (query) {
    blogData = await fetchFilteredBlogs(query);
  }

  if (blogData) {
    return <BlogCard blogs={blogData.blogs} />;
  }
  return <BlogCard blogs={blogData.blogs} />;
}
