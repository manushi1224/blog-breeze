export async function getUserById(userId) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/getUser/${userId}`,
      { cache: "no-cache" }
    );
    const data = await result.json();

    return data;
  }