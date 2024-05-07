/**
 * This Endpoint return a JSON with a categories specified with an ID
 * Uses the function getCategory in categories services
*/


// Imports
import type { APIRoute } from 'astro'
import { getCategory } from '@services/categories'


// REST API Route

// GET
export const GET: APIRoute = ({ params }) => {
    // Recover the category id via URL
    const id = params.id

    // Create the response with the data that the service returned (the JSON itself)
    const response = getCategory(id) || []
    // If the response is null or category doesnt exists return a blank JSON
    return new Response(JSON.stringify(response));
}