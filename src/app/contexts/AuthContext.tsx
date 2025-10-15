import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import type {
    ReactNode
} from "react";


import type { User } from "@/app/entities/user";
import { localStorageKeys } from "@/app/config/localStorageKeys";
import { authService } from "@/app/services/auth";


interface AuthContextValue {
    signedIn: boolean;
    user: User | undefined;
    signin: (acessToken: string) => void;
    signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAcessToken = localStorage.getItem(
            localStorageKeys.ACCESS_TOKEN
        );

        return !!storedAcessToken;
    });

    const { isError, isFetching, isSuccess, data } = useQuery({
        queryKey: ["users", "me"],
        queryFn: () => authService.me(),
        enabled: signedIn,
    });

    const signin = useCallback((acessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, acessToken);

        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

        setSignedIn(false);
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error("Sua sessão expirou");
            signout();
        }
    }, [isError, signout]);

    return (
        <AuthContext.Provider
            value={{
                signedIn: isSuccess && signedIn,
                user: data,
                signin,
                signout,
            }}
        >
            {!isFetching && children}
        </AuthContext.Provider>
    );
}