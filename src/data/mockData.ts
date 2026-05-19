import type { Employee, Asset, User, Assignment, Maintenance } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@company.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'hr_manager',
    email: 'hr@company.com',
    role: 'hr',
  },
  {
    id: '3',
    username: 'rajesh_sharma',
    email: 'rajesh.sharma@company.com',
    role: 'employee',
    employeeId: '1',
  },
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Rajesh',
    lastName: 'Sharma',
    email: 'rajesh.sharma@company.com',
    phone: '+91-9876543210',
    department: 'Software Development',
    position: 'Software Engineer',
    hireDate: new Date('2023-01-15'),
    salary: 750000, // INR
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@company.com',
    phone: '+91-9876543211',
    department: 'Human Resources',
    position: 'HR Manager',
    hireDate: new Date('2022-03-10'),
    salary: 850000, // INR
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Amit',
    lastName: 'Kumar',
    email: 'amit.kumar@company.com',
    phone: '+91-9876543212',
    department: 'Accounts',
    position: 'Accountant',
    hireDate: new Date('2023-06-01'),
    salary: 650000, // INR
    status: 'active',
  },
];

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Lenovo ThinkPad X1',
    category: 'Laptop',
    serialNumber: 'LT123456',
    purchaseDate: new Date('2023-01-01'),
    purchasePrice: 125000, // INR
    currentValue: 100000, // INR
    status: 'assigned',
    assignedTo: '1',
    location: 'Mumbai Office',
    description: 'High-performance laptop for development',
  },
  {
    id: '2',
    name: 'Samsung Monitor 27"',
    category: 'Monitor',
    serialNumber: 'SM789012',
    purchaseDate: new Date('2023-02-15'),
    purchasePrice: 20000, // INR
    currentValue: 17500, // INR
    status: 'assigned',
    assignedTo: '1',
    location: 'Mumbai Office',
    description: '4K monitor for design work',
  },
  {
    id: '3',
    name: 'Godrej Office Chair',
    category: 'Furniture',
    serialNumber: 'GC345678',
    purchaseDate: new Date('2022-12-01'),
    purchasePrice: 15000, // INR
    currentValue: 10000, // INR
    status: 'available',
    location: 'Delhi Storage',
    description: 'Ergonomic office chair',
  },
  {
    id: '4',
    name: 'Samsung Galaxy S23',
    category: 'Mobile Device',
    serialNumber: 'SG901234',
    purchaseDate: new Date('2023-09-01'),
    purchasePrice: 50000, // INR
    currentValue: 45000, // INR
    status: 'assigned',
    assignedTo: '2',
    location: 'Bangalore Office',
    description: 'Company smartphone',
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    assetId: '1',
    employeeId: '1',
    assignedDate: new Date('2023-01-15'),
    notes: 'Assigned for development work',
  },
  {
    id: '2',
    assetId: '2',
    employeeId: '1',
    assignedDate: new Date('2023-02-20'),
    notes: 'Additional monitor for dual setup',
  },
  {
    id: '3',
    assetId: '4',
    employeeId: '2',
    assignedDate: new Date('2023-09-05'),
    notes: 'Company phone for HR manager',
  },
];

export const mockMaintenance: Maintenance[] = [
  {
    id: '1',
    assetId: '1',
    date: new Date('2024-01-10'),
    type: 'inspection',
    cost: 2500, // INR
    description: 'Annual maintenance check',
    technician: 'Tata Consultancy Services',
  },
];