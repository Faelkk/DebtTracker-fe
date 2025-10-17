import { useQuery } from "@tanstack/react-query";
import type { User } from "../entities/user";


export function useUser() {
  const { data, isFetching } = useQuery({
    queryKey: ["User"],
    queryFn: async (): Promise<Array<User>> => {
      await new Promise((resolve) => setTimeout(resolve, 300));


      return [
        { userId: "1", name: "Rafael Achtenberg", email: "rafael@example.com" },
        { userId: "2", name: "Maria Oliveira", email: "maria.oliveira@example.com" },
        { userId: "3", name: "João Silva", email: "joao.silva@example.com" },
      ];
    },
  });

  return { users: data ?? [], isLoading: isFetching };
}
