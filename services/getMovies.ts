import { useQuery } from "@tanstack/react-query";

export const useGetMovies = () => {
  const response = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/movie/popular?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  return response;
};
