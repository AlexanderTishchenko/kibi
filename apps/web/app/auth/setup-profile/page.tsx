"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SetupProfile() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/";
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    async function run() {
      console.log('[setup-profile] start setup-profile, next=', next);
      const supabase = await createClient();
      console.log('[setup-profile] Supabase client created');
      // здесь уже «на месте» ставится сессия из cookie
      console.log('[setup-profile] fetching current user');
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('[setup-profile] getUser error:', authError);
        return router.replace("/login");
      }
      if (!user) {
        console.warn('[setup-profile] no user found, redirecting to login');
        return router.replace("/login");
      }

      const payload = {
        userid: user.id,
        username: user.user_metadata.full_name ?? user.email!.split("@")[0],
        avatar_url: user.user_metadata.avatar_url || "https://i.pravatar.cc/300?img=5",
        credits: 0,
        level: 1,
        progress: 0,
        total_time_saved: 0,
        total_money_saved: 0,
      };
      console.log('[setup-profile] payload:', payload);

      let response;
      try {
        response = await fetch(`${window.location.origin}/api/me/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // прокидываем все куки из запроса
            Cookie: document.cookie,
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error('[setup-profile] failed to create profile:', error);
        return router.replace(`${window.location.origin}/error`);
      }

      if (!response.ok) {
        const text = await response.text();
        console.error('[setup-profile] failed to create profile:', text);
        return router.replace(`${window.location.origin}/error`);
      }
      console.log('[setup-profile] profile created successfully');
      console.log('[setup-profile] redirecting to next:', next);
      router.replace(next);
    }
    run();
  }, []);

  return <p>Setting up your profile…</p>;
}
