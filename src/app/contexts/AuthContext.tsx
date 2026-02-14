import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ReactNode } from "react";
import type { User } from "@/app/entities/user";
import { localStorageKeys } from "@/app/config/localStorageKeys";
import { authService } from "@/app/services/auth";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  isLoading: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  });

  const signedIn = !!accessToken;

  const {
    data: user,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["users", "me"],
    queryFn: authService.me,
    enabled: signedIn, 
    retry: false,
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
    setAccessToken(token);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou");
      signout();
    }
  }, [isError, signout]);


  const value = useMemo(
    () => ({
      signedIn,
      user,
      isLoading: isFetching,
      signin,
      signout,
    }),
    [signedIn, user, isFetching, signin, signout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
