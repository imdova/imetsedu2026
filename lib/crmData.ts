export type LeadStatus = 'WARM' | 'INTERESTED' | 'COLD' | 'FOLLOWING' | 'NEW';
export type LeadSource = 'FB Campaign' | 'Direct Message' | 'FB Feed' | 'Search Ads' | 'Webinar' | 'Website';
export type PipelineStage = 'NEW INQUIRIES' | 'CONTACTED' | 'WAITING FOR PAYMENT' | 'ENROLLED';

export type LeadSpecialty = 'Doctor' | 'Dentist' | 'Pharmacist' | 'Nurse' | 'Technician' | 'Science' | 'Others';

export const leadSpecialtyOptions: LeadSpecialty[] = [
  'Doctor',
  'Dentist',
  'Pharmacist',
  'Nurse',
  'Technician',
  'Science',
  'Others',
];

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneMasked?: string;
  location?: string;
  source: LeadSource;
  assignedTo: { name: string; avatar?: string };
  dateAdded: string;
  status: LeadStatus;
  score: number;
  lastActive: string;
  specialty?: LeadSpecialty;
  tags: { label: string; variant: 'blue' | 'green' | 'gray' }[];
  courseInterest?: string;
  pipelineStage: PipelineStage;
  primaryAction?: string;
  /** Active Pipeline: STATUS & PAYMENT */
  enrollmentStatus?: 'ENROLLED' | 'WAITING FOR PAYMENT' | 'NEW DISCOVERY';
  paymentSummary?: 'Fully Paid' | '2/3 Paid' | '1/2 Paid' | 'No payment record';
}

export const pipelineStages: { id: PipelineStage; label: string; color: string; dot: string }[] = [
  { id: 'NEW INQUIRIES', label: 'NEW INQUIRIES', color: 'bg-blue-500', dot: 'bg-blue-500' },
  { id: 'CONTACTED', label: 'CONTACTED', color: 'bg-amber-500', dot: 'bg-amber-500' },
  { id: 'WAITING FOR PAYMENT', label: 'WAITING FOR PAYMENT', color: 'bg-yellow-500', dot: 'bg-yellow-500' },
  { id: 'ENROLLED', label: 'ENROLLED', color: 'bg-green-500', dot: 'bg-green-500' },
];

export const leadStatusStyles: Record<LeadStatus, string> = {
  WARM: 'bg-amber-100 text-amber-800',
  INTERESTED: 'bg-blue-100 text-blue-800',
  COLD: 'bg-gray-100 text-gray-700',
  FOLLOWING: 'bg-green-100 text-green-800',
  NEW: 'bg-blue-100 text-blue-800',
};

export const crmLeads: CRMLead[] = [
  {
    id: '1',
    name: 'Basma Khaled',
    email: 'basma.k@example.com',
    phone: '+20 102 123 456',
    phoneMasked: '+20 102 *** 456',
    source: 'FB Campaign',
    assignedTo: { name: 'Marina Magdy' },
    dateAdded: 'Jan 25, 2024',
    status: 'WARM',
    score: 92,
    lastActive: '15m ago',
    tags: [{ label: 'SCHOLARSHIP', variant: 'blue' }, { label: 'DATA SCIENCE', variant: 'gray' }],
    courseInterest: 'Web Development Bootcamp',
    pipelineStage: 'NEW INQUIRIES',
    primaryAction: 'Issue Certificate',
    specialty: 'Doctor',
  },
  {
    id: '2',
    name: 'Omar Farooq',
    email: 'omar.f@example.com',
    phone: '+20 101 234 567',
    phoneMasked: '+20 101 *** 567',
    source: 'Direct Message',
    assignedTo: { name: 'Rania Samy' },
    dateAdded: 'Jan 24, 2024',
    status: 'INTERESTED',
    score: 85,
    lastActive: '2h ago',
    tags: [{ label: 'WEBINAR ATTENDEE', variant: 'green' }, { label: 'PYTHON COURSE', variant: 'gray' }],
    courseInterest: 'Web Design',
    pipelineStage: 'CONTACTED',
    primaryAction: 'Send Course Details',
    specialty: 'Dentist',
  },
  {
    id: '3',
    name: 'Morgan Lee',
    email: 'mlee@edu.com',
    phone: '+20 100 345 678',
    phoneMasked: '+20 100 *** 678',
    source: 'FB Feed',
    assignedTo: { name: 'Kariman Tarek' },
    dateAdded: 'Jan 23, 2024',
    status: 'COLD',
    score: 45,
    lastActive: 'Yesterday',
    tags: [{ label: 'NEWSLETTER', variant: 'gray' }, { label: 'LOW INTENT', variant: 'gray' }],
    courseInterest: 'Python Bootcamp',
    pipelineStage: 'NEW INQUIRIES',
    primaryAction: 'Send Follow-up',
    enrollmentStatus: 'NEW DISCOVERY',
    paymentSummary: 'No payment record',
    specialty: 'Pharmacist',
  },
  {
    id: '4',
    name: 'Ahmad Hassan',
    email: 'ahmad.h@example.com',
    phone: '+20 109 456 789',
    phoneMasked: '+20 109 *** 789',
    source: 'Search Ads',
    assignedTo: { name: 'Marina Magdy' },
    dateAdded: 'Jan 22, 2024',
    status: 'FOLLOWING',
    score: 78,
    lastActive: '3d ago',
    tags: [{ label: 'AI ETHICS', variant: 'blue' }, { label: 'CORPORATE', variant: 'blue' }],
    courseInterest: 'IELTS Prep',
    pipelineStage: 'CONTACTED',
    primaryAction: 'Invite to Lab',
    specialty: 'Nurse',
  },
  {
    id: '5',
    name: 'Usman Tariq',
    email: 'usman.t@example.com',
    phone: '+20 108 567 890',
    phoneMasked: '+20 108 *** 890',
    source: 'Website',
    assignedTo: { name: 'Rania Samy' },
    dateAdded: 'Jan 21, 2024',
    status: 'INTERESTED',
    score: 88,
    lastActive: '1d ago',
    tags: [{ label: 'HIGH INTENT', variant: 'green' }],
    courseInterest: 'Full Stack Development',
    pipelineStage: 'WAITING FOR PAYMENT',
    primaryAction: 'Send Invoice',
    specialty: 'Technician',
  },
  {
    id: '6',
    name: 'Zainab Ali',
    email: 'zainab.a@example.com',
    phone: '+20 107 678 901',
    phoneMasked: '+20 107 *** 901',
    source: 'FB Campaign',
    assignedTo: { name: 'Kariman Tarek' },
    dateAdded: 'Jan 20, 2024',
    status: 'WARM',
    score: 72,
    lastActive: '5h ago',
    tags: [{ label: 'GRAPHIC DESIGN', variant: 'gray' }],
    courseInterest: 'Graphic Design',
    pipelineStage: 'CONTACTED',
    primaryAction: 'Follow Up',
    specialty: 'Science',
  },
  {
    id: '7',
    name: 'Jamie Smith',
    email: 'j.smith@college.edu',
    phone: '+1 555 111 222',
    phoneMasked: '+1 555 *** 222',
    location: 'New York, USA',
    source: 'Webinar',
    assignedTo: { name: 'Marina Magdy' },
    dateAdded: 'Jan 19, 2024',
    status: 'INTERESTED',
    score: 92,
    lastActive: '15m ago',
    tags: [{ label: 'SCHOLARSHIP', variant: 'blue' }, { label: 'DATA SCIENCE', variant: 'gray' }],
    courseInterest: 'Data Science',
    pipelineStage: 'ENROLLED',
    primaryAction: 'Issue Certificate',
    enrollmentStatus: 'ENROLLED',
    paymentSummary: 'Fully Paid',
    specialty: 'Doctor',
  },
  {
    id: '8',
    name: 'Alex Rivera',
    email: 'alex.r@university.edu',
    phone: '+1 555 222 333',
    phoneMasked: '+1 555 *** 333',
    location: 'California, USA',
    source: 'Website',
    assignedTo: { name: 'Rania Samy' },
    dateAdded: 'Jan 18, 2024',
    status: 'WARM',
    score: 85,
    lastActive: '2h ago',
    tags: [{ label: 'WEBINAR ATTENDEE', variant: 'green' }, { label: 'PYTHON COURSE', variant: 'gray' }],
    courseInterest: 'Python',
    pipelineStage: 'WAITING FOR PAYMENT',
    primaryAction: 'Record Payment',
    enrollmentStatus: 'WAITING FOR PAYMENT',
    paymentSummary: '2/3 Paid',
    specialty: 'Others',
  },
  {
    id: '9',
    name: 'Taylor Kim',
    email: 't.kim@outlook.com',
    phone: '+1 555 333 444',
    phoneMasked: '+1 555 *** 444',
    source: 'Webinar',
    assignedTo: { name: 'Marina Magdy' },
    dateAdded: 'Jan 17, 2024',
    status: 'INTERESTED',
    score: 70,
    lastActive: '3h ago',
    tags: [{ label: 'MBA', variant: 'blue' }, { label: 'FULL-TIME', variant: 'gray' }],
    courseInterest: 'MBA',
    pipelineStage: 'ENROLLED',
    primaryAction: 'Record Payment',
    enrollmentStatus: 'ENROLLED',
    paymentSummary: '1/2 Paid',
    specialty: 'Nurse',
  },
];

export const coursesOfInterest = [
  'Web Development Bootcamp',
  'Web Design',
  'Python Bootcamp',
  'IELTS Prep',
  'Full Stack Development',
  'Graphic Design',
  'Data Science',
  'MBA',
  'Healthcare Quality',
];

export const assignedUsers = [
  { name: 'Marina Magdy', initials: 'MM' },
  { name: 'Rania Samy', initials: 'RS' },
  { name: 'Kariman Tarek', initials: 'KT' },
];

// Active Pipeline: enrollment + payment status
export type EnrollmentStatus = 'ENROLLED' | 'WAITING FOR PAYMENT' | 'NEW DISCOVERY';
export type PaymentSummary = 'Fully Paid' | '2/3 Paid' | '1/2 Paid' | 'No payment record';

export const activePipelineFilterPills = [
  { id: 'hot', label: 'My Hot Leads', icon: '⭐', active: true },
  { id: 'fb', label: 'Facebook Campaigns', icon: '📢' },
  { id: 'followup', label: 'Needs Follow-up', icon: '📅' },
  { id: 'intl', label: 'International Students', icon: '🎓' },
  { id: 'scholarship', label: 'Scholarship Applied', icon: '📄' },
] as const;

// Payments
export type PaymentMethod = 'Bank Transfer' | 'Cash' | 'Online (Stripe)';
export type PaymentRecordStatus = 'PAID' | 'PARTIAL' | 'PENDING';
export type InstallmentStatus = 'PAID' | 'DUE' | 'SCHEDULED';

export interface PaymentRecord {
  id: string;
  displayId: string;
  studentId: string;
  studentName: string;
  courseName?: string;
  studentAvatar?: string;
  totalCourseFee: number;
  paymentMethod: PaymentMethod;
  status: PaymentRecordStatus;
  installments: Installment[];
}

export interface Installment {
  index: number;
  total: number;
  amount: number;
  dueDate?: string;
  paidDate?: string;
  status: InstallmentStatus;
}

export const paymentRecords: PaymentRecord[] = [
  {
    id: 'pr1',
    displayId: '99401',
    studentId: '2',
    studentName: 'Alex Rivera',
    courseName: 'Python',
    totalCourseFee: 2400,
    paymentMethod: 'Bank Transfer',
    status: 'PARTIAL',
    installments: [
      { index: 1, total: 4, amount: 600, paidDate: 'Sep 12, 2023', status: 'PAID' },
      { index: 2, total: 4, amount: 600, paidDate: 'Oct 12, 2023', status: 'PAID' },
      { index: 3, total: 4, amount: 600, dueDate: 'Nov 12, 2023', status: 'DUE' },
      { index: 4, total: 4, amount: 600, dueDate: 'Dec 12, 2023', status: 'SCHEDULED' },
    ],
  },
  {
    id: 'pr2',
    displayId: '88219',
    studentId: '7',
    studentName: 'Jamie Smith',
    courseName: 'Data Science Certification',
    totalCourseFee: 1800,
    paymentMethod: 'Cash',
    status: 'PAID',
    installments: [
      { index: 1, total: 2, amount: 900, paidDate: 'Jan 10, 2024', status: 'PAID' },
      { index: 2, total: 2, amount: 900, paidDate: 'Jan 15, 2024', status: 'PAID' },
    ],
  },
  {
    id: 'pr3',
    displayId: '44012',
    studentId: '3',
    studentName: 'Morgan Lee',
    courseName: 'Python Bootcamp',
    totalCourseFee: 3500,
    paymentMethod: 'Online (Stripe)',
    status: 'PENDING',
    installments: [
      { index: 1, total: 3, amount: 1166.67, dueDate: 'Jan 28, 2024', status: 'DUE' },
      { index: 2, total: 3, amount: 1166.67, dueDate: 'Feb 28, 2024', status: 'SCHEDULED' },
      { index: 3, total: 3, amount: 1166.66, dueDate: 'Mar 28, 2024', status: 'SCHEDULED' },
    ],
  },
];

export const paymentFilterTabs = [
  'All Payments',
  'Overdue Installments',
  'Pending Verification',
  'Bank Transfers',
  'Fully Paid',
] as const;
