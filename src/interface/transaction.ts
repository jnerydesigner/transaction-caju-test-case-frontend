interface Account {
    createdAt: string;
    updatedAt: string;
    id: number;
    amount: number;
}

interface User {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    userName: string;
}

interface Establishment {
    createdAt: string;
    updatedAt: string;
    id: number;
    merchant: string;
    mcc: string;
}

export interface TransactionType {
    id: number;
    mcc: string;
    createdAt: string;
    updatedAt: string;
    totalAmount: number;
    typeBalance: string;
    account: Account;
    user: User;
    establishment: Establishment;
}

const transaction: TransactionType = {
    createdAt: "2024-08-01T15:42:21.341748",
    updatedAt: "2024-08-01T15:42:21.341809",
    id: 1,
    mcc: "5411",
    totalAmount: 305.00,
    typeBalance: "FOOD",
    account: {
        createdAt: "2024-07-29T09:52:40.741636",
        updatedAt: "2024-08-01T15:42:21.354601",
        id: 653,
        amount: 305.00
    },
    user: {
        createdAt: "2024-07-29T09:52:33.247751",
        updatedAt: "2024-07-29T09:52:33.247776",
        id: 103,
        name: "Jander da Costa Nery",
        userName: "jandernery@gmail.com"
    },
    establishment: {
        createdAt: "2024-08-01T10:16:23.992087",
        updatedAt: "2024-08-01T10:16:23.992119",
        id: 55,
        merchant: "ATACADÃO SUPERMERCADO",
        mcc: "5411"
    }
};