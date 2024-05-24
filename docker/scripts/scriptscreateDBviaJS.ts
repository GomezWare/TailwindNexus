import {dbQuery} from '@utils/dbQuery'

try {
  dbQuery(`CREATE DATABASE tnexus;

  USE tnexus;
  
  CREATE TABLE
      users (
          user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name TEXT,
          email TEXT,
          avatar TEXT,
          created_at INTEGER,
          updated_at INTEGER
      );
  
  CREATE TABLE
      categories (
          category_id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name TEXT,
          description TEXT,
          created_at INTEGER,
          updated_at INTEGER
      );
  
  CREATE TABLE
      components (
          component_id INTEGER PRIMARY KEY AUTO_INCREMENT,
          category_id INTEGER,
          user_id INTEGER,
          name TEXT,
          description TEXT,
          thumbnail TEXT,
          needs_alpine BOOLEAN,
          needs_cdn BOOLEAN,
          tailwind_code TEXT,
          javascript_code TEXT,
          created_at INTEGER,
          updated_at INTEGER,
          FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
  
  CREATE TABLE
      comments (
          comment_id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER,
          component_id INTEGER,
          content TEXT,
          created_at INTEGER,
          updated_at INTEGER,
          FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (component_id) REFERENCES components (component_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
  
  CREATE TABLE
      follow (
          follow_id INTEGER PRIMARY KEY AUTO_INCREMENT,
          follower_id INTEGER,
          followed_id INTEGER,
          created_at INTEGER,
          updated_at INTEGER,
          FOREIGN KEY (follower_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (followed_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
  
  /* Insert categories*/
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Buttons',
          'Interactive elements used to perform actions, such as sending forms or triggering events. They can have different styles such as primary, secondary, with icons, etc.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Forms',
          'Set of interactive elements such as text fields, selectors, checkboxes and buttons to collect user data.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Tables',
          'Structures for displaying data in rows and columns, with layout options for headers, cells, borders and more.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Modals',
          'Overlay pop-up windows that display additional information without leaving the current page, used for forms, confirmations and notifications.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Navbars',
          'Horizontal or vertical menus that allow users to navigate through different sections of an application or website.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Profile Cards',
          'Cards to display user information, including images, names, descriptions and links to social networks.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Lists',
          'Items organized vertically to present sets of data, such as menu items, task lists or inventory items.Items organized vertically to present sets of data, such as menu items, task lists or inventory items.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Alerts',
          'Highlighted messages that inform users of important events, such as errors, warnings or confirmations.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Breadcrumbs',
          'Navigation elements that show the users navigation path within the site, making it easy to return to previous sections.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Pagination',
          'Set of links that allow users to navigate through different pages of content, essential for data-intensive applications',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Pricing Tables',
          'Specific designs to present pricing options and product or service features, helping users compare and select.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Tooltips',
          'Small pop-up windows that provide additional information when the user hovers over an element.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Spinners',
          'Animations that indicate that an action or process is in progress, improving the user experience during waiting times.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Grids',
          'Design systems that organize content in a structure of rows and columns, facilitating the creation of responsive and well-aligned layouts.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Accordions',
          'Components that allow showing and hiding content dynamically, organizing information in drop-down sections.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Avatars',
          'Small circular or square images that represent users, commonly used in profiles and user lists.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );
  
  INSERT INTO
      categories (name, description, created_at, updated_at)
  VALUES
      (
          'Footers',
          'Sections at the bottom of pages containing important links, contact information and other secondary navigation elements.',
          UNIX_TIMESTAMP (),
          UNIX_TIMESTAMP ()
      );`);

} catch (error) {
  
}
