import { dbQuery } from "@utils/dbQuery";

/**
 * Return all components from the Database
 *
 * @async
 * @return {Array<Object>, undefined}
 */
const getComponents = async () => {
  try {
    // Execting the query in the DB
    const [rows, fields] = await dbQuery(
      `SELECT 
    components.component_id AS id,
    components.name,
    components.description,
    JSON_OBJECT(
        'id', categories.category_id,
        'name', categories.name
    ) AS category,
    components.thumbnail,
    components.tailwind_code AS tailwind,
    components.javascript_code AS javascript,
    components.created_at AS createdAt,
    components.updated_at AS updatedAt,
    components.needs_alpine AS needsAlpine,
    components.needs_cdn AS needsCDN,
    JSON_OBJECT(
        'id', users.user_id,
        'name', users.name,
        'avatar', users.avatar,
        'totalComponents', (
            SELECT COUNT(*) 
            FROM components 
            WHERE components.user_id = users.user_id
        )
    ) AS user,
    IFNULL(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', comments.comment_id,
                'user', JSON_OBJECT(
                    'id', comment_users.user_id,
                    'name', comment_users.name,
                    'avatar', comment_users.avatar
                ),
                'content', comments.content,
                'createdAt', comments.created_at
            )
        ),
        JSON_ARRAY()
    ) AS comments
FROM 
    components
JOIN 
    categories ON components.category_id = categories.category_id
JOIN 
    users ON components.user_id = users.user_id
LEFT JOIN 
    comments ON components.component_id = comments.component_id
LEFT JOIN 
    users AS comment_users ON comments.user_id = comment_users.user_id
GROUP BY 
    components.component_id;`
    );

    // FIX Query return a null fieldset on comments when component doesnt have any comment
    // So if the first comment got a id with null value we reassing the value of comments to a blank array
    const components = rows;

    components.forEach((component) => {
      if (component.comments[0].id == null) {
        component.comments = [];
      }
    });

    // Return all components
    return components;
  } catch (err) {
    // If there is an error return undefined
    console.log(err);
    return undefined;
  }
};

/**
 * Return a component from it ID
 *
 * @async
 * @param id {Number}
 * @returns {Object, undefined}
 */
const getComponent = async (id) => {
  try {
    // Execting the query in the DB with id param
    const [rows, fields] = await dbQuery(
      `SELECT 
    components.component_id AS id,
    components.name,
    components.description,
    JSON_OBJECT(
        'id', categories.category_id,
        'name', categories.name
    ) AS category,
    components.thumbnail,
    components.tailwind_code AS tailwind,
    components.javascript_code AS javascript,
    components.created_at AS createdAt,
    components.updated_at AS updatedAt,
    components.needs_alpine AS needsAlpine,
    components.needs_cdn AS needsCDN,
    JSON_OBJECT(
        'id', users.user_id,
        'name', users.name,
        'avatar', users.avatar,
        'totalComponents', (
            SELECT COUNT(*) 
            FROM components 
            WHERE components.user_id = users.user_id
        )
    ) AS user,
    IFNULL(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', comments.comment_id,
                'user', JSON_OBJECT(
                    'id', comment_users.user_id,
                    'name', comment_users.name,
                    'avatar', comment_users.avatar
                ),
                'content', comments.content,
                'createdAt', comments.created_at
            )
        ),
        JSON_ARRAY()
    ) AS comments
FROM 
    components
JOIN 
    categories ON components.category_id = categories.category_id
JOIN 
    users ON components.user_id = users.user_id
LEFT JOIN 
    comments ON components.component_id = comments.component_id
LEFT JOIN 
    users AS comment_users ON comments.user_id = comment_users.user_id
WHERE 
    components.component_id = ?
GROUP BY 
    components.component_id;`,
      [id]
    );

    // FIX Query return a null fieldset on comments when component doesnt have any comment
    // So if the first comment got a id with null value we reassing the value of comments to a blank array

    // In this case we get the first position only becuse we dont want an array for only 1 or 0 results
    const component = rows[0];

    if (component.comments[0].id == null) {
      component.comments = [];
    }

    // Ordering the components comments to see last comments first
    component.comments.sort((a, b) => b.createdAt - a.createdAt);

    // Return all components
    return component;
  } catch (err) {
    // If there is an error return undefined
    console.log(err);
    return undefined;
  }
};

/**
 * Return the best 15 componentes (Components with most comments)
 *
 * @async
 * @return {Object, undefined}
 */
const getBestComponent = async () => {
  try {
    // Execting the query in the DB
    const [rows, fields] = await dbQuery(
      `SELECT 
      components.component_id AS id,
      components.name,
      components.description,
      JSON_OBJECT(
          'id', categories.category_id,
          'name', categories.name
      ) AS category,
      components.thumbnail,
      components.tailwind_code AS tailwind,
      components.javascript_code AS javascript,
      components.created_at AS createdAt,
      components.updated_at AS updatedAt,
      components.needs_alpine AS needsAlpine,
      components.needs_cdn AS needsCDN,
      JSON_OBJECT(
          'id', users.user_id,
          'name', users.name,
          'avatar', users.avatar,
          'totalComponents', (
              SELECT COUNT(*) 
              FROM components 
              WHERE components.user_id = users.user_id
          )
      ) AS user,
      IFNULL(
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  'id', comments.comment_id,
                  'user', JSON_OBJECT(
                      'id', comment_users.user_id,
                      'name', comment_users.name,
                      'avatar', comment_users.avatar
                  ),
                  'content', comments.content,
                  'createdAt', comments.created_at
              )
          ),
          JSON_ARRAY()
      ) AS comments
  FROM 
      components
  JOIN 
      categories ON components.category_id = categories.category_id
  JOIN 
      users ON components.user_id = users.user_id
  LEFT JOIN 
      comments ON components.component_id = comments.component_id
  LEFT JOIN 
      users AS comment_users ON comments.user_id = comment_users.user_id
  GROUP BY 
      components.component_id
  ORDER BY 
      COUNT(comments.comment_id) DESC, components.created_at DESC
  LIMIT 20;  
`
    );

    // FIX Query return a null fieldset on comments when component doesnt have any comment
    // So if the first comment got a id with null value we reassing the value of comments to a blank array
    const components = rows;

    components.forEach((component) => {
      if (component.comments[0].id == null) {
        component.comments = [];
      }
    });

    // Return best components
    return components;
  } catch (err) {
    // If there is an error return undefined
    console.log(err);
    return undefined;
  }
};

/**
 * Return the last 15 components from the database
 *
 * @async
 * @return {object, undefined}
 */

const getLatest = async () => {
  try {
    // Execting the query in the DB
    const [rows, fields] = await dbQuery(
      `SELECT 
    components.component_id AS id,
    components.name,
    components.description,
    JSON_OBJECT(
        'id', categories.category_id,
        'name', categories.name
    ) AS category,
    components.thumbnail,
    components.tailwind_code AS tailwind,
    components.javascript_code AS javascript,
    components.created_at AS createdAt,
    components.updated_at AS updatedAt,
    components.needs_alpine AS needsAlpine,
    components.needs_cdn AS needsCDN,
    JSON_OBJECT(
        'id', users.user_id,
        'name', users.name,
        'avatar', users.avatar,
        'totalComponents', (
            SELECT COUNT(*) 
            FROM components 
            WHERE components.user_id = users.user_id
        )
    ) AS user,
    IFNULL(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', comments.comment_id,
                'user', JSON_OBJECT(
                    'id', comment_users.user_id,
                    'name', comment_users.name,
                    'avatar', comment_users.avatar
                ),
                'content', comments.content,
                'createdAt', comments.created_at
            )
        ),
        JSON_ARRAY()
    ) AS comments
FROM 
    components
JOIN 
    categories ON components.category_id = categories.category_id
JOIN 
    users ON components.user_id = users.user_id
LEFT JOIN 
    comments ON components.component_id = comments.component_id
LEFT JOIN 
    users AS comment_users ON comments.user_id = comment_users.user_id
GROUP BY 
    components.component_id
ORDER BY 
   components.created_at DESC
LIMIT 15;
`
    );

    // FIX Query return a null fieldset on comments when component doesnt have any comment
    // So if the first comment got a id with null value we reassing the value of comments to a blank array
    const components = rows;

    components.forEach((component) => {
      if (component.comments[0].id == null) {
        component.comments = [];
      }
    });

    // Return latest components
    return components;
  } catch (err) {
    // If there is an error return undefined
    console.log(err);
    return undefined;
  }
};

/**
 * Funcion to add components to the database, its verifierd on API
 *
 * @async
 * @param {Array} componentData
 * @return {object}
 */
const addComponent = async (componentData) => {
  // Make the INSERT SQL query inserting via prepared statmen array
  try {
    const [rows, fields] = await dbQuery(
      `
    INSERT INTO
    components (
        category_id,
        user_id,
        name,
        description,
        thumbnail,
        needs_alpine,
        needs_cdn,
        tailwind_code,
        javascript_code,
        created_at,
        updated_at
    )
VALUES
    (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );`,
      componentData
    );

    // If data was inserted return component inserted ID
    return { inserted: rows["insertId"] };
  } catch (err) {
    // If there was an error return a negative insertion ID
    console.log(err);
    return { inserted: -1 };
  }
};

/**
 * Function to update components from the database, its verifierd on API
 *
 * @async
 * @param {Array} componentData
 * @return {boolean}
 */
const updateComponent = async (componentData) => {
  // Make the INSERT SQL query inserting via prepared statmen array
  try {
    const [rows, fields] = await dbQuery(
      `
      UPDATE components SET
    category_id = ?,
    name = ?,
    description = ?,
    thumbnail = ?,
    needs_alpine = ?,
    needs_cdn = ?,
    tailwind_code = ?,
    javascript_code = ?,
    updated_at = UNIX_TIMESTAMP ()
WHERE
    component_id = ?`,
      componentData
    );

    // If the component was updated return true
    return true;
  } catch (err) {
    // If there was an error return false
    console.log(err);
    return false;
  }
};
/**
 * Function to get the author of a component via a ID
 *
 * @async
 * @param {number} commentId
 * @return {number}
 */
const getComponentAuthor = async (componentId) => {
  try {
    // Query to DB
    const [userDataRows, userDataFields] = await dbQuery(
      `
      SELECT user_id
      FROM components
      WHERE component_id = ?;
      `,
      [componentId]
    );

    // If there is any result return -1 else the author id
    if (userDataRows.length == 0) {
      return -1;
    } else {
      return userDataRows[0].user_id;
    }
  } catch (error) {
    console.log(error);
    // Special return if server is down
    return -404;
  }
};

/**
 * Function to delete a component from the DB
 *
 * @async
 * @param {number}
 * @returns {boolean}
 */
const deleteComponent = async (componentId) => {
  try {
    // Query to DB
    const [userDataRows, userDataFields] = await dbQuery(
      `
      DELETE FROM components WHERE component_id = ?;
      `,
      [componentId]
    );

    // If there is any affected rows return true else return false
    return true;
  } catch (error) {
    console.log(error);
    // Special return if server is down
    return false;
  }
};

export {
  getComponents,
  getComponent,
  getLatest,
  getBestComponent,
  getComponentAuthor,
  addComponent,
  updateComponent,
  deleteComponent,
};
