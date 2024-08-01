import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/api";

interface BalanceType {
    id: number;
    balanceType: string;
    balance: number;
}

interface Account {
    id: number;
    balanceAmount: number;
    type: BalanceType[];
}

interface User {
    id: number;
    name: string;
    username: string;
    account: Account;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        const { data } = await API.get("/user/find-one/103");

        setUser(data.user);
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}


export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}