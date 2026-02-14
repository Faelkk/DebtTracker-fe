import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment";

export function usePayments(debtId: string, installmentId: string) {

  const { data, isFetching } = useQuery({
    queryKey: ["Payments", debtId, installmentId],
    queryFn: () => paymentService.getAll(debtId, installmentId),
    staleTime: 1000 * 10
  });

  return {
    Payments: data ?? [],
    isLoading: isFetching,
  };
}
