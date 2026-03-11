import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../services/api";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Persist user in sessionStorage so a page refresh doesn't log them out
  const [user, setUserState] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("todo_user");
    return stored ? JSON.parse(stored) : null;
  });

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) sessionStorage.setItem("todo_user", JSON.stringify(u));
    else sessionStorage.removeItem("todo_user");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
