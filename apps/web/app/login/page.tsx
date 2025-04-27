//apps/web/app/login/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
//import { useAuth } from '../../contexts/AuthContext';
//import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { login, signup } from './actions';
import { createClient } from "@/utils/supabase/client";


export default function LoginPage() {
  //const { user, loading, signIn, signInWithGoogle } = useAuth();
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMsg, setErrorMsg] = useState('');

  // useEffect(() => {
  //   if (!loading && user) {
  //     router.replace('/');
  //   }
  // }, [user, loading, router]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { error } = await signIn(email, password);
  //   if (error) {
  //     setErrorMsg(error.message);
  //   }
  // };
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError("There was an error logging in with Google. Please try again.");
      console.error("Error loging in with Google:", error);
      setIsGoogleLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Log in to Kibi</h1>
        {/*{errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}*/}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none"
            required
          />
          <div className="flex gap-2">
          <button
            formAction={login}
            className="w-1/2 bg-green-500 text-white py-2 rounded hover:bg-green-600/90"
          >
            Log In
          </button>
          <button
            formAction={signup}
            className="w-1/2 bg-primary-blue text-white py-2 rounded hover:bg-primary-blue/90"
          >
            Sign Up
          </button>
          </div>
        </form>
        <div className="mt-4">
          <button
            onClick={loginWithGoogle}
            disabled={isGoogleLoading}
            className="w-full flex justify-center border border-gray-200 rounded py-2 hover:bg-gray-50"
          >
            {isGoogleLoading ? "Loading..." : (
          <GoogleIcon />
        )}
          </button>
        </div>
      </div>
    </div>
  );
}

const GoogleIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="size-5"
  >
    <path
      fill="#fbc02d"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#e53935"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4caf50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1565c0"
      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);