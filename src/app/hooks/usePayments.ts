import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment";
import type { Payment } from "../entities/payment";

export const mockPayments: Array<Payment> = [
  // Dívida 1
  {
    PaymentId: 'pay-001',
    DebtId: 'debt-001',
    InstallmentId: 'inst-001',
    Amount: 350.0,
    PaidAt: '2024-01-10T14:30:00.000Z',
  },
  {
    PaymentId: 'pay-002',
    DebtId: 'debt-001',
    InstallmentId: 'inst-002',
    Amount: 350.0,
    PaidAt: '2024-02-10T14:30:00.000Z',
  },

  // Dívida 2
  {
    PaymentId: 'pay-003',
    DebtId: 'debt-002',
    InstallmentId: 'inst-003',
    Amount: 520.5,
    PaidAt: '2024-03-05T18:45:00.000Z',
  },
  {
    PaymentId: 'pay-004',
    DebtId: 'debt-002',
    InstallmentId: 'inst-004',
    Amount: 520.5,
    PaidAt: '2024-04-05T18:45:00.000Z',
  },

  // Dívida 3
  {
    PaymentId: 'pay-005',
    DebtId: 'debt-003',
    InstallmentId: 'inst-005',
    Amount: 1200.0,
    PaidAt: '2024-01-20T09:15:00.000Z',
  },

  // Dívida 4 (pagamento parcial / valor diferente)
  {
    PaymentId: 'pay-006',
    DebtId: 'debt-004',
    InstallmentId: 'inst-006',
    Amount: 275.75,
    PaidAt: '2024-02-28T21:00:00.000Z',
  },
]



export function usePayments() {
  const useMock = true;

  const { data, isFetching } = useQuery({
    queryKey: ["Payments"],
    queryFn: useMock
      ? async () => {
          await new Promise((res) => setTimeout(res, 500));
          return mockPayments;
        }
      : paymentService.getAll,
    staleTime: Infinity,
  });

  return {
    Payments: data ?? [],
    isLoading: isFetching,
  };
}
