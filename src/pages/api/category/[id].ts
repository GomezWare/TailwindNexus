import type { APIRoute } from 'astro'
import {getCategory} from '@services/categories' 

export const GET: APIRoute = ({params}) => {
    const id = params.id
    const response = getCategory(id)

if(!response){
    return new Response(null, {status:400, statusText:'Not Found'})
}
return new Response(JSON.stringify(response))

}