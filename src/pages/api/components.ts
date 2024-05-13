/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import type { APIRoute } from "astro";
import { getComponents, addComponent } from "@services/components";
import { validateComponent } from "@utils/validateComponent";

// REST API Route

async function sleep() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({}), Math.random() * 1000)
  );
}
// GET
export const GET: APIRoute = async () => {
  await sleep();
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
  // TODO call a function to generate the Thumbnail and get the route
  // TODO Protect endpoints with JWT
  try {
    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Getting the JSON
      const body = await request.json();
      // Component data array
      const component = [
        body.categoryId,
        body.userId,
        body.name,
        body.description,
        "https://ximg.es/300x200",
        Boolean(body.needsAlpine),
        Boolean(body.needsCDN),
        body.tailwind,
        body.javascript,
      ];

      // Validate data and make the request to the database
      if (validateComponent(component)) {
        return new Response(
          JSON.stringify((await addComponent(component)) || [])
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
