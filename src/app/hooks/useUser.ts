import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth";





export function useUser() {
  const { data, isFetching } = useQuery({
    queryKey: ["User"],
    queryFn: () => authService.me(),
     staleTime: 1000 * 60 * 60 * 24 * 7, 
  });

  return { user: data, isLoading: isFetching };
}
