"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const CreditsPage: React.FC = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const router = useRouter()
  //const toast = useToast()

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [purchased, setPurchased] = useState<number>(0)
  const [newBalance, setNewBalance] = useState<number>(0)
  const [retry, setRetry] = useState<number>(0)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      toast({ title: 'Missing session_id', variant: 'destructive' })
      return
    }
    const confirm = async () => {
      try {
        const res = await fetch(`${apiUrl}/v1/payments/confirm-session?session_id=${sessionId}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setPurchased(data.purchased)
        setNewBalance(data.new_balance)
        setStatus('success')
      } catch (err: any) {
        setStatus('error')
        toast({ title: 'Payment confirmation failed', description: err.message || 'Please try again', variant: 'destructive' })
      }
    }
    confirm()
  }, [sessionId, retry, toast])

  if (status === 'loading') {
    return <div className="container mx-auto py-8 text-center">Verifying payment...</div>
  }

  if (status === 'success') {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg">
          You’ve received +{purchased} credits. Your new balance is {newBalance} credits.
        </p>
        <Button onClick={() => router.push('/')} className="mt-6">
          Go to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-bold mb-4 text-destructive">Oops!</h1>
      <p className="mb-6">We couldn’t verify your payment. Please try again.</p>
      <Button onClick={() => setRetry(r => r + 1)}>Retry</Button>
    </div>
  )
}

export default CreditsPage
