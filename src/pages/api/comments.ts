/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import type { APIRoute } from "astro";

// REST API Route

// POST
export const POST: APIRoute = async ({ request }) => {
  // TODO Protect endpoints with JWT (User verification)
 return new Response();
};
