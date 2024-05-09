/**
 *
 */

// Imports
import type { APIRoute } from "astro";
import { getMenu } from "@services/categories";

// REST API Route

// GET
export const GET: APIRoute = async () => {
  // Create the response with the data that the service returned (the JSON itself)
  const response = await getMenu();

  // If data is succefully retrieved send the data else send a 500 error response

    return new Response(JSON.stringify(response));

  // API Response
  return new Response(null, {
    status: 500,
    statusText: "Internal server error",
  });
};
