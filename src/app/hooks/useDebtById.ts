import { useQuery } from "@tanstack/react-query";
import { debtService } from "../services/debt";
import type { Debt } from "../entities/debt";


const mockDebts: Debt = 
  {
    debtId: "1",
    debtorId: "user123",
    creditorId: "user456",
    description: "Compra de notebook",
    totalAmount: 4500,
    installments: 10,
    installmentValue: 450,
    createdAt: "2025-01-10T00:00:00Z",
    dueDate: "2025-11-10T00:00:00Z",
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: false,
    isPaid: false,
  }
  

export function useDebtId(debtId: string) {
  const useMock = true;

  const { data, isFetching } = useQuery<Debt>({
    queryKey: ["Debt", debtId],
    queryFn: useMock
      ? async () => {
          await new Promise((res) => setTimeout(res, 500));
          return mockDebts;
        }
      : () => debtService.getById(debtId),
    staleTime: Infinity,
  });

  return {
    debt: data,
    isLoading: isFetching,
  };
}
