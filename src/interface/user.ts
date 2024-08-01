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

export interface UserType {
    id: number;
    name: string;
    username: string;
    account: Account;
}

export const userRes: UserType = {
    id: 1,
    name: "John Doe",
    username: "john.doe",
    account: {
        id: 1,
        balanceAmount: 100.0,
        type: [
            {
                id: 1,
                balanceType: "CASH",
                balance: 100.0
            },
            {
                id: 2,
                balanceType: "FOOD",
                balance: 0.0
            },
            {
                id: 3,
                balanceType: "MEAL",
                balance: 0.0
            }
        ]
    }
};