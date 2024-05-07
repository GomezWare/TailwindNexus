import type { APIRoute } from 'astro'
import {getCategory} from '@services/categories' 

export const GET: APIRoute = ({params}) => {
    const id = params.id
    const response = getCategory(id) || []
return new Response(JSON.stringify(response));
}