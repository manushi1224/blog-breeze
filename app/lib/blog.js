export async function getAllBlogs() {
  const data = await fetch("https://blog-breeze-2rit6h9kt-manushis-projects.vercel.app/api/blog");
  if (!data.ok) {
    throw new Error("Failed to fetch the blogs");
  }
  return data.json();
}
