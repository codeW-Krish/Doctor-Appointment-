import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { AuthState, LoginCredentials, SignupCredentials, User } from '../types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          // Mock API call - replace with actual API integration
          const token = 'mock.jwt.token';
          const user: User = {
            id: '1',
            email: credentials.email,
            name: 'John Doe',
            createdAt: new Date().toISOString(),
          };

          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      signup: async (credentials) => {
        try {
          // Mock API call - replace with actual API integration
          const token = 'mock.jwt.token';
          const user: User = {
            id: '1',
            email: credentials.email,
            name: credentials.name,
            createdAt: new Date().toISOString(),
          };

          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw new Error('Signup failed');
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);