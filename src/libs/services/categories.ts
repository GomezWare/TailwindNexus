// TODO Document this service when its finally complete
import categories from "@data/categories.json";
import { dbQuery } from "@utils/dbQuery";

import type { RowDataPacket } from "mysql2";


const getMenu = async () => {
  /**
   * Get's the menu data
   *
   * @return {Object}
   */

  try {
    const [rows, fields] = await dbQuery(
      `SELECT c.category_id, c.name, c.description, COUNT(co.component_id) AS num_components FROM categories c LEFT JOIN components co ON c.category_id = co.category_id GROUP BY c.category_id`
    );

    // Map the DB Result in a a Object
    const categories = rows.map((row) => {
      return {
        id: row.category_id,
        name: row.name,
        description: row.description,
        numComponents: row.num_components,
      };
    });    

    return categories;
    
  } catch (err) {
    
    console.log(err); 
  }
};

const getCategories = () => {
  return categories;
};

const getCategory = (id) => {
  const category = categories.find((category) => category.id == id);
  return category;
};

export { getMenu, getCategories, getCategory };
