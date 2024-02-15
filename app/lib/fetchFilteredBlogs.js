export async function fetchFilteredBlogs(query) {
  let result = await fetch(`https://blog-breeze-2rit6h9kt-manushis-projects.vercel.app/api/searchBlog/${query}`);
  if (!result.ok) {
    throw new Error("Something went wrong");
  }
  return result.json();
}
