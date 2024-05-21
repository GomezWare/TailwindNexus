// TODO document Endpoint
/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 *
 */

// Imports
import type { APIRoute } from "astro";
import {
  getComponents,
  addComponent,
  getComponentAuthor,
  deleteComponent,
  updateComponent,
} from "@services/components";
import { validateComponent } from "@utils/validateComponent";
import { getSession } from "auth-astro/server";
import { checkUserMail } from "@services/auth";
import { renderThumbnail } from "@utils/thumbnails";

// REST API Route

// GET
export const GET: APIRoute = async () => {
  // Create the response with the data that the service returned (the JSON itself)
  const response = (await getComponents()) || [];

  // If data is succefully retrieved send the data else send a 500 error response
  if (response) {
    // API Response
    return new Response(JSON.stringify(response));
  } else {
    // If the response fails respond with a 500 server status
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: "Internal server error",
    });
  }
};

// POST
export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session?.user) {
    return new Response(null, { status: 401, statusText: "User Unauthorized" });
  }

  try {
    // Try to get the user id from the database
    const userId = await checkUserMail(session?.user.email);

    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Getting the JSON
      const body = await request.json();
      // Component data array
      const component = {
        categoryId: body.categoryId,
        userId: userId,
        name: body.name,
        description: body.description,
        thumbnail: "",
        needsAlpine: Boolean(body.needsAlpine),
        needsCDN: Boolean(body.needsCDN),
        tailwind: body.tailwind,
        javascript: body.javascript,
      };

      // Validate data and make the request to the database
      if (validateComponent(component)) {
        // Generate component thumbnail
        const thumbnail = await renderThumbnail(component.tailwind);

        const componentInsert = await addComponent([
          component.categoryId,
          component.userId,
          component.name,
          component.description,
          thumbnail,
          component.needsAlpine,
          component.needsCDN,
          component.tailwind,
          component.javascript,
        ]);

        return new Response(JSON.stringify(componentInsert));
      } else {
        return new Response(JSON.stringify("Validation Failed"), {
          status: 403,
          statusText: "Validation Failed",
        });
      }
    }
    return new Response(null, { status: 400, statusText: "Bad Request" });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500, statusText: "Server error" });
  }
};

// PUT
export const PUT: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session?.user) {
    return new Response(null, { status: 401, statusText: "User Unauthorized" });
  }

  try {
    // Try to get the user id from the database
    const userId = await checkUserMail(session?.user.email);

    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Getting the JSON
      const body = await request.json();
      // Component data array
      const component = {
        componentId: body.componentId,
        categoryId: body.categoryId,
        userId: userId,
        name: body.name,
        description: body.description,
        thumbnail: "",
        needsAlpine: Boolean(body.needsAlpine),
        needsCDN: Boolean(body.needsCDN),
        tailwind: body.tailwind,
        javascript: body.javascript,
      };

      // Check if comment belong to the user via getCommentAuthor function
      if (userId != (await getComponentAuthor(component.componentId)))
        return new Response(JSON.stringify([]), {
          status: 401,
          statusText: "user unauthorized",
        });

      // Validate data and make the request to the database
      if (validateComponent(component)) {
        // Generate component thumbnail
        const thumbnail = await renderThumbnail(component.tailwind);

        await updateComponent([
          component.categoryId,
          component.name,
          component.description,
          thumbnail,
          component.needsAlpine,
          component.needsCDN,
          component.tailwind,
          component.javascript,
          component.componentId,
        ]);

        return new Response(JSON.stringify(true));
      } else {
        return new Response(JSON.stringify("Validation Failed"), {
          status: 403,
          statusText: "Validation Failed",
        });
      }
    }
    return new Response(null, { status: 400, statusText: "Bad Request" });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500, statusText: "Server error" });
  }
};

// DELETE
export const DELETE: APIRoute = async ({ request }) => {
  // Retrieving the session using request object via headers cookie
  const session = await getSession(request);

  // If there is no session send a 401 response
  if (!session?.user)
    return new Response(JSON.stringify([]), {
      status: 401,
      statusText: "User Unauthorized",
    });

  try {
    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Check if user exist and get the id
      const userId = await checkUserMail(session?.user.email);

      // Getting the JSON
      const body = await request.json();

      // Getting the id of the compoenent that will be deleted
      const componentId = body.componentId;

      // Check if comment belong to the user via getCommentAuthor function
      if (userId != (await getComponentAuthor(componentId)))
        return new Response(JSON.stringify([]), {
          status: 401,
          statusText: "user unauthorized",
        });

      // Call function to delete a comment
      const response = await deleteComponent(componentId);

      // Check if component was deleted
      if (!response) {
        throw new Error("Component not deleted");
      }

      // Return the response with 200 status
      return new Response(JSON.stringify({ deleted: response }));
    } else {
      // API Response with bad request status
      return new Response(JSON.stringify([]), {
        status: 400,
        statusText: "bad request",
      });
    }
  } catch (err) {
    console.log(err);
    // API Response with bad request status
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
