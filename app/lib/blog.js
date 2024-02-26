export async function getAllBlogs() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
  if (!data.ok) {
    throw new Error("Failed to fetch the blogs");
  }
  return data.json();
}
