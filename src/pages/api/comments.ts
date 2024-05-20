//TODO Improve documentation

/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
 */

// Imports
import { addComment } from "@services/comments";
import { checkUserMail } from "@services/auth";
import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

// REST API Route

// POST
export const POST: APIRoute = async ({ request }) => {
  // Retrieving the session using request object via headers cookie
  const session = await getSession(request);

  // If there is no session send a 401 response
  if (!session?.user)
    return new Response(JSON.stringify([]), {
      status: 401,
      statusText: "User Unauthorized",
    });

  try {
    // If the POST body is not a JSON
    if (request.headers.get("Content-Type") === "application/json") {
      // Check if user exist and get the id
      const userId = await checkUserMail(session?.user.email);

      // Getting the JSON
      const body = await request.json();

      // Comment object
      const comment = {
        userId: userId, // Via email chexk
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
