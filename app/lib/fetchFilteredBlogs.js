export async function fetchFilteredBlogs(query) {
  let result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/searchBlog/${query}`
  );
  if (!result.ok) {
    throw new Error("Something went wrong");
  }
  return result.json();
}
