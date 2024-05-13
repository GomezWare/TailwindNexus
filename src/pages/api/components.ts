/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import type { APIRoute } from "astro";
import { getComponents, addComponent } from "@services/components";

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
  // If the POST body is not a JSON
  if (request.headers.get("Content-Type") === "application/json") {
    // Getting the JSON
    const body = await request.json();
    // Component object
    const component = [
      body.categoryId,
      body.userId,
      body.name,
      body.description,
      "https://ximg.es/300x200",
      body.needsAlpine,
      body.needsCDN,
      String(body.tailwind),
      String(body.javascript),
    ];
    return new Response(JSON.stringify(addComponent(component) || []));
  }
  return new Response(null, { status: 400, statusText: "Bad Request" });
};
