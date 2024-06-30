interface dbConfig {
    host: string,
    port: number,
    user: {
        name: string,
        password: string
    },
    database: {
        name: string,
        tables: {
            players: {
                name: string,
                columns: {
                    username: string,
                    password: string
                }
            },
            skins: {
                name: string,
                columns: {
                    username: string,
                    hash: string,
                    last_updated: string
                }
            }
        }
    }
};

interface user {
    username: string,
    password: string
};

export { dbConfig, user };