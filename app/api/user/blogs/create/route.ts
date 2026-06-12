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
{error:"Unauthorized"},
{status:401}
);

}


const body=await req.json();


const slug=body.title
.toLowerCase()
.replaceAll(" ","-")
+"-"+Date.now();



const {data,error}=await supabase
.from("user_blogs")
.insert({

user_id:user.id,

title:body.title,

slug,

short_description:
body.short_description,

content:
body.content,

image:
body.image,

category:
body.category

})
.select()
.single();



if(error)
throw error;



return Response.json({
success:true,
blog:data
});


}catch(error){

return Response.json(
{error:"Failed"},
{status:500}
);

}

}