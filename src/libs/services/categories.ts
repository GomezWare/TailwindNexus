// TODO Document this service when its finally complete
import categories from "@data/categories.json";

import { dbConnector } from "@utils/connection";
import mysql2, { type RowDataPacket } from "mysql2";

// Connect to the database
const getMenu = async () => {
  return new Promise((resolve, reject) => {
    // Get connection data from dbConnector function
    const connection = dbConnector();

    // Start connection to database
    connection.connect();

    // Send the Query to database
    connection.query(
      "SELECT c.category_id, c.name, c.description, COUNT(co.component_id) AS num_components FROM categories c LEFT JOIN components co ON c.category_id = co.category_id GROUP BY c.category_id",
      (err, results: RowDataPacket[], fields) => {
        if (err) {
          // If there is a error stop the connection
          connection.end();

          // And Reject the promise, and return undefined
          reject();
          return;
        }

        // Map the DB Result in a a Object
        const categories = results.map((row) => {
          return {
            id: row.category_id,
            name: row.name,
            description: row.description,
            numComponents: row.num_components,
          };
        });

        // Close connection to db
        connection.end();

        // Resolve the promise and return the categories Object
        resolve(categories);
      }
    );
  });
};

const getCategories = () => {
  return categories;
};

const getCategory = (id) => {
  const category = categories.find((category) => category.id == id);
  return category;
};

export { getMenu, getCategories, getCategory };
