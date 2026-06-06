import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {

  const supabase = await createClient();

  const { email } = await req.json();


  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`
      }
    );


  if(error){
    return Response.json(
      {
        error:error.message
      },
      {
        status:400
      }
    );
  }


  return Response.json({
    success:true
  });

}