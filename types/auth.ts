import { LoginFormValues } from "@/lib/validations/login.schema";
import { SignupFormValues } from "@/lib/validations/signup.schema";

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  access_token: string;
  refresh_token: string;
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}