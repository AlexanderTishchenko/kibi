"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user, loading, signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Log in to Kibi</h1>
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-primary-blue text-white py-2 rounded hover:bg-primary-blue/90"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full flex justify-center border border-gray-200 rounded py-2 hover:bg-gray-50"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
