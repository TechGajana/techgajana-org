import { createClient } from "@/lib/supabase/server";


export async function POST(
req:Request
){

try{


const supabase =
await createClient();


const {
password
}=await req.json();



const {error} =
await supabase.auth.updateUser({
password
});



if(error){

return Response.json(
{
error:error.message
},
{
status:400
}
)

}



return Response.json({
success:true
});



}catch(error){


return Response.json(
{
error:"Password update failed"
},
{
status:500
}
)


}


}