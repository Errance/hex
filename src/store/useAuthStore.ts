// src/store/useAuthStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  email?: string;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: undefined,
      login: (email: string) =>
        set({
          isAuthenticated: true,
          email,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          email: undefined,
        }),
    }),
    {
      name: "hex-oracle-auth",
    }
  )
);

