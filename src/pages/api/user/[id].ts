/**
 * This Endpoint return a JSON with a user specified with an ID
 * Uses the function getUser in component services
 */

// Imports
import type { APIRoute } from "astro";
import { getUser } from "@services/users";

// REST API Route

// GET
export const GET: APIRoute = async ({ params }) => {
  // Recover the category id via URL
  const id = Number(params.id);

  // Create the response with the data that the service returned (the JSON itself)
  const response = (await getUser(id)) || [];

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
