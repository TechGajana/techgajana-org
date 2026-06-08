import {createClient} from "@/lib/supabase/server";

export async function GET(){

try{

const supabase=await createClient();


const {data,error}=await supabase
.from("bookings")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.log(error);

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
bookings:data||[]
});


}catch(error){

return Response.json(
{
error:"Failed to fetch bookings"
},
{
status:500
}
);

}

}