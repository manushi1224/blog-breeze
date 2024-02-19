export async function getAllBlogs() {
  const data = await fetch("http://localhost:3000/api/blog");
  if (!data.ok) {
    throw new Error("Failed to fetch the blogs");
  }
  return data.json();
}
