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
    const decryptedContent = decryptGift(gift.encryptedContent, password)

    if (!decryptedContent) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Decrypt image if present
    let decryptedImage: string | null = null
    if (gift.encryptedImage) {
      decryptedImage = decryptGift(gift.encryptedImage, password)
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
      content: JSON.parse(decryptedContent),
      image: decryptedImage, // Base64 string or null
      from: gift.senderName || gift.from?.name || 'Anonymous',
    })
  } catch (error) {
    console.error('Error opening gift:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
