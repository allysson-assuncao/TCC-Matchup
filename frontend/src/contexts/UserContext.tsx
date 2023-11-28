import React, {createContext, useState, useContext, useEffect} from 'react';
import {User} from "../model/user";
import {ROUTE_SIGN_IN} from "../App";
import {useNavigate} from "react-router-dom";

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
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    /*const history = useNavigate();*/

    const removeUser = () => {
        localStorage.removeItem('user');
    };

    const logout = () => {
        removeUser();
        /*history(ROUTE_SIGN_IN);*/
    };

    useEffect(() => {
        if(loggedUser){
            localStorage.setItem('user', JSON.stringify(loggedUser));
        } /*else {
            history(ROUTE_SIGN_IN);
        }*/
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
