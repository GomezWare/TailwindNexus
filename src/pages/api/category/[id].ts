/**
 * This Endpoint return a JSON with a categories specified with an ID
 * Uses the function getCategory in categories services
 */

// Imports
import type { APIRoute } from "astro";
import { getCategory } from "@services/categories";

// REST API Route

// GET
export const GET: APIRoute = async ({ params }) => {
  // Recover the category id via URL
  const id = params.id;

  // Create the response with the data that the service returned (the JSON itself)
  const response = (await getCategory(id)) || [];

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
