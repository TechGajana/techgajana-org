import {createClient} from "@/lib/supabase/server";


export async function DELETE(req:Request){

const supabase=await createClient();


const body=await req.json();



const {error}=await supabase
.from("cart_items")
.delete()
.eq(
"id",
body.id
);



if(error){

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
success:true
});


}