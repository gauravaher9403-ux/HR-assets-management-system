import type { User } from '../types';

export const authService = {
  // Sign in with username and password
  async signIn(username: string, password: string): Promise<User> {
    try {
      // Check hardcoded demo users
      const demoUsers = {
        admin: { username: 'admin', email: 'admin@erp.com', password: 'password', role: 'admin' as const },
        hr: { username: 'hr', email: 'hr@erp.com', password: 'password', role: 'hr' as const },
        rajesh: { username: 'rajesh', email: 'rajesh@erp.com', password: 'password', role: 'employee' as const, employeeId: 'EMP001' },
      };

      const user = demoUsers[username as keyof typeof demoUsers];
      if (user && user.password === password) {
        return {
          id: username,
          ...user,
        };
      }

      // Check localStorage for created users
      const storedUsers = JSON.parse(localStorage.getItem('erpUsers') || '{}');
      const storedUser = storedUsers[username];
      if (storedUser && storedUser.password === password) {
        return {
          id: username,
          ...storedUser,
        };
      }

      throw new Error('Invalid username or password');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign up new user
  async signUp(username: string, password: string, userData: Omit<User, 'id' | 'username' | 'password'>): Promise<User> {
    try {
      const userDoc = {
        ...userData,
        username,
        password,
      };

      // Store in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('erpUsers') || '{}');
      storedUsers[username] = userDoc;
      localStorage.setItem('erpUsers', JSON.stringify(storedUsers));

      return {
        id: username,
        ...userDoc
      };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Sign out (no-op for local)
  async signOut(): Promise<void> {
    // No-op
  },

  // Get current user (no-op)
  getCurrentUser(): null {
    return null;
  },

  // Listen to auth state changes (no-op)
  onAuthStateChange(_callback: (user: any) => void) {
    // No-op
  },

  // Get user data (no-op)
  async getUserData(_uid: string): Promise<User | null> {
    // No-op
    return null;
  }
};