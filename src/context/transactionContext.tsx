import { createContext, useContext, useEffect, useState } from 'react'
import { API } from "../api/api";
import { TransactionType } from '../interface/transaction';



interface TransactionContextType {
    transaction: TransactionType[] | null;
    setTransaction: React.Dispatch<React.SetStateAction<any>>;
}

const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType);


export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transaction, setTransaction] = useState<TransactionType[] | null>([]);

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        const { data } = await API.get("/transaction/paginate");

        setTransaction(data);

        console.log(data);
    }

    return (
        <TransactionContext.Provider value={{ transaction, setTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}

export const useTransaction = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransaction must be used within a TransactionProvider');
    }
    return context;
}