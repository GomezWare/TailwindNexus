import mysql2 from "mysql2";
import dotenv from "dotenv";
import type { Connection } from "node_modules/mysql2/typings/mysql/lib/Connection";

// Get eviroment variables
dotenv.config();

/**
 * This functions read the dotEnv variables and return an object to starts connections to the DB
 *
 * @return {Connection}
 */
const dbConnector = () => {
  return mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
};

export { dbConnector };
