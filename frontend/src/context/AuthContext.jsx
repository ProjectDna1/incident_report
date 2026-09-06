import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

 useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    "/api/auth/check",
                    { withCredentials: true }
                );

                setAuth(res.data);
            } catch (error) {
                console.log("Auth check failed:", error);
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
