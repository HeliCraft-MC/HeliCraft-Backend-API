import { dbConfig } from "../../database/database.types";

interface dbMojangConfig extends dbConfig {
  database: {
    name: string;
    table: string;
    columns: {
      username: string;
      password: string;
      UUID: string;
      UUID_WR: string;
    };
  };
}

interface userMojang{
    username: string,
    UUID: string,
    UUID_WR: string
};

export { dbMojangConfig, userMojang };