import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { decryptGift } from '@/lib/encryption'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { password } = await req.json()

    // Get gift and verify ownership
    const gift = await prisma.gift.findFirst({
      where: {
        id: params.id,
        tree: {
          userId: session.user.id,
        },
      },
      include: {
        from: true,
      },
    })

    if (!gift) {
      return NextResponse.json({ error: 'Gift not found' }, { status: 404 })
    }

    // Decrypt content
    const decrypted = decryptGift(gift.encryptedContent, password)

    if (!decrypted) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Mark as opened
    await prisma.gift.update({
      where: { id: params.id },
      data: {
        opened: true,
        openedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      content: JSON.parse(decrypted),
      from: gift.senderName || gift.from?.name || 'Anonymous',
    })
  } catch (error) {
    console.error('Error opening gift:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
