import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Hello, {user.email}!</p>
    </div>
  );
}
