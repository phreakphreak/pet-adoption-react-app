import { supabase } from "../supabase/client";

export async function LoginWithEmail({ email }: { email: string }) {
  const { error, data } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
  return data;
}

export async function LoginWithEmailPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}
