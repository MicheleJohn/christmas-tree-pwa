import { z } from 'zod'

export const sendGiftSchema = z.object({
  recipientEmail: z.string().email('Invalid email address'),
  giftType: z.enum(['VOUCHER', 'SUBSCRIPTION', 'PHYSICAL', 'MESSAGE', 'EXPERIENCE']),
  content: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    code: z.string().optional(), // For vouchers/subscriptions
    address: z.string().optional(), // For physical gifts
    deliveryDate: z.string().optional(),
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  hint: z.string().optional(),
  senderName: z.string().optional(),
})

export const openGiftSchema = z.object({
  giftId: z.string(),
  password: z.string().min(1, 'Password is required'),
})

export type SendGiftInput = z.infer<typeof sendGiftSchema>
export type OpenGiftInput = z.infer<typeof openGiftSchema>
