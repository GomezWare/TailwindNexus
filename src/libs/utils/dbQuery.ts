import mysql from "mysql2/promise";
import type { FieldPacket, RowDataPacket } from "mysql2";

/**
 * This function reads the dotenv variables using astro.meta and returns an object to start connections to the DB
 *
 * @param {string} sql - SQL query
 * @param {any[]} values - Optional array of values for prepared statements
 * @return {Promise<[RowDataPacket[], FieldPacket[]]>} - Promise resolving to a tuple containing rows and fields
 */
const dbQuery = async (
  sql: string,
  values: any[] = []
): Promise<[RowDataPacket[], FieldPacket[]]> => {
  // Establishing a database connection
  const dbConnection = await mysql.createConnection({
    host: import.meta.env.DB_HOST, // Database host obtained from eviroment variables (Using Astro meta import)
    user: import.meta.env.DB_USER, // Database user obtained from eviroment variables (Using Astro meta import)
    password: import.meta.env.DB_PASSWORD, // Database password obtained from eviroment variables (Using Astro meta import)
    database: import.meta.env.DB_DATABASE, // Database name obtained from eviroment variables (Using Astro meta import)
  });

  // Executing the SQL query
  const [rows, fields] = (await dbConnection.execute(sql, values)) as [
    RowDataPacket[],
    FieldPacket[]
  ];

  // Closing the database connection
  await dbConnection.end();

  // Returning the result of the query
  return [rows, fields];
};

// Exporting the function for external use
export { dbQuery };
