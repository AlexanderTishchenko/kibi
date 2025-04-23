import React from 'react';
import useSWR, { mutate } from 'swr';
import { supabase } from '../lib/supabase';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useRuns() {
  const { data, error } = useSWR<{ runs: any[] }>('/api/me/runs', fetcher);

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
    runs: data?.runs ?? [],
    isLoading: !data && !error,
    error
  };
}
