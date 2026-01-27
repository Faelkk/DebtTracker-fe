import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth";
import type { User } from "../entities/user";



const mockAllUsers: Array<User> = [
  { userId: "1", name: "Rafael Achtenberg", email: "rafael@example.com" },
  { userId: "2", name: "Maria Oliveira", email: "maria.oliveira@example.com" },
  { userId: "3", name: "João Silva", email: "joao.silva@example.com" },
];


export function useAllUser() {
  const useMock = true;

  const { data, isFetching } = useQuery({
    queryKey: ["User"],
    queryFn: useMock
       ? async () => {
           await new Promise((res) => setTimeout(res, 500));
           return mockAllUsers;
         }
       : () => authService.getAll(),
     staleTime: Infinity,
  });

  return { users: data ?? [], isLoading: isFetching };
}
