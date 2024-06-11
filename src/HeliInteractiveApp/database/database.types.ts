interface dbConfigHCIAPP {
    host: string,
    port: number,
    user: {
        name: string,
        password: string
    },
    database: string
};

interface vote {
    id: string,
    name: string,
    description: string,
    votedUsers: string[],
    votedFor: number,
    votedAgainst: number,
    totalVotes: number
};

interface bank {
    id: string,
    usernameID: string,
};

interface account {
    id: string,
    bankID: string,
    name: string,
    balance: string,
    type: "DEBIT" | "CREDIT",
    rate: string
}

interface transaction {
    id: string,
    accountIDFrom: string,
    accountIDTo: string,
    name: string,
    amount: number,
    type: "TRANSFER" | "PAYMENT" | "DEPOSIT" | "WITHDRAWAL",
    tax: number,
    date: string
}

interface user {
    id: string,
    username: string,
    bankID: string,
}

// to be completed



export { dbConfigHCIAPP, vote, bank, account, transaction, user };