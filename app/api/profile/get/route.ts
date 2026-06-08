import { createClient } from "@/lib/supabase/server";

export async function GET() {

  const supabase = await createClient();


  const {
    data:{
      user
    },
    error
  } = await supabase.auth.getUser();


  if(error || !user){
    return Response.json(
      {
        error:"Unauthorized"
      },
      {
        status:401
      }
    );
  }


  const {data, error:profileError}=await supabase
    .from("profiles")
    .select("*")
    .eq("id",user.id)
    .single();


  if(profileError){

    return Response.json(
      {
        error:profileError.message
      },
      {
        status:400
      }
    );

  }


  return Response.json(data);

}