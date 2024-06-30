
interface dbMojangConfig {
  host: string,
  port: number,
  user: {
      name: string,
      password: string
  },
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
};

interface userMojang{
    username: string,
    UUID: string,
    UUID_WR: string
};

export { dbMojangConfig, userMojang };