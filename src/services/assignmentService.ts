import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Assignment } from '../types';

const COLLECTION_NAME = 'assignments';

export const assignmentService = {
  // Get all assignments
  async getAll(): Promise<Assignment[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('assignedDate', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        assignedDate: new Date(doc.data().assignedDate),
        returnDate: doc.data().returnDate ? new Date(doc.data().returnDate) : undefined
      } as Assignment));
    } catch (error) {
      console.error('Error getting assignments:', error);
      throw error;
    }
  },

  // Get assignment by ID
  async getById(id: string): Promise<Assignment | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          assignedDate: new Date(data.assignedDate),
          returnDate: data.returnDate ? new Date(data.returnDate) : undefined
        } as Assignment;
      }
      return null;
    } catch (error) {
      console.error('Error getting assignment:', error);
      throw error;
    }
  },

  // Add new assignment
  async create(assignment: Omit<Assignment, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...assignment,
        assignedDate: assignment.assignedDate.toISOString(),
        returnDate: assignment.returnDate?.toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  },

  // Update assignment
  async update(id: string, assignment: Partial<Assignment>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...assignment,
        ...(assignment.assignedDate && { assignedDate: assignment.assignedDate.toISOString() }),
        ...(assignment.returnDate && { returnDate: assignment.returnDate.toISOString() }),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating assignment:', error);
      throw error;
    }
  },

  // Delete assignment
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
      throw error;
    }
  },

  // Get assignments by employee
  async getByEmployee(employeeId: string): Promise<Assignment[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('employeeId', '==', employeeId),
        orderBy('assignedDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        assignedDate: new Date(doc.data().assignedDate),
        returnDate: doc.data().returnDate ? new Date(doc.data().returnDate) : undefined
      } as Assignment));
    } catch (error) {
      console.error('Error getting assignments by employee:', error);
      throw error;
    }
  },

  // Get assignments by asset
  async getByAsset(assetId: string): Promise<Assignment[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('assetId', '==', assetId),
        orderBy('assignedDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        assignedDate: new Date(doc.data().assignedDate),
        returnDate: doc.data().returnDate ? new Date(doc.data().returnDate) : undefined
      } as Assignment));
    } catch (error) {
      console.error('Error getting assignments by asset:', error);
      throw error;
    }
  }
};