import { dbQuery } from "@utils/dbQuery";

/**
 * Add comments to the database
 * +@async
 * @param {Array<any>} comment data
 * @return {Array<Boolean>}
 */

const addComment = async (comment) => {
  try {
    // Executing the query in the DB
    const [rows, fields] = await dbQuery(
      `INSERT INTO
    comments (
        user_id,
        component_id,
        content,
        created_at,
        updated_at
    )
VALUES
    (
        ?,
        ?,
        ?,
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );`,
      comment
    );

    // Return result
    return { inserted: true };
  } catch (err) {
    // If there is an error
    console.log(err);
    return { inserted: false };
  }
};
/**
 * Function to delete a comment from the DB
 *
 * @async
 * @param {number}
 * @returns {boolean}
 */
const deleteComment = async (commentId) => {
  try {
    // Query to DB
    const [userDataRows, userDataFields] = await dbQuery(
      `
      DELETE FROM comments WHERE comment_id = ?;
      `,
      [commentId]
    );

    // If there is any affected rowss return true else return false
    return true;
  } catch (error) {
    console.log(error);
    // Special return if server is down
    return false;
  }
};

/**
 * Function to get the author of a comment via a ID
 *
 * @async
 * @param {number} commentId
 * @return {number}
 */
const getCommentAuthor = async (commentId) => {
  try {
    // Query to DB
    const [userDataRows, userDataFields] = await dbQuery(
      `
      SELECT user_id
      FROM comments
      WHERE comment_id = ?;
      `,
      [commentId]
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

export { addComment, getCommentAuthor, deleteComment };
