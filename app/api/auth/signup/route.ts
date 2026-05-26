import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase =
      await createClient();

    const body = await req.json();

    const {
      name,
      email,
      password,
    } = body;

    // CREATE AUTH USER
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return Response.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    const user = data.user;

    if (!user) {
      return Response.json(
        {
          error:
            "User creation failed",
        },
        {
          status: 400,
        }
      );
    }

    // INSERT INTO PROFILES TABLE
    const {
      error: profileError,
    } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        name,
        email,
        role: "user",
      });

    if (profileError) {
      return Response.json(
        {
          error:
            profileError.message,
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          "Signup failed",
      },
      {
        status: 500,
      }
    );
  }
}