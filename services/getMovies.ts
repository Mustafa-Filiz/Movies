import { useQuery } from "@tanstack/react-query";

export const useGetMovies = () => {
  const response = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTczNjljZTFkZjc5ODg5ZDM0ZTIxNTJiZWVlYzQ0OSIsIm5iZiI6MTc2MzMwODc2MS45MjcsInN1YiI6IjY5MTlmNGQ5OWUwZWRiNTk5Zjg3NzdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yEpYaKWXhQXua_-Wrh8xR3Zo0Cpo1JAAKPfiVUP0SWY",
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
