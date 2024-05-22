import { dbQuery } from "@utils/dbQuery";

/**
 * Return components filtered by param from database
 *
 * @async
 * @param {String}
 * @return {Array<Object>}
 */
const getComponentsByQuery = async (param) => {
  try {
    // Add wildcard to the param
    const paramsWithWildcard = [`%${param}%`];

    // Execting the query in the DB
    const [rows, fields] = await dbQuery(
      `
      SELECT 
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
    components.name LIKE ?
GROUP BY 
    components.component_id;
      `,
      paramsWithWildcard
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
    // If there is an error
    console.log(err);
    return undefined;
  }
};

export { getComponentsByQuery };
