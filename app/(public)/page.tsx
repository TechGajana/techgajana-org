"use client";

import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  console.log("SUPABASE:", supabase);

  return (
    <main>
      <h1>Supabase Connected Successfully</h1>
    </main>
  );
}