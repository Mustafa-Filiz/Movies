export async function customFetch<T>(url: string, options?: RequestInit) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_API_URL}${url}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
      ...options,
    }
  );

  if (!response.ok) {
    console.error(response);
    throw new Error("An error occured.");
  }

  return response.json() as T;
}
