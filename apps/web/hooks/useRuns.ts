//apps/web/hooks/useRuns.ts
import React from 'react';
import useSWR, { mutate } from 'swr';
import { createClient } from '../utils/supabase/client';

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    // прочитаем тело — там будет { error: "..."} из прокси
    const err = await res.json().catch(() => null)
    const msg = err?.error ?? res.statusText
    const e = new Error(msg)
    ;(e as any).status = res.status
    throw e
  }
  return res.json()
}

export function useRuns() {
  const supabase = createClient();
  const { data, error } = useSWR<any[]>('/api/me/runs', fetcher);
  React.useEffect(() => {
    const channel = supabase
      .channel('automation_runs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automation_runs' }, () => {
        mutate('/api/me/runs');
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return {
    runs: data ?? [],
    isLoading: !data && !error,
    error
  };
}
