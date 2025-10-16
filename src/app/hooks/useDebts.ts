
import { useQuery } from "@tanstack/react-query";
import { debtService } from "../services/debt";
import type { Debt } from "../entities/debt";


const mockDebts: Array<Debt> = [
  {
    debtId: "1",
    debtorId: "user123",
    creditorId: "user456",
    description: "Compra de notebook",
    totalAmount: 4500,
    installments: 10,
    installmentValue: 450,
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-11-10"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "2",
    debtorId: "user789",
    creditorId: "user456",
    description: "Empréstimo pessoal",
    totalAmount: 2000,
    installments: 5,
    installmentValue: 400,
    createdAt: new Date("2025-05-20"),
    dueDate: new Date("2025-10-20"),
    debtorConfirmedPayment: false,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "3",
    debtorId: "user123",
    creditorId: "user987",
    description: "Serviços de design gráfico",
    totalAmount: 1200,
    installments: 3,
    installmentValue: 400,
    createdAt: new Date("2025-03-01"),
    dueDate: new Date("2025-06-01"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: true,
    isPaid: true,
  },
  {
    debtId: "4",
    debtorId: "user555",
    creditorId: "user999",
    description: "Compra de móveis para escritório",
    totalAmount: 3500,
    installments: 7,
    installmentValue: 500,
    createdAt: new Date("2025-02-15"),
    dueDate: new Date("2025-09-15"),
    debtorConfirmedPayment: false,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "5",
    debtorId: "user111",
    creditorId: "user222",
    description: "Serviço de manutenção de computador",
    totalAmount: 800,
    installments: 2,
    installmentValue: 400,
    createdAt: new Date("2025-06-10"),
    dueDate: new Date("2025-08-10"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: true,
    isPaid: true,
  },
  {
    debtId: "6",
    debtorId: "user777",
    creditorId: "user333",
    description: "Compra de cadeira gamer",
    totalAmount: 1800,
    installments: 6,
    installmentValue: 300,
    createdAt: new Date("2025-04-05"),
    dueDate: new Date("2025-10-05"),
    debtorConfirmedPayment: false,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "7",
    debtorId: "user888",
    creditorId: "user456",
    description: "Curso de desenvolvimento web",
    totalAmount: 2500,
    installments: 5,
    installmentValue: 500,
    createdAt: new Date("2025-07-01"),
    dueDate: new Date("2025-12-01"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "8",
    debtorId: "user999",
    creditorId: "user123",
    description: "Compra de celular",
    totalAmount: 3000,
    installments: 10,
    installmentValue: 300,
    createdAt: new Date("2025-01-25"),
    dueDate: new Date("2025-11-25"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: true,
    isPaid: true,
  },
  {
    debtId: "9",
    debtorId: "user321",
    creditorId: "user654",
    description: "Serviço de consultoria financeira",
    totalAmount: 1500,
    installments: 3,
    installmentValue: 500,
    createdAt: new Date("2025-02-10"),
    dueDate: new Date("2025-05-10"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: false,
    isPaid: false,
  },
  {
    debtId: "10",
    debtorId: "user147",
    creditorId: "user258",
    description: "Compra de material de escritório",
    totalAmount: 600,
    installments: 2,
    installmentValue: 300,
    createdAt: new Date("2025-03-15"),
    dueDate: new Date("2025-05-15"),
    debtorConfirmedPayment: true,
    creditorConfirmedReceipt: true,
    isPaid: true,
  },
];

export function useDebts() {
  // 🔧 Se quiser alternar entre mock e API real, use uma flag:
  const useMock = true;

  const { data, isFetching } = useQuery({
    queryKey: ["Debts"],
    queryFn: useMock
      ? async () => {
          await new Promise((res) => setTimeout(res, 500));
          return mockDebts;
        }
      : debtService.getAll,
    staleTime: Infinity,
  });

  return {
    debts: data ?? [],
    isLoading: isFetching,
  };
}
