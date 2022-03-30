import { createContext, useState, useEffect } from "react";
import services from '../services/auth';
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

export const AuthProviderContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);

            setToken(`Bearer ${loggedUser.token}`);
            setUser(loggedUser);

            if(jwtDecode(loggedUser.token).exp < Date.now() / 1000) {
                logout();
                window.location.reload();
            };

            setTimeout(() => {
                logout();
                window.location.reload();
            }, (jwtDecode(loggedUser.token).exp - Date.now() / 1000) * 1000);
        };
    }, []);

    const isLoggedUser = () => {
            return window.localStorage.getItem('user') !== null;
    }

    const profile = async (token) => {
        try {
            const user = await services.profile(token);

            return user;
        } catch (error) {
            throw error;;
        }
    };

    const signup = async (credentials) => {
        try {
            const user = await services.signup(credentials);
            
            return user;
        } catch (error) {
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const user = await services.login(credentials);

            window.localStorage.setItem(
                'user', 
                JSON.stringify(user)
            );

            setTimeout(() => {
                logout();
                window.location.reload();
            }, (jwtDecode(user.token).exp - Date.now() / 1000) * 1000);

            setToken(`Bearer ${user.token}`);
            setUser(user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ signup, login, logout, user, token, isLoggedUser, profile }}>
            {children}
        </AuthContext.Provider>
    )
}