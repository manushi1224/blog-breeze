export async function fetchFilteredBlogs(query) {
  let result = await fetch(`http://localhost:3000/api/searchBlog/${query}`);
  if (!result.ok) {
    throw new Error("Something went wrong");
  }
  return result.json();
}
