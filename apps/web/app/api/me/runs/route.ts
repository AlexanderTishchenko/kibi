import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = req.headers.get('authorization') ?? '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/automations/runs`, {
    headers: { Authorization: token },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.error();
  const data = await res.json();
  return NextResponse.json(data);
}
