export interface Debt {
  debtId: string;
  description: string;
  totalAmount: number;
  installments: number;
  installmentValue: number;
  createdAt: string;
  dueDate: string;
  isPaid: boolean;
  involvedPartyName: string
  isMyDebt: string
}
