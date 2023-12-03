import React, {createContext, useState, useContext, useEffect} from 'react';
import {User} from "../model/user";

interface UserContextData {
    loggedUser: User | null;
    setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
    children: React.ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [loggedUser, setLoggedUser] = useState<User | null>(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });
    /*const [loggedUser, setLoggedUser] = useState<User | null>(null);*/

    const removeUser = () => {
        localStorage.removeItem('user');

    };

    const logout = () => {
        removeUser();
        setLoggedUser(null);
    };

    useEffect(() => {
        if(loggedUser){
            localStorage.setItem('user', JSON.stringify(loggedUser));
        }
    }, [loggedUser]);

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export function useLoggedUser(): UserContextData {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useLoggedUser must be used within an UserProvider');
    }

    return context;
}
