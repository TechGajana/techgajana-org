import {createClient} from "@/lib/supabase/server";


export async function GET(){

const supabase=await createClient();


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return Response.json(
{
items:[]
}
);

}



const {data,error}=await supabase
.from("cart_items")
.select(`
id,
quantity,
store_products(
id,
title,
slug,
thumbnail,
price,
discount_price,
free_product
)
`)
.eq(
"user_id",
user.id
);



if(error){

return Response.json(
{
error:error.message
},
{
status:500
}
);

}



return Response.json({
items:data
});


}