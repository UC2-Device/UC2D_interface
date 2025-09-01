import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "./authenticationFunction";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            try {
                const data = await AuthService.checkAuth();
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        check();
    }, []);

    const login = async (username, password) => {
        
        const res = await AuthService.login(username, password);
        if (res?.token) {
            setUser(res.user);
            localStorage.setItem("token", res.token);
            window.location.href = "/"
            navigate("/", { replace: true });   // ✅ redirect here
        }
        return res;
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
