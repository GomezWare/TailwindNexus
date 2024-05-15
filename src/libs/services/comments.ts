// TODO Document this service when its finally complete
import { dbQuery } from "@utils/dbQuery";

/**
 * Add comments to the database
 * @param {Array<any>}
 * @return {Array<Object>}
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

    // Retuern result
    return { inserted: true };
  } catch (err) {
    // If there is an error
    console.log(err);
    return { inserted: false };
  }
};

export { addComment };
