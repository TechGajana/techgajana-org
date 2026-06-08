import {createClient} from "@/lib/supabase/server";


export async function POST(req:Request){

try{

const supabase =
await createClient();


const body =
await req.json();



const {
data:{
user
}
}
=
await supabase.auth.getUser();



if(!user){

return Response.json(
{
error:"Not logged in"
},
{
status:401
}
);

}



const {error}=

await supabase
.from("bookings")
.insert({

user_id:user.id,

service_slug:
body.service,

name:body.name,

email:body.email,

message:body.message,

status:"pending"

});



if(error){

throw error;

}



return Response.json({
success:true
});


}
catch(error){

return Response.json(
{
error:"Booking failed"
},
{
status:500
}
);

}

}