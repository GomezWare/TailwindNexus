/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import type { APIRoute } from "astro";
import { getComponents, addComponent } from "@services/components";
import { validateComponent } from "@utils/validateComponent";
import { getSession } from "auth-astro/server";
import { checkUserMail } from "@services/auth";

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
  // TODO Generate thumbnail

  const session = await getSession(request);

  if (!session?.user) {
    return new Response(null, { status: 401, statusText: "User Unauthorized" });
  }

  try {
    // Try to get the user id from the database
    const userId = checkUserMail(session?.user.email);

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
        thumbnail: "https://ximg.es/300x200",
        needsAlpine: Boolean(body.needsAlpine),
        needsCDN: Boolean(body.needsCDN),
        tailwind: body.tailwind,
        javascript: body.javascript,
      };

      // Validate data and make the request to the database
      if (validateComponent(component)) {
        return new Response(
          JSON.stringify(
            (await addComponent([
              component.categoryId,
              component.userId,
              component.name,
              component.description,
              component.thumbnail,
              component.needsAlpine,
              component.needsCDN,
              component.tailwind,
              component.javascript,
            ])) || []
          )
        );
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
