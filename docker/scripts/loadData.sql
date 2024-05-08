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
        SHA1 ('admin'),
        '/uploads/avatars/1.png',
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
        'user',
        'user@mail.com',
        SHA1 ('user'),
        '/uploads/avatars/2.png',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );