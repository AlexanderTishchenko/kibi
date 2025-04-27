"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// Custom hook to handle user logout
export default function useLogout() {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[useLogout] signOut error:', error);
    }
    router.push('/login');
  };

  return logout;
}
