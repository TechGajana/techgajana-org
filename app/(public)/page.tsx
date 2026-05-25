"use client";

import {createClient} from "@/lib/supabase/client";

  const supabase = createClient();

export default function HomePage() {


  console.log("SUPABASE:", supabase);

  return (
    <main>
      <h1>Supabase Connected Successfully</h1>
    </main>
  );
}