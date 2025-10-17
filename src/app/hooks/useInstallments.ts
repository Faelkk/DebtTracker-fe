import { useQuery } from "@tanstack/react-query";
import { InstallmentsService } from "../services/installments";
import type { Installment } from "../entities/installment";

const mockInstallments: Array<Installment> = [
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
    debtId: "2",
    number: 1,
    dueDate: "2025-06-20T00:00:00Z",
    amount: 400,
    paidAmount: 400,
    isPaid: true,
  },
  {
    installmentId: "inst-4",
    debtId: "2",
    number: 2,
    dueDate: "2025-07-20T00:00:00Z",
    amount: 400,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-5",
    debtId: "3",
    number: 1,
    dueDate: "2025-04-01T00:00:00Z",
    amount: 400,
    paidAmount: 400,
    isPaid: true,
  },
  {
    installmentId: "inst-6",
    debtId: "3",
    number: 2,
    dueDate: "2025-05-01T00:00:00Z",
    amount: 400,
    paidAmount: 400,
    isPaid: true,
  },
  {
    installmentId: "inst-7",
    debtId: "4",
    number: 1,
    dueDate: "2025-03-15T00:00:00Z",
    amount: 500,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-8",
    debtId: "4",
    number: 2,
    dueDate: "2025-04-15T00:00:00Z",
    amount: 500,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-9",
    debtId: "5",
    number: 1,
    dueDate: "2025-07-10T00:00:00Z",
    amount: 400,
    paidAmount: 400,
    isPaid: true,
  },
  {
    installmentId: "inst-10",
    debtId: "6",
    number: 1,
    dueDate: "2025-05-05T00:00:00Z",
    amount: 300,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-11",
    debtId: "6",
    number: 2,
    dueDate: "2025-06-05T00:00:00Z",
    amount: 300,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-12",
    debtId: "7",
    number: 1,
    dueDate: "2025-08-01T00:00:00Z",
    amount: 500,
    paidAmount: 500,
    isPaid: true,
  },
  {
    installmentId: "inst-13",
    debtId: "7",
    number: 2,
    dueDate: "2025-09-01T00:00:00Z",
    amount: 500,
    paidAmount: 0,
    isPaid: false,
  },
  {
    installmentId: "inst-14",
    debtId: "8",
    number: 1,
    dueDate: "2025-02-25T00:00:00Z",
    amount: 300,
    paidAmount: 300,
    isPaid: true,
  },
  {
    installmentId: "inst-15",
    debtId: "8",
    number: 2,
    dueDate: "2025-03-25T00:00:00Z",
    amount: 300,
    paidAmount: 300,
    isPaid: true,
  },
  {
    installmentId: "inst-16",
    debtId: "9",
    number: 1,
    dueDate: "2025-03-10T00:00:00Z",
    amount: 500,
    paidAmount: 500,
    isPaid: true,
  },
  {
    installmentId: "inst-17",
    debtId: "10",
    number: 1,
    dueDate: "2025-04-15T00:00:00Z",
    amount: 300,
    paidAmount: 300,
    isPaid: true,
  },
  {
    installmentId: "inst-18",
    debtId: "10",
    number: 2,
    dueDate: "2025-05-15T00:00:00Z",
    amount: 300,
    paidAmount: 300,
    isPaid: true,
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
