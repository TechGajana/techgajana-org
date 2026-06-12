import {createClient} from "@/lib/supabase/server";

export async function GET(){

try{

const supabase=await createClient();


const {data,error}=await supabase
.from("user_blogs")
.select("*")
.order(
"created_at",
{
ascending:false
}
);



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
blogs:data || []
});


}catch(error){

console.log(error);


return Response.json(
{
error:"Failed"
},
{
status:500
}
);

}

}