// TODO Document this service when its finally complete

import users from "@data/users.json";
import { dbQuery } from "@utils/dbQuery";

const getUser = (id) => {
  dbQuery(`SELECT 
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
`);
};

export { getUser };
