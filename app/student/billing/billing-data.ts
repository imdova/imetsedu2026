/**
 * Mock data for Billing & Payment History page.
 */

export const billingSummary = {
  totalCourseFee: "12,000.00",
  academicYear: "Academic Year 2023-24",
  amountPaid: "8,500.00",
  percentComplete: 70.8,
  remainingBalance: "3,500.00",
  nextInstallmentDays: 12,
};

export type TransactionStatus = "paid" | "pending" | "overdue";

export interface Transaction {
  id: string;
  date: string;
  invoiceId: string;
  description: string;
  amount: string;
  method: "card" | "bank";
  methodLabel: string;
  status: TransactionStatus;
}

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "Oct 12, 2023",
    invoiceId: "#INV-1024",
    description: "Installment 2",
    amount: "2,500.00",
    method: "card",
    methodLabel: "Visa ****1234",
    status: "paid",
  },
  {
    id: "2",
    date: "Sep 12, 2023",
    invoiceId: "#INV-1012",
    description: "Installment 1",
    amount: "3,000.00",
    method: "card",
    methodLabel: "Visa ****1234",
    status: "paid",
  },
  {
    id: "3",
    date: "Nov 12, 2023",
    invoiceId: "#INV-1056",
    description: "Lab Fees",
    amount: "500.00",
    method: "bank",
    methodLabel: "Bank Transfer",
    status: "pending",
  },
  {
    id: "4",
    date: "Aug 12, 2023",
    invoiceId: "#INV-0988",
    description: "Registration Fee",
    amount: "2,500.00",
    method: "card",
    methodLabel: "Mastercard ****5678",
    status: "overdue",
  },
];

export interface UpcomingPayment {
  id: string;
  title: string;
  dueLabel: string;
  amount: string;
  variant: "installment" | "calendar" | "person";
}

export const upcomingPayments: UpcomingPayment[] = [
  {
    id: "1",
    title: "INSTALLMENT 3",
    dueLabel: "DUE DEC 15",
    amount: "2,000.00",
    variant: "installment",
  },
  {
    id: "2",
    title: "Final Installment",
    dueLabel: "Due Jan 20, 2024",
    amount: "1,500.00",
    variant: "calendar",
  },
  {
    id: "3",
    title: "Library Access Fee",
    dueLabel: "Due Feb 01, 2024",
    amount: "150.00",
    variant: "person",
  },
];
