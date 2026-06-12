import {createClient} from "@/lib/supabase/server";

export async function PUT(req:Request){

try{

const supabase=await createClient();

const body=await req.json();

const {
data:{
user
},
error:authError
}=await supabase.auth.getUser();


if(authError || !user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}


const {
error
}=await supabase
.from("user_blogs")
.update({

title:body.title,

content:body.content,

excerpt:body.excerpt,

category:body.category,

cover_image:body.cover_image,

status:"pending",

updated_at:new Date().toISOString()

})
.eq(
"id",
body.id
)
.eq(
"user_id",
user.id
);



if(error){

throw error;

}



return Response.json(
{
success:true
}
);



}catch(error){

console.log(error);


return Response.json(
{
error:"Update failed"
},
{
status:500
}
);

}

}