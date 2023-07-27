interface dbConfig {
    host: string,
    port: number,
    user: {
        name: string,
        password: string
    },
    database: {
        name: string,
        table: string,
        columns: {
            username: string,
            password: string
        }
    }
};

interface user {
    username: string,
    password: string
};

export { dbConfig, user };