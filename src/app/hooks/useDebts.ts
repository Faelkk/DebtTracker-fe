
  import { useQuery } from "@tanstack/react-query";
  import { debtService } from "../services/debt";
  

  export function useDebts() {
    

    const { data, isFetching } = useQuery({
      queryKey: ["Debts"],
      queryFn:  debtService.getAll,
      staleTime: 1000 * 30,
    });

    return {
      debts: data ?? [],
      isLoading: isFetching,
    };
  }
