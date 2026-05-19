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
import type { Asset } from '../types';

const COLLECTION_NAME = 'assets';

export const assetService = {
  // Get all assets
  async getAll(): Promise<Asset[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        purchaseDate: new Date(doc.data().purchaseDate)
      } as Asset));
    } catch (error) {
      console.error('Error getting assets:', error);
      throw error;
    }
  },

  // Get asset by ID
  async getById(id: string): Promise<Asset | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          purchaseDate: new Date(data.purchaseDate)
        } as Asset;
      }
      return null;
    } catch (error) {
      console.error('Error getting asset:', error);
      throw error;
    }
  },

  // Add new asset
  async create(asset: Omit<Asset, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...asset,
        purchaseDate: asset.purchaseDate.toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating asset:', error);
      throw error;
    }
  },

  // Update asset
  async update(id: string, asset: Partial<Asset>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...asset,
        ...(asset.purchaseDate && { purchaseDate: asset.purchaseDate.toISOString() }),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating asset:', error);
      throw error;
    }
  },

  // Delete asset
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting asset:', error);
      throw error;
    }
  },

  // Get assets by status
  async getByStatus(status: Asset['status']): Promise<Asset[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        purchaseDate: new Date(doc.data().purchaseDate)
      } as Asset));
    } catch (error) {
      console.error('Error getting assets by status:', error);
      throw error;
    }
  },

  // Get assets by employee
  async getByEmployee(employeeId: string): Promise<Asset[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('assignedTo', '==', employeeId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        purchaseDate: new Date(doc.data().purchaseDate)
      } as Asset));
    } catch (error) {
      console.error('Error getting assets by employee:', error);
      throw error;
    }
  }
};