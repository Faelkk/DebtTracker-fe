import { useQuery } from "@tanstack/react-query";
import { debtService } from "../services/debt";
import type { Debt } from "../entities/debt";




export function useDebtId(debtId: string) {

  const { data, isFetching } = useQuery<Debt>({
    queryKey: ["Debt", debtId],
    queryFn: () => debtService.getById(debtId),
    staleTime: Infinity,
  });

  return {
    debt: data,
    isLoading: isFetching,
  };
}
