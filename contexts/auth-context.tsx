"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { SignupFormValues } from "@/lib/validations/signup.schema";
import { LoginFormValues } from "@/lib/validations/login.schema";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      // TODO: Implement session check with your authentication provider
      setState((prev) => ({ ...prev, user: null, loading: false }));
    };

    checkSession();
  }, []);

  const login = useCallback(
    async (data: LoginFormValues) => {
      console.log("🚀 ~ AuthProvider ~ data:", data)
      // TODO: Implement login with your authentication provider
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          "Authentication service is not configured. Please implement your authentication provider.",
      }));
      throw new Error("Authentication not configured");
    },
    [],
  );

  const signup = useCallback(
    async (data: SignupFormValues) => {
      console.log("🚀 ~ AuthProvider ~ data:", data)
      // TODO: Implement signup with your authentication provider
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          "Authentication service is not configured. Please implement your authentication provider.",
      }));
      throw new Error("Authentication not configured");
    },
    [],
  );

  const logout = useCallback(async () => {
    // TODO: Implement logout with your authentication provider
    setState((prev) => ({ ...prev, user: null, loading: false }));
    router.push("/auth/sign-in");
  }, [router]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export types for use in other components
export type { User, AuthState, AuthContextType };
