import database from "../database.config";
import mysql from 'mysql2';

const connectionUri = `mysql://${database.user.name}:${database.user.password}@${database.host}:${database.port}/${database.databaseName}`;
console.log(`Connecting to MySQL on ${connectionUri}`);
const connection = mysql.createConnection(connectionUri);
console.log("Connected!");

// Create tables if they do not exist
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS ${database.tablePassport} (
    passportId VARCHAR(255) PRIMARY KEY,
    nickname VARCHAR(255),
    passportIssuedBy VARCHAR(255),
    stateOfIssue VARCHAR(255),
    issuedOn DATE,
    arrestedIn JSON,
    inPrison JSON
  );

  CREATE TABLE IF NOT EXISTS ${database.tableStates} (
    stateId VARCHAR(255) PRIMARY KEY,
    stateName VARCHAR(255),
    stateRuler VARCHAR(255),
    stateMembers JSON,
    statePolicemans JSON,
    diplomaticStatus JSON
  );
`;

connection.query(createTablesQuery, (error) => {
  if (error) {
    console.error('Error creating tables:', error);
  } else {
    console.log('Tables created successfully');
  }
});

export default connection;