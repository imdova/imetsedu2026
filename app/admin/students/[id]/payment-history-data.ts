/**
 * Payment History Ledger – summary cards, transactions, installment roadmap, plan summary.
 */

export type TransactionStatus = "paid" | "overdue" | "pending";

export interface Transaction {
  id: string;
  transactionDate: string;
  receiptId: string | null;
  description: string;
  method: string;
  amount: number;
  status: TransactionStatus;
}

export interface InstallmentStep {
  label: string;
  date: string;
  amount: number;
  status: "paid" | "overdue" | "upcoming";
}

export interface PaymentHistoryData {
  totalFee: number;
  totalPaid: number;
  outstanding: number;
  upcomingPaymentDate: string;
  upcomingAmount: number;
  transactions: Transaction[];
  installmentRoadmap: InstallmentStep[];
  planDuration: string;
  planMethod: string;
}

const defaultPaymentHistory: PaymentHistoryData = {
  totalFee: 12500,
  totalPaid: 8200,
  outstanding: 4300,
  upcomingPaymentDate: "2023-10-15",
  upcomingAmount: 1200,
  transactions: [
    {
      id: "1",
      transactionDate: "2023-09-01",
      receiptId: "REC-8821",
      description: "Enrollment Fee",
      method: "Visa (...4242)",
      amount: 3000,
      status: "paid",
    },
    {
      id: "2",
      transactionDate: "2023-09-15",
      receiptId: "REC-8945",
      description: "Installment 1",
      method: "Bank Transfer",
      amount: 2600,
      status: "paid",
    },
    {
      id: "3",
      transactionDate: "2023-09-28",
      receiptId: "REC-9012",
      description: "Lab Equipment Fee",
      method: "Mastercard",
      amount: 2600,
      status: "paid",
    },
    {
      id: "4",
      transactionDate: "2023-10-01",
      receiptId: null,
      description: "Installment 2",
      method: "--",
      amount: 1100,
      status: "overdue",
    },
    {
      id: "5",
      transactionDate: "2023-10-15",
      receiptId: null,
      description: "Installment 3",
      method: "--",
      amount: 1200,
      status: "pending",
    },
  ],
  installmentRoadmap: [
    {
      label: "Enrollment Fee",
      date: "Paid Sep 01, 2023",
      amount: 3000,
      status: "paid",
    },
    {
      label: "Installment 1",
      date: "Paid Sep 15, 2023",
      amount: 2600,
      status: "paid",
    },
    {
      label: "Installment 2",
      date: "Due Oct 01, 2023",
      amount: 1100,
      status: "overdue",
    },
    {
      label: "Installment 3",
      date: "Due Oct 15, 2023",
      amount: 1200,
      status: "upcoming",
    },
    {
      label: "Final Installment",
      date: "Due Nov 01, 2023",
      amount: 2000,
      status: "upcoming",
    },
  ],
  planDuration: "6 Months",
  planMethod: "Installment Plan A",
};

const paymentByStudentId: Record<string, PaymentHistoryData> = {
  "1": defaultPaymentHistory,
  "2": {
    ...defaultPaymentHistory,
    totalFee: 7500,
    totalPaid: 6000,
    outstanding: 1500,
    upcomingPaymentDate: "2024-01-20",
    upcomingAmount: 1500,
  },
};

export function getPaymentHistory(studentId: string): PaymentHistoryData {
  return paymentByStudentId[studentId] ?? defaultPaymentHistory;
}

export const TRANSACTIONS_TOTAL = 12;
export const PAGE_SIZE = 5;
