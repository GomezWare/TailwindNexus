/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import { addComment } from "@services/comments";
import type { APIRoute } from "astro";

// REST API Route

// POST
export const POST: APIRoute = async ({ request }) => {
  // TODO Protect endpoints with JWT (User verification)

  try {
    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Getting the JSON
      const body = await request.json();

      // Comment object
      const comment = {
        userId: 1,
        componentId: body.componentId,
        content: body.content,
      };

      // Checks if comment content is empty or component id is empty else return 400 response
      if (String(comment.content).trim() == "" || !comment.componentId) {
        return new Response(JSON.stringify([]), {
          status: 400,
          statusText: "bad request",
        });
      }

      // Call component insert fucntion to insert Data into the DB
      const response = await addComment([
        comment.userId,
        comment.componentId,
        comment.content,
      ]);

      // Return the response with 200 status
      return new Response(JSON.stringify({ inserted: response }));
    } else {
      // API Response with bad request status
      return new Response(JSON.stringify([]), {
        status: 400,
        statusText: "bad requests",
      });
    }
  } catch (err) {
    console.log(err);
    // API Response with bad request status
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
