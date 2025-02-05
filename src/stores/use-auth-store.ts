import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState
{
  token: string | null;
  isPremium: boolean;
  publicKey: string | null;
  setAuth: (token: string, isPremium: boolean, publicKey: string) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isPremium: false,
      publicKey: null,
      setAuth: (token, isPremium, publicKey) =>
      {
        console.log("🔐 Setting auth state:", { token, isPremium, publicKey });
        set({ token, isPremium, publicKey });
      },
      clearAuth: () =>
      {
        console.log("🧹 Clearing auth state");
        set({ token: null, isPremium: false, publicKey: null });
      },
      logout: () =>
      {
        console.log("👋 Logging out");
        set({ token: null, isPremium: false, publicKey: null });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist these fields
      partialize: (state) => ({
        token: state.token,
        isPremium: state.isPremium,
        publicKey: state.publicKey,
      }),
    }
  )
); 