/**
 * This Endpoint return a JSON with all categories
 * Uses the function getCategories in categories services
 */

// Imports
import type { APIRoute } from "astro";
import { getCategories } from "@services/categories";

// REST API Route

// GET
export const GET: APIRoute = async () => {
  // Create the response with the data that the service returned (the JSON itself)
  const categories = await getCategories();
  // API Response
  return new Response(JSON.stringify(categories));
};
