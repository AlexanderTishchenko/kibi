"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const supabase = createClient()

interface Props { trigger: React.ReactElement }
const BuyCreditsModal: React.FC<Props> = ({ trigger }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>('')
  const [customAmount, setCustomAmount] = useState<number>(0)
  const [promoCode, setPromoCode] = useState<string>('')
  const [discount, setDiscount] = useState<number>(0)

  const { data: balance } = useQuery<number, Error>({
    queryKey: ['credits'],
    queryFn: async () => {
      const res = await fetch('/api/me/credits')
      if (!res.ok) throw new Error('Failed to fetch credits')
      const json = await res.json()
      return json.credits as number
    }
  })

  const priceCents = useMemo<number>(() => {
    const amt = selected === 'custom'
    ? customAmount
    : parseInt(selected || '0', 10)

    if (!amt) return 0

    const map = { 100: 900, 250: 1900, 500: 3400 } as const;
    return map[amt as keyof typeof map] ?? amt * 9;
  }, [selected, customAmount])

  const finalCents = Math.round(priceCents * (1 - discount / 100))
  const finalPrice = useMemo(() => (finalCents/100).toFixed(2), [finalCents])

  const handleValidatePromo = async () => {
    if (!promoCode) return setDiscount(0)
    try {
      const res = await fetch(`${apiUrl}/v1/payments/validate-promo`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ code: promoCode })
      })
      if (!res.ok) throw new Error(await res.text())
      const { discount_percent } = await res.json()
      setDiscount(discount_percent)
    } catch (err: any) {
      setDiscount(0)
      toast({ title: 'Invalid promo code', description: err.message||'', variant: 'destructive' })
    }
  }

  const handleProceed = async () => {
    try {
      const amt = selected==='custom'? customAmount: parseInt(selected||'0',10)
      const { data: { session } } = await supabase.auth.getSession()
      const userId = session?.user?.id ?? 'YOUR_TEST_USER_ID'
      const res = await fetch(`${apiUrl}/v1/payments/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amt,
          promo_code: promoCode || undefined,
          user_id: userId,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      const { url } = await res.json()
      window.location.href = url
    } catch (err: any) {
      toast({ title: 'Error', description: err.message||'Unable to proceed', variant: 'destructive' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy more credits</DialogTitle>
          <DialogDescription>Purchase additional automation credits.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p>You have {balance||0} credits</p>
          <RadioGroup value={selected} onValueChange={setSelected} className="space-y-2">
            {[100,250,500].map(v=>(
              <div key={v} className="flex items-center space-x-2">
                <RadioGroupItem value={String(v)} />
                <span>{v} credits — ${({100:9,250:19,500:34} as any)[v]}</span>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" />
              <span>Custom amount</span>
            </div>
            {selected==='custom'&&(
              <Input type="number" min={1} value={customAmount} onChange={e=>setCustomAmount(Math.max(0,parseInt(e.target.value)||0))} placeholder="Credits" />
            )}
          </RadioGroup>
          <Input type="text" value={promoCode} onChange={e=>setPromoCode(e.target.value)} onBlur={handleValidatePromo} placeholder="Promo code" />
          <div className="font-medium">Total: ${finalPrice}</div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button onClick={handleProceed} disabled={finalCents===0}>Proceed to payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default BuyCreditsModal
