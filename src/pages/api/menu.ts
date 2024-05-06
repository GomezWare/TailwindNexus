import type { APIRoute } from 'astro'
import { getMenu } from '@services/categories' 

export const GET: APIRoute = () => {
  return new Response(
   JSON.stringify(getMenu())
  )
}