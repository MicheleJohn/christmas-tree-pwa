'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { SendGiftInput, OpenGiftInput } from '@/schemas/gift.schema'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function useGifts() {
  const queryClient = useQueryClient()
  const t = useTranslations('gifts')

  const gifts = useQuery({
    queryKey: ['gifts'],
    queryFn: async () => {
      const res = await fetch('/api/gifts')
      if (!res.ok) throw new Error('Failed to fetch gifts')
      return res.json()
    },
  })

  const sendGift = useMutation({
    mutationFn: async (data: SendGiftInput) => {
      const res = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to send gift')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] })
      toast.success(t('success.sent'))
    },
    onError: (error) => {
      toast.error(error.message || t('errors.sendFailed'))
    },
  })

  const openGift = useMutation({
    mutationFn: async ({ giftId, password }: OpenGiftInput) => {
      const res = await fetch(`/api/gifts/${giftId}/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to open gift')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] })
      toast.success(t('success.opened'))
    },
    onError: (error) => {
      toast.error(error.message || t('errors.openFailed'))
    },
  })

  return { gifts, sendGift, openGift }
}
