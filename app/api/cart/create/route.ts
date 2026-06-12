import {createClient} from "@/lib/supabase/server";


export async function POST(req:Request){

try{

const supabase=await createClient();


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const body=await req.json();



const {error}=await supabase
.from("cart_items")
.insert({

user_id:user.id,

product_id:body.product_id,

quantity:1

});



if(error){

throw error;

}



return Response.json({
success:true
});


}catch(error){

return Response.json(
{
error:"Cart failed"
},
{
status:500
}
);

}

}