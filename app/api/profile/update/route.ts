import { createClient } from "@/lib/supabase/server";


export async function POST(req:Request){

const supabase =
await createClient();


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
});

}


const body =
await req.json();


const {
name,
avatar_url
}=body;



const {error}=await supabase
.from("profiles")
.update({
name,
avatar_url
})
.eq(
"id",
user.id
);



if(error){

return Response.json(
{
error:error.message
},
{
status:400
});

}



return Response.json({
success:true
});


}