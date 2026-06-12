import {createClient} from "@/lib/supabase/server";

export async function GET(req:Request){

try{

const supabase=await createClient();


const {searchParams}=new URL(req.url);


const id=searchParams.get("id");

const slug=searchParams.get("slug");



if(!id && !slug){

return Response.json(
{
error:"Missing product id or slug"
},
{
status:400
}
);

}



let query=supabase
.from("store_products")
.select(`
*,
store_categories(
name,
slug
)
`);



if(slug){

query=query.eq(
"slug",
slug
);

}


if(id){

query=query.eq(
"id",
id
);

}



const {data,error}=await query.single();



if(error){

return Response.json(
{
error:error.message
},
{
status:400
}
);

}



return Response.json(
{
product:data
}
);


}catch(error){

return Response.json(
{
error:"Failed to fetch product"
},
{
status:500
}
);

}

}