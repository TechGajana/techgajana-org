import {createClient} from "@/lib/supabase/server";

export async function PUT(req:Request){

try{

const supabase=await createClient();

const body=await req.json();

const {
id,
status
}=body;


if(!id || !status){

return Response.json(
{
error:"Invalid data"
},
{
status:400
}
);

}



const {error}=await supabase
.from("user_blogs")
.update({

status,

updated_at:new Date().toISOString()

})
.eq(
"id",
id
);



if(error){

throw error;

}



return Response.json({
success:true,
status
});


}catch(error){

console.log(error);


return Response.json(
{
error:"Status update failed"
},
{
status:500
}
);

}

}