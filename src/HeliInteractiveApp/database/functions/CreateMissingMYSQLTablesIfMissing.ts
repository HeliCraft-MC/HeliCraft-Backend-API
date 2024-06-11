import connection from './mysqlConnect';


export default async function CreateMissingMYSQLTablesIfMissing() {
    const queries = [
        `CREATE TABLE IF NOT EXISTS VOTES (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            votedUsers VARCHAR(255) NOT NULL,
            votedFor INT NOT NULL,
            votedAgainst INT NOT NULL,
            totalVotes INT NOT NULL,
            PRIMARY KEY (id) 
        )`,
        `CREATE TABLE IF NOT EXISTS BANKS (
            id INT NOT NULL AUTO_INCREMENT,
            usernameID INT NOT NULL,
            PRIMARY KEY (id) 
        )`,
        `CREATE TABLE IF NOT EXISTS ACCOUNTS (
            id INT NOT NULL AUTO_INCREMENT,
            bankID INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            balance VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            rate VARCHAR(255) NOT NULL,
            PRIMARY KEY (id) 
        )`,
        `CREATE TABLE IF NOT EXISTS TRANSACTIONS (
            id INT NOT NULL AUTO_INCREMENT,
            accountIDFrom INT NOT NULL,
            accountIDTo INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            amount INT NOT NULL,
            type VARCHAR(255) NOT NULL,
            tax INT NOT NULL,
            date VARCHAR(255) NOT NULL,
            PRIMARY KEY (id) 
        )`,
        `CREATE TABLE IF NOT EXISTS USERS (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )`
    ];
    try {
        await Promise.all(queries.map(query => connection.execute(query)));
        console.log(`Created all tables`);
    } catch (err) {
        console.error('Error creating tables:', err);
        throw err;
    }
}

