export default async function getAllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
