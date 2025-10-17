import { useQuery } from "@tanstack/react-query";
import { InstallmentsService } from "../services/installments";
import type { Installment } from "../entities/installment";

const mockInstallments: Array<Installment> = [
  // Dívida 1
  {
    installmentId: "inst-1",
    debtId: "1",
    number: 1,
    dueDate: "2025-02-10T00:00:00Z",
    amount: 450,
    paidAmount: 450,
    isPaid: true,
  },
  {
    installmentId: "inst-2",
    debtId: "1",
    number: 2,
    dueDate: "2025-03-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-3",
    debtId: "1",
    number: 3,
    dueDate: "2025-04-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-4",
    debtId: "1",
    number: 4,
    dueDate: "2025-05-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-5",
    debtId: "1",
    number: 5,
    dueDate: "2025-06-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-6",
    debtId: "1",
    number: 6,
    dueDate: "2025-07-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-7",
    debtId: "1",
    number: 7,
    dueDate: "2025-08-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-8",
    debtId: "1",
    number: 8,
    dueDate: "2025-09-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-9",
    debtId: "1",
    number: 9,
    dueDate: "2025-10-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-10",
    debtId: "1",
    number: 10,
    dueDate: "2025-11-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-11",
    debtId: "1",
    number: 11,
    dueDate: "2025-12-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-12",
    debtId: "1",
    number: 12,
    dueDate: "2026-01-10T00:00:00Z",
    amount: 450,
    paidAmount: 0,
    isPaid: false,
  },
];


export function useInstallments() {
  const useMock = true;

  const { data, isFetching } = useQuery({
    queryKey: ["Installments"],
    queryFn: useMock
      ? async () => {
          await new Promise((res) => setTimeout(res, 500));
          return mockInstallments;
        }
      : InstallmentsService.getAll,
    staleTime: Infinity,
  });

  return {
    installments: data ?? [],
    isLoading: isFetching,
  };
}
