/**
 * This Endpoint return a JSON with all components
 * Uses the function getComponents in components services
*/

// Imports
import type { APIRoute } from 'astro'
import { getComponents } from '@services/components'



// REST API Route

// GET
export const GET: APIRoute = () => {
    // Create the response with the data that the service returned (the JSON itself)

    // API Response
    return new Response(
        JSON.stringify(getComponents())
    )
}