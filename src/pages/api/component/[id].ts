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
  // If the response is null or component doesnt exists return a blank JSON
  return new Response(JSON.stringify(response));
};
