export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: Date;
  salary: number;
  status: 'active' | 'inactive';
  managerId?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  status: 'available' | 'assigned' | 'maintenance' | 'disposed';
  assignedTo?: string; // employee id
  location: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  employeeId?: string;
}

export interface Assignment {
  id: string;
  assetId: string;
  employeeId: string;
  assignedDate: Date;
  returnDate?: Date;
  notes: string;
}

export interface Maintenance {
  id: string;
  assetId: string;
  date: Date;
  type: 'repair' | 'inspection' | 'upgrade';
  cost: number;
  description: string;
  technician: string;
}