// TODO Document endpoint

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
        const response = await getComponentsByQuery(body.param)
        return new Response(JSON.stringify(response));
      } else {
        return new Response(JSON.stringify([]), {
          status: 400,
          statusText: "bad request",
        });
      }
    } else {
      return new Response(JSON.stringify([]), {
        status: 400,
        statusText: "bad request",
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: "server side error",
    });
  }
};
