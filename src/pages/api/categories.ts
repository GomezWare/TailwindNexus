import type { APIRoute } from 'astro'
import {getCategories} from '@services/categories' 

export const GET: APIRoute = () => {
  return new Response(
   JSON.stringify(getCategories())
  )
}