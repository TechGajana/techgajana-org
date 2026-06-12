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
.from("user_blogs")
.delete()
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



return Response.json({
success:true
});


}catch(error){

console.log(error);


return Response.json(
{
error:"Delete failed"
},
{
status:500
}
);

}

}