import {createClient} from "@/lib/supabase/server";

export async function GET(){

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


const {data,error}=await supabase
.from("user_blogs")
.select("*")
.eq("user_id",user.id)
.order(
"created_at",
{
ascending:false
}
);


if(error){

throw error;

}



return Response.json({
blogs:data || []
});


}catch(error){

console.log(error);

return Response.json(
{
error:"Failed to fetch blogs"
},
{
status:500
}
);

}

}