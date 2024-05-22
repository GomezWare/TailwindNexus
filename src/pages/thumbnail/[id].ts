// TODO Comment this

import type { APIRoute } from "astro";
import path from "path";
import { readFileSync } from "fs";

export const GET: APIRoute = async ({ params }) => {
  const imageId = params.id;

  const imagePath = path.join(process.cwd(), "upload", imageId);
  try {
    const image = readFileSync(imagePath);
    return new Response(image, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    console.log(err);
    return new Response("Image not found", { status: 404 });
  }
};
