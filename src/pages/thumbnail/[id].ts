/**
 * After moving the project to production I noticed that the thumbnails
 * were not working so I created this endpoint which will serve the thumbnails
 * regardless of whether the project is in development or production.
 */

import type { APIRoute } from "astro";
import path from "path";
import { readFileSync } from "fs";

// GET API ROUTE
export const GET: APIRoute = async ({ params }) => {
  // Obtain the thumbnail id via params
  const imageId = params.id;

  try {
    // Try to get the imgae
    // Calculate the path of the image in the server
    const image = readFileSync(path.join(process.cwd(), "upload", imageId));

    // Return the thumbnail as binary image png file
    return new Response(image, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    // If we cant find the image return a 404 response with a placeHolder
    const image = readFileSync(
      path.join(process.cwd(), "upload", "placeholder.png")
    );
    console.log(err);
    return new Response(image, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  }
};
