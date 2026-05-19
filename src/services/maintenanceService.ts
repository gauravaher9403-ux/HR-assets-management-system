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
import type { Maintenance } from '../types';

const COLLECTION_NAME = 'maintenance';

export const maintenanceService = {
  // Get all maintenance records
  async getAll(): Promise<Maintenance[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date)
      } as Maintenance));
    } catch (error) {
      console.error('Error getting maintenance records:', error);
      throw error;
    }
  },

  // Get maintenance record by ID
  async getById(id: string): Promise<Maintenance | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          date: new Date(data.date)
        } as Maintenance;
      }
      return null;
    } catch (error) {
      console.error('Error getting maintenance record:', error);
      throw error;
    }
  },

  // Add new maintenance record
  async create(maintenance: Omit<Maintenance, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...maintenance,
        date: maintenance.date.toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      throw error;
    }
  },

  // Update maintenance record
  async update(id: string, maintenance: Partial<Maintenance>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...maintenance,
        ...(maintenance.date && { date: maintenance.date.toISOString() }),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating maintenance record:', error);
      throw error;
    }
  },

  // Delete maintenance record
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting maintenance record:', error);
      throw error;
    }
  },

  // Get maintenance records by asset
  async getByAsset(assetId: string): Promise<Maintenance[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('assetId', '==', assetId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date)
      } as Maintenance));
    } catch (error) {
      console.error('Error getting maintenance records by asset:', error);
      throw error;
    }
  }
};