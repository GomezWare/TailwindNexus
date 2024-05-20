// TODO Document this

// Imports
import { dbQuery } from "@utils/dbQuery";

// These functions can be used from Astro pages

/**
 * This function register a user using the session data and its called when we cant find
 * the email in the user database.
 *
 * @async
 * @param {String} name
 * @param {String} avatar
 * @param {String} email
 * @return {boolean}
 */
const registerUser = async (name, email, avatar) => {
  try {
    // Register user
    const [userDataRows, userDataFields] = await dbQuery(
      `
      INSERT INTO users (name, email, password, avatar, created_at, updated_at) 
      VALUES (?, ?, "", ?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());`,
      [name, email, avatar]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Check if the email exist in the db and return user id, if user doesnt exists returns a negative ID
 * @async
 * @param {String} mail
 * @returns {Number}
 */
const checkUserMail = async (mail) => {
  try {
    const [userDataRows, userDataFields] = await dbQuery(
      `
      SELECT user_id
      FROM users
      WHERE email = ?;
      `,
      [mail]
    );
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

export { registerUser, checkUserMail };
