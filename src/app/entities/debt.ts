export interface Debt {
  debtId: string;
  debtorId: string;
  creditorId: string;
  description: string;
  totalAmount: number;
  installments: number;
  installmentValue: number;
  createdAt: string;
  dueDate: string;
  debtorConfirmedPayment: boolean;
  creditorConfirmedReceipt: boolean;
  isPaid: boolean;
}
