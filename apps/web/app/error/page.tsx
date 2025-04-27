//apps/web/app/error/page.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


export default function ErrorPage({
  error,
  //reset,
}: {
  error: Error;
  //reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <div className="bg-white p-8 rounded shadow w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Oops!</h1>
        <p className="mb-6 text-gray-500">
          {error?.message ? (
            <span>Sorry, something went wrong: <em>{error.message}</em></span>
          ) : (
            <span>Sorry, something went wrong</span>
          )}
        </p>
        <Button
          onClick={() => {
            //reset();
            router.push('/');
          }}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}