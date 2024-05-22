USE tnexus;

/* This script is for load some data into the database */
/*USERS*/
INSERT INTO
    users (name, email, avatar, created_at, updated_at)
VALUES
    (
        'Walter White',
        'garciapedro@mail.com',
        'https://images.pexels.com/photos/23914678/pexels-photo-23914678/free-photo-of-mar-paisaje-playa-agua.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    users (name, email, avatar, created_at, updated_at)
VALUES
    (
        'Jesse Pinkman',
        'jessepinkman@mail.com',
        'https://images.pexels.com/photos/18955722/pexels-photo-18955722/free-photo-of-blanco-y-negro-hombre-deporte-monopatin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        UNIX_TIMESTAMP (),
        UNIX_TIMESTAMP ()
    );

INSERT INTO
    users (name, email, avatar, created_at, updated_at)
VALUES
    (
        'Gus Fring',
        'gusfring@mail.com',
        'https://images.pexels.com/photos/20736684/pexels-photo-20736684/free-photo-of-madera-moda-arte-oscuro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
        'placeholder.png',
        false,
        true,
        '<button id="button" class="p-5 rounded border border-cyan-500 hover:bg-slate-500 bg-slate-600">Click me</button>',
        'document.querySelector("#button").addEventListener(\'click\', ()=>{alert("Hello World")})',
        UNIX_TIMESTAMP () + 10,
        UNIX_TIMESTAMP () + 10
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
        'placeholder.png',
        false,
        true,
        '<button id="button" class="p-5 border border-cyan-500 hover:bg-slate-500 bg-slate-600">Click me</button>',
        'document.querySelector("#button").addEventListener(\'click\', ()=>{alert("Hello World")})',
        UNIX_TIMESTAMP () + 20,
        UNIX_TIMESTAMP () + 20
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
        'Cool input',
        'You can use this on your form.',
        'placeholder.png',
        false,
        true,
        '<input type="text" class="px-2 py-4 rounded border-4 text-cyan-600 hover:bg-gray-200"/>',
        '// No script needed',
        UNIX_TIMESTAMP () + 30,
        UNIX_TIMESTAMP () + 30
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
        'Very Good Component',
        UNIX_TIMESTAMP () + 10,
        UNIX_TIMESTAMP () + 10
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
        'Pretty Good Component',
        UNIX_TIMESTAMP () + 20,
        UNIX_TIMESTAMP () + 20
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
        'Cool',
        UNIX_TIMESTAMP () + 30,
        UNIX_TIMESTAMP () + 30
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
        'Needs some script ',
        UNIX_TIMESTAMP () + 40,
        UNIX_TIMESTAMP () + 40
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
        1,
        2,
        'Doesnt work on mobile ',
        UNIX_TIMESTAMP () + 40,
        UNIX_TIMESTAMP () + 40
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