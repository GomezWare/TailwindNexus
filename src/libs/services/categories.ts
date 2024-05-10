// TODO Document this service when its finally complete
import { dbQuery } from "@utils/dbQuery";

const getMenu = async () => {
  // Query for get Menu JSON from MySQL using dbQuery util
  try {
    const [rows, fields] = await dbQuery(
      `
      SELECT 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', c.category_id,
            'name', c.name,
            'description', c.description,
            'numComponents', IFNULL(num_components, 0)
        )
    ) AS categories
FROM 
    categories c
LEFT JOIN 
    (
        SELECT 
            category_id,
            COUNT(component_id) AS num_components
        FROM 
            components
        GROUP BY 
            category_id
    ) comp_counts ON c.category_id = comp_counts.category_id;
  `
    );
    /* 
    FIX
    The Database returns a JSON Object with the category data necesary for the menu,
    its returning a aditional array and a object as categories.

    Accesing these properties we can get the data we need.
     */
    const categories = rows[0]["categories"];
    // Data is sended to the API
    return categories;
  } catch (err) {
    // If there is
    console.log(err);
    return undefined;
  }
};

const getCategories = async () => {
  // Query for get Menu JSON from MySQL
  try {
    const [rows, fields] = await dbQuery(`
    SELECT 
    c.category_id AS id,
    c.name AS name,
    c.description AS description,
    c.created_at AS createdAt,
    c.updated_at AS updatedAt,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', comp.component_id,
            'name', comp.name,
            'description', comp.description,
            'createdAt', comp.created_at,
            'updatedAt', comp.updated_at,
            'thumbnail', comp.thumbnail,
            'needsAlpine', comp.needs_alpine,
            'needsCDN', comp.needs_cdn,
            'user', JSON_OBJECT(
                'id', u.user_id,
                'name', u.name,
                'avatar', u.avatar
            ),
            'totalComments', (
                SELECT COUNT(*) FROM comments WHERE component_id = comp.component_id
            )
        )
    ) AS components
  FROM 
    categories c
  LEFT JOIN 
    components comp ON c.category_id = comp.category_id
  LEFT JOIN 
    users u ON comp.user_id = u.user_id
  GROUP BY 
    c.category_id, c.name, c.description, c.created_at, c.updated_at;
    `);

    return rows[0];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/**
 * Function to get a category data from ID param
 *
 * @param {Number} id
 * @return {Object}
 */
const getCategory = async (id) => {
  try {
    // Query for get Menu JSON from MySQL using dbQuery util

    // The values are sended in the function
    const [rows, fields] = await dbQuery(
      `
    SELECT 
    c.category_id AS id,
    c.name AS name,
    c.description AS description,
    c.created_at AS createdAt,
    c.updated_at AS updatedAt,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', comp.component_id,
            'name', comp.name,
            'description', comp.description,
            'createdAt', comp.created_at,
            'updatedAt', comp.updated_at,
            'thumbnail', comp.thumbnail,
            'needsAlpine', comp.needs_alpine,
            'needsCDN', comp.needs_cdn,
            'user', JSON_OBJECT(
                'id', u.user_id,
                'name', u.name,
                'avatar', u.avatar
            ),
            'totalComments', (
                SELECT COUNT(*) FROM comments WHERE component_id = comp.component_id
            )
        )
    ) AS components
FROM 
    categories c
LEFT JOIN 
    components comp ON c.category_id = comp.category_id
LEFT JOIN 
    users u ON comp.user_id = u.user_id
WHERE 
    c.category_id = ?
GROUP BY 
    c.category_id, c.name, c.description, c.created_at, c.updated_at;
    `,
      [id]
    );

    /* Data is sended to the API, since this query can return more than 1 category if 
    we pass an array we need to get only the first row*/
    const category = rows[0];

   

    return category;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { getMenu, getCategories, getCategory };
