export async function getUserById(userId) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/getUser/${userId}`,
      { cache: "no-cache" }
    );

    if(!result.ok){
      throw new Error("Failed to fetch data of user.")
    }
    const data = await result.json();

    return data;
  }