import type { APIRoute } from "astro";
import { getComponentsByQuery } from "@services/search";

// REST API Route
// POST
export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.headers.get("Content-Type") === "application/json") {
      // Getting the JSON
      const body = await request.json();

      // Verify if the search param is valid
      if (String(body.param).trim() !== "") {
        const response = await getComponentsByQuery(body.param);
        return new Response(JSON.stringify(response));
      } else {
        // If valdiation fails send a 403 status
        return new Response(JSON.stringify([]), {
          status: 403,
          statusText: "Validation fail",
        });
      }
    } else {
      // If there are not JSON suplied send a 400 bad request status
      return new Response(JSON.stringify([]), {
        status: 400,
        statusText: "bad request",
      });
    }
  } catch (err) {
    // If there are an error send 500 status
    console.log(err);
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: "server side error",
    });
  }
};
