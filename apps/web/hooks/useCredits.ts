import useSWR, { mutate } from 'swr';
import { createClient } from '../utils/supabase/client';
import React from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCredits() {
  const { data, error } = useSWR<{ credits: number }>(
    '/api/me/credits',
    fetcher
  );
  const supabase = createClient()
  // Real-time updates via Supabase channel
  React.useEffect(() => {
    const channel = supabase
      .channel('automation_runs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automation_runs' }, () => {
        mutate('/api/me/credits');
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return {
    credits: data?.credits ?? 0,
    isLoading: !data && !error,
    error
  };
}
