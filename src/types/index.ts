import { User } from '@prisma/client'

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

// Gift types
export type GiftContent = {
  title: string
  description?: string
  code?: string // For vouchers/subscriptions
  address?: string // For physical gifts
  deliveryDate?: string
}

export type DecryptedGift = {
  id: string
  content: GiftContent
  image?: string // Base64 encoded image
  type: 'VOUCHER' | 'SUBSCRIPTION' | 'PHYSICAL' | 'MESSAGE' | 'EXPERIENCE'
  from?: string
  openedAt?: Date
}

// Tree types
export type TreePosition = {
  x: number
  y: number
  z: number
}

export type DecorationData = {
  id: string
  type: string
  color: string
  position: TreePosition
}
