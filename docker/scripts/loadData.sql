USE tnexus;

/*USERS*/
INSERT INTO
    users (
        name,
        email,
        password,
        avatar,
        created_at,
        updated_at
    )
VALUES
    (
        'admin',
        'admin@admin.com',
        SHA2 ('admin', 256),
        'https://ximg.es/128x128',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    users (
        name,
        email,
        password,
        avatar,
        created_at,
        updated_at
    )
VALUES
    (
        'user1',
        'user1@mail.com',
        SHA2 ('user1', 256),
        'https://ximg.es/128x128',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    users (
        name,
        email,
        password,
        avatar,
        created_at,
        updated_at
    )
VALUES
    (
        'user2',
        'user2@mail.com',
        SHA2 ('user2', 256),
        'https://ximg.es/128x128',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

/* Categories*/
INSERT INTO
    categories (name, description, created_at, updated_at)
VALUES
    (
        'Buttons',
        'HTML buttons are interactive elements that users can click to trigger an action. They are essential components of web forms and interfaces, providing a way for users to interact with a webpage.',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    categories (name, description, created_at, updated_at)
VALUES
    (
        'Modals',
        'HTML badges are visual indicators often used to highlight or display additional information, such as status, quantity, or category. They are commonly used in user interfaces to draw attention to specific elements or provide supplementary information.',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    categories (name, description, created_at, updated_at)
VALUES
    (
        'Null Category',
        'Category for debugin purporses.',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

/* Components */
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
        1,
        2,
        'Reactive button rounded',
        'A rounded button that change when the user hover it.',
        'https://ximg.es/300x200',
        false,
        true,
        '<button>Click me<button>',
        'console.log(\'hello world\');',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

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
        1,
        2,
        'Reactive button square',
        'A squared button that change when the user hover it.',
        'https://ximg.es/300x200',
        false,
        true,
        '<button>Click me<button>',
        'console.log(\'hello world\');',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

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
        2,
        3,
        'Tick badge',
        'You can use this on your photo.',
        'https://ximg.es/300x200',
        false,
        true,
        '<button>Click me<button>',
        'console.log(\'hello world\');',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

/* Comment */
INSERT INTO
    comments (
        user_id,
        component_id,
        content,
        created_at,
        updated_at
    )
VALUES
    (
        2,
        1,
        'Very Good Component, from user1',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    comments (
        user_id,
        component_id,
        content,
        created_at,
        updated_at
    )
VALUES
    (
        3,
        1,
        'Very Good Component, from user2',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    comments (
        user_id,
        component_id,
        content,
        created_at,
        updated_at
    )
VALUES
    (
        2,
        2,
        'Very Good Component, from user1',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    comments (
        user_id,
        component_id,
        content,
        created_at,
        updated_at
    )
VALUES
    (
        3,
        2,
        'Very Good Component, from user2',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

/* Follows */
INSERT INTO
    follow (follower_id, followed_id, created_at, updated_at)
VALUES
    (3, 2, UNIX_TIMESTAMP (), UNIX_TIMESTAMP ());

INSERT INTO
    follow (follower_id, followed_id, created_at, updated_at)
VALUES
    (2, 3, UNIX_TIMESTAMP (), UNIX_TIMESTAMP ());