import { create } from 'zustand';
import type { Employee, Asset, User, Assignment, Maintenance } from '../types';
import { employeeService } from '../services/employeeService';
import { assetService } from '../services/assetService';
import { assignmentService } from '../services/assignmentService';
import { maintenanceService } from '../services/maintenanceService';
import { authService } from '../services/authService';
import { mockEmployees, mockAssets, mockAssignments, mockMaintenance } from '../data/mockData';

interface AppState {
  // Loading states
  loading: boolean;
  error: string | null;

  // Data
  employees: Employee[];
  assets: Asset[];
  assignments: Assignment[];
  maintenance: Maintenance[];

  // Current user
  currentUser: User | null;
  initializing: boolean;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userData: Omit<User, 'id' | 'email'>) => Promise<boolean>;
  logout: () => Promise<void>;

  // Data loading actions
  loadEmployees: () => Promise<void>;
  loadAssets: () => Promise<void>;
  loadAssignments: () => Promise<void>;
  loadMaintenance: () => Promise<void>;

  // Employee actions
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;

  // Asset actions
  addAsset: (asset: Omit<Asset, 'id'>) => Promise<void>;
  updateAsset: (id: string, asset: Partial<Asset>) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
  assignAsset: (assetId: string, employeeId: string, notes: string) => Promise<void>;
  returnAsset: (assetId: string) => Promise<void>;

  // Maintenance actions
  addMaintenance: (maintenance: Omit<Maintenance, 'id'>) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  loading: false,
  error: null,
  employees: [],
  assets: [],
  assignments: [],
  maintenance: [],
  currentUser: null,
  initializing: true,

  // Initialize app and load data
  initialize: async () => {
    try {
      set({ initializing: true, error: null });

      // No auth listener, just load data if user is logged in, but since no persistent login, set to null
      set({ currentUser: null });
    } catch (error) {
      console.error('Error initializing app:', error);
      set({ error: 'Failed to initialize app' });
    } finally {
      set({ initializing: false });
    }
  },

  // Authentication
  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const user = await authService.signIn(email, password);
      set({ currentUser: user });
      await Promise.all([
        get().loadEmployees(),
        get().loadAssets(),
        get().loadAssignments(),
        get().loadMaintenance(),
      ]);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ error: 'Invalid email or password' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string, userData) => {
    try {
      set({ loading: true, error: null });
      await authService.signUp(userData.username, password, { ...userData, email });
      return true;
    } catch (error) {
      console.error('Sign-up error:', error);
      set({ error: 'Failed to create account' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await authService.signOut();
      set({
        currentUser: null,
        employees: [],
        assets: [],
        assignments: [],
        maintenance: []
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Data loading functions
  loadEmployees: async () => {
    set({ employees: mockEmployees });
  },

  loadAssets: async () => {
    set({ assets: mockAssets });
  },

  loadAssignments: async () => {
    set({ assignments: mockAssignments });
  },

  loadMaintenance: async () => {
    set({ maintenance: mockMaintenance });
  },

  // Employee actions
  addEmployee: async (employeeData) => {
    set({ loading: true, error: null });
    set((state) => ({
      employees: [...state.employees, { ...employeeData, id: Date.now().toString() }],
      loading: false
    }));
  },

  updateEmployee: async (id, employeeData) => {
    try {
      set({ loading: true, error: null });
      await employeeService.update(id, employeeData);
      await get().loadEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
      set({ error: 'Failed to update employee' });
    } finally {
      set({ loading: false });
    }
  },

  deleteEmployee: async (id) => {
    try {
      set({ loading: true, error: null });
      await employeeService.delete(id);
      await get().loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      set({ error: 'Failed to delete employee' });
    } finally {
      set({ loading: false });
    }
  },

  // Asset actions
  addAsset: async (assetData) => {
    try {
      set({ loading: true, error: null });
      await assetService.create(assetData);
      await get().loadAssets();
    } catch (error) {
      console.error('Error adding asset:', error);
      set({ error: 'Failed to add asset' });
    } finally {
      set({ loading: false });
    }
  },

  updateAsset: async (id, assetData) => {
    try {
      set({ loading: true, error: null });
      await assetService.update(id, assetData);
      await get().loadAssets();
    } catch (error) {
      console.error('Error updating asset:', error);
      set({ error: 'Failed to update asset' });
    } finally {
      set({ loading: false });
    }
  },

  deleteAsset: async (id) => {
    try {
      set({ loading: true, error: null });
      await assetService.delete(id);
      await get().loadAssets();
    } catch (error) {
      console.error('Error deleting asset:', error);
      set({ error: 'Failed to delete asset' });
    } finally {
      set({ loading: false });
    }
  },

  assignAsset: async (assetId, employeeId, notes) => {
    try {
      set({ loading: true, error: null });

      // Create assignment record
      await assignmentService.create({
        assetId,
        employeeId,
        assignedDate: new Date(),
        notes,
      });

      // Update asset status
      await assetService.update(assetId, {
        status: 'assigned',
        assignedTo: employeeId,
      });

      await Promise.all([
        get().loadAssets(),
        get().loadAssignments(),
      ]);
    } catch (error) {
      console.error('Error assigning asset:', error);
      set({ error: 'Failed to assign asset' });
    } finally {
      set({ loading: false });
    }
  },

  returnAsset: async (assetId) => {
    try {
      set({ loading: true, error: null });

      // Update asset status
      await assetService.update(assetId, {
        status: 'available',
        assignedTo: undefined,
      });

      // Update assignment with return date
      const state = get();
      const assignment = state.assignments.find(a => a.assetId === assetId && !a.returnDate);
      if (assignment) {
        await assignmentService.update(assignment.id, {
          returnDate: new Date(),
        });
      }

      await Promise.all([
        get().loadAssets(),
        get().loadAssignments(),
      ]);
    } catch (error) {
      console.error('Error returning asset:', error);
      set({ error: 'Failed to return asset' });
    } finally {
      set({ loading: false });
    }
  },

  // Maintenance actions
  addMaintenance: async (maintenanceData) => {
    try {
      set({ loading: true, error: null });
      await maintenanceService.create(maintenanceData);
      await get().loadMaintenance();
    } catch (error) {
      console.error('Error adding maintenance record:', error);
      set({ error: 'Failed to add maintenance record' });
    } finally {
      set({ loading: false });
    }
  },
}));