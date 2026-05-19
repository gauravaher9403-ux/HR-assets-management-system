import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Employee } from '../types';

const COLLECTION_NAME = 'employees';

export const employeeService = {
  // Get all employees
  async getAll(): Promise<Employee[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
        } as Employee;
      });
    } catch (error) {
      console.error('Error getting employees:', error);
      throw error;
    }
  },

  // Get employee by ID
  async getById(id: string): Promise<Employee | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          ...data,
          hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
        } as Employee;
      }
      return null;
    } catch (error) {
      console.error('Error getting employee:', error);
      throw error;
    }
  },

  // Add new employee
  async create(employee: Omit<Employee, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...employee,
        hireDate: employee.hireDate.toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  // Update employee
  async update(id: string, employee: Partial<Employee>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...employee,
        ...(employee.hireDate && { hireDate: employee.hireDate.toISOString() }),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },

  // Delete employee
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },

  // Get employees by department
  async getByDepartment(department: string): Promise<Employee[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('department', '==', department)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
        } as Employee;
      });
    } catch (error) {
      console.error('Error getting employees by department:', error);
      throw error;
    }
  }
};