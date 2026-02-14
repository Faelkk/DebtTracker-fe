import { useQuery } from "@tanstack/react-query";
import { InstallmentsService } from "../services/installments";



export function useInstallments(debtId: string) {


  const { data, isFetching } = useQuery({
    queryKey: ["Installments", debtId],
    queryFn: 
      () => InstallmentsService.getAll(debtId),
    staleTime: 1000 * 30,
    enabled: !!debtId,
  });

  return {
    Installments: data ?? [],
    isLoading: isFetching,
  };
}
