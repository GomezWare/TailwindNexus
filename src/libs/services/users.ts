import { dbQuery } from "@utils/dbQuery";

/**
 * Return all information of a user
 *
 * @async
 * @param {Number} id
 * @return {object}
 */
const getUser = async (id: Number) => {
  try {
    /*
     * To get user data i decided to make firtst the queries and later build the object
     */

    // Query to get basic data from the user
    const [userDataRows, userDataFields] = await dbQuery(
      `
      SELECT 
          user_id AS id,
          name,
          avatar,
          email
      FROM 
          users
      WHERE
          user_id = ?;
      `,
      [id]
    );

    // Query to get user components
    const [componentsRows, componentsFields] = await dbQuery(
      `
      SELECT 
          c.component_id AS id,
          c.name,
          c.thumbnail,
          c.description,
          c.created_at AS createdAt,
          c.needs_alpine AS needsAlpine,
          c.needs_cdn AS needsCDN,
          COUNT(com.comment_id) AS totalComments
      FROM 
          components c
      LEFT JOIN
          comments com ON c.component_id = com.component_id
      WHERE
          c.user_id = ?
      GROUP BY
          c.component_id
      ORDER BY
      c.updated_at DESC;
      `,
      [id]
    );

    // Query to get user comments
    const [commentsRows, commentsFields] = await dbQuery(
      `
      SELECT 
      c.comment_id AS id,
      c.content,
      c.created_at AS createdAt,
      c.user_id AS userId,
      comp.component_id AS componentId,
      comp.name AS componentName
  FROM 
      comments c
  JOIN
      components comp ON c.component_id = comp.component_id
  WHERE
      c.user_id = ?
  ORDER BY
      c.created_at DESC;
      `,
      [id]
    );

    // Build the object with all the queried data
    const user = {
      id: userDataRows[0].id,
      name: userDataRows[0].name,
      avatar: userDataRows[0].avatar,
      email: userDataRows[0].email,
      components: componentsRows.map((component) => ({
        id: component.id,
        name: component.name,
        thumbnail: component.thumbnail,
        description: component.description,
        createdAt: component.createdAt,
        needsAlpine: component.needsAlpine,
        needsCDN: component.needsCDN,
        totalComments: component.totalComments || 0, // If totalComments is null, default to 0
      })),
      comments: commentsRows || [],
    };

    // Return user Object
    return user;
  } catch (error) {
    // If there is an error return undefined
    return undefined;
  }
};

/**
 * Return users with more components
 */
const getTopDevelopers = async () => {
  try {

    // Executing the query in the database
    const [userDataRows, userDataFields] = await dbQuery(
      `
      SELECT
      u.user_id AS id,
      u.name,
      u.avatar,
      COUNT(c.component_id) AS totalComponents
  FROM
      users u
  LEFT JOIN
      components c ON u.user_id = c.user_id
  GROUP BY
      u.user_id, u.name, u.avatar
  ORDER BY
      totalComponents DESC
  LIMIT 10;
      `
    );

    // Return users array with object
    return userDataRows;
  } catch (error) {
    // If there is a error return undefined
    console.log(error);
    return undefined;
  }
};

export { getUser, getTopDevelopers };
