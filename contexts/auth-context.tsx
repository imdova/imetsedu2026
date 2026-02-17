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
import { API_LOGIN, API_REGISTER } from "@/constants/api/auth";
import { deleteCookie, getCookie, setCookie } from "@/lib/utils/cookieUtils";
import { AuthContextType, AuthState, LoginResponse, User } from "@/types/auth";
import { redirectMap, USER_COOKIE_KEY } from "@/constants/auth";
import { ROUTES } from "@/constants";

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
    if (state.status !== "idle") return;
    const checkSession = async () => {
      dispatch({ type: "SET_LOADING" });
      const user = await getCookie<User>(USER_COOKIE_KEY);
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
      } else {
        dispatch({ type: "SET_UNAUTHENTICATED" });
      }
    };
    checkSession();
  }, [state.status]);

  // =======================
  // Auth Functions
  // =======================

  const login = useCallback(
    async (data: LoginFormValues) => {
      dispatch({ type: "SET_LOADING" });

      try {
        const response = await fetch(API_LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result: LoginResponse = await response.json().catch(() => null);

        // 🔴 If server responded with error status
        if (!response.ok) {
          const errorMessage =
            result?.message || "Something went wrong. Please try again.";

          throw new Error(errorMessage);
        }

        // 🟢 Success validation
        if (!result?.access_token || !result?.user) {
          throw new Error("Invalid server response.");
        }

        const user: User = {
          ...result.user,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        };

        setCookie(USER_COOKIE_KEY, user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
        const url = redirectMap[user.role];
        router.push(url);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unexpected error occurred.",
        });
      }
    },
    [dispatch, router],
  );

  const signup = useCallback(
    async (data: SignupFormValues) => {
      dispatch({ type: "SET_LOADING" });

      try {
        const response = await fetch(API_REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: "user",
          }),
        });

        const result: LoginResponse = await response.json().catch(() => null);

        // 🔴 If server responded with error status
        if (!response.ok) {
          const errorMessage =
            result?.message || "Something went wrong. Please try again.";

          throw new Error(errorMessage);
        }

        // 🟢 Success validation
        if (!result?.access_token || !result?.user) {
          throw new Error("Invalid server response.");
        }

        const user: User = {
          ...result.user,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        };

        setCookie(USER_COOKIE_KEY, user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
        const url = redirectMap[user.role];
        router.push(url);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unexpected error occurred.",
        });
      }
    },
    [dispatch, router],
  );

  const logout = useCallback(async () => {
    dispatch({ type: "SET_UNAUTHENTICATED" });
    await deleteCookie(USER_COOKIE_KEY);
    router.push(ROUTES.HOME);
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
    [state.user, state.status, state.error, login, signup, logout, clearError],
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

export type { AuthState, AuthContextType };
