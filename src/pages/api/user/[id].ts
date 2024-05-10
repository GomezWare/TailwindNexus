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
  const id = params.id;

  // Create the response with the data that the service returned (the JSON itself)
  const response = (await getUser(id)) || [];
  // If the response is null or component doesnt exists return a blank JSON
  return new Response(JSON.stringify(response));
};
