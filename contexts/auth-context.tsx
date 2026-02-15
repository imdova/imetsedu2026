"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { SignupFormValues } from "@/lib/validations/signup.schema";
import { LoginFormValues } from "@/lib/validations/login.schema";

// =======================
// Types
// =======================

interface User {
  id: string;
  name: string;
  email: string;
}

type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// =======================
// Reducer
// =======================

type AuthAction =
  | { type: "SET_LOADING" }
  | { type: "SET_USER"; payload: User }
  | { type: "CLEAR_USER" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_UNAUTHENTICATED" };

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, status: "loading", error: null };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        status: "authenticated",
        error: null,
      };

    case "CLEAR_USER":
      return { ...state, user: null };

    case "SET_UNAUTHENTICATED":
      return { ...state, user: null, status: "unauthenticated" };

    case "SET_ERROR":
      return { ...state, status: "unauthenticated", error: action.payload };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
}

// =======================
// Context
// =======================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =======================
// Provider
// =======================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const router = useRouter();
  const pathname = usePathname();

  // =======================
  // Clear error on route change
  // =======================
  useEffect(() => {
    if (state.error) {
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // =======================
  // Check session on mount
  // =======================
  useEffect(() => {
    const checkSession = async () => {
      dispatch({ type: "SET_LOADING" });

      // TODO: Implement session check
      dispatch({ type: "SET_UNAUTHENTICATED" });
    };

    checkSession();
  }, []);

  // =======================
  // Auth Functions
  // =======================

  const login = useCallback(async (data: LoginFormValues) => {
    console.log("🚀 ~ AuthProvider ~ data:", data)
    dispatch({ type: "SET_LOADING" });

    try {
      // TODO: Implement login logic
      dispatch({
        type: "SET_ERROR",
        payload:
          "Authentication service is not configured. Please implement your authentication provider.",
      });

      throw new Error("Authentication not configured");
    } catch (error) {
      throw error;
    }
  }, []);

  const signup = useCallback(async (data: SignupFormValues) => {
    console.log("🚀 ~ AuthProvider ~ data:", data)
    dispatch({ type: "SET_LOADING" });

    try {
      // TODO: Implement signup logic
      dispatch({
        type: "SET_ERROR",
        payload:
          "Authentication service is not configured. Please implement your authentication provider.",
      });

      throw new Error("Authentication not configured");
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    // TODO: Implement logout logic
    dispatch({ type: "SET_UNAUTHENTICATED" });
    router.push("/auth/sign-in");
  }, [router]);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  // =======================
  // Memoized Context Value
  // =======================

  const value = useMemo(
    () => ({
      user: state.user,
      status: state.status,
      error: state.error,
      login,
      signup,
      logout,
      clearError,
    }),
    [state.user, state.status, state.error, login, signup, logout, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =======================
// Hook
// =======================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// =======================
// Exports
// =======================

export type { User, AuthState, AuthContextType, AuthStatus };
