import { ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";


export interface LoginFields {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

export interface AuthGuardProps {
  children: ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}