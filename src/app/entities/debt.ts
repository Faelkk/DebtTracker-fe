export interface Debt {
  debtId: string;
  description: string;
  totalAmount: number;
  installments: number;
  installmentValue: number;
  createdAt: string;
  dueDate: string;
  isPaid: boolean;
  debtorName: string;
  creditorName: string
  isMyDebt: string
}
