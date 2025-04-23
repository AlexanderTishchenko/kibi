"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  signInWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) router.push('/');
    });
    return () => { listener.subscription.unsubscribe(); };
  }, [router]);

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return supabase.auth.signInWithPassword({ email, password });
  };
  const signUp = (email: string, password: string) => {
    setLoading(true);
    return supabase.auth.signUp({ email, password });
  };
  const signOut = () => supabase.auth.signOut();
  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider: 'google' });

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
