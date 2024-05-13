/**
 * This Endpoint return a JSON with all components ordered by creation date
 * Uses the function getLatest in components services
 */

// Imports
import type { APIRoute } from "astro";
import { getLatest } from "@services/components";

// REST API Route

// GET
export const GET: APIRoute = async () => {
  // Create the response with the data that the service Database returned (the JSON itself);
  const response = await getLatest();
  // API Response
  return new Response(JSON.stringify(response));
};
