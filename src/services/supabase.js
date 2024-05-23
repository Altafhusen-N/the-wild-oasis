import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://eowriezyesalmsdoinxe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvd3JpZXp5ZXNhbG1zZG9pbnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNDY1MjgsImV4cCI6MjAyMzkyMjUyOH0.rpyOgAUbVi2B1mCMUeVM9WV1TOlROUpZvyp3O1PQvT0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
