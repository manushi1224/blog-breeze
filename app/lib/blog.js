export default async function getAllBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });
  const data = await res.json();
  return data
}
