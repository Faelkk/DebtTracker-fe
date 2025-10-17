export interface Installment {
  installmentId: string;
  debtId: string;
  number: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  isPaid: boolean;
}
