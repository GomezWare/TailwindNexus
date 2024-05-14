/**
 * This Endpoint return a JSON with a component specified with an ID
 * Uses the function getComponent in component services
 */

// Imports
import type { APIRoute } from "astro";
import { getComponent } from "@services/components";

// REST API Route

// GET
export const GET: APIRoute = async ({ params }) => {
  // Recover the category id via URL
  const id = params.id;

  // Create the response with the data that the service returned (the JSON itself)
  const response = (await getComponent(id)) || [];

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
