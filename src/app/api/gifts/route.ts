import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { encryptGift } from '@/lib/encryption'
import { sendGiftSchema } from '@/schemas/gift.schema'
import { ZodError } from 'zod'

// GET /api/gifts - Get all gifts for current user's tree
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tree = await prisma.tree.findUnique({
      where: { userId: session.user.id },
      include: {
        gifts: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return NextResponse.json(tree?.gifts || [])
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/gifts - Send a gift to another user
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = sendGiftSchema.parse(body)

    // Find recipient's tree
    const recipientUser = await prisma.user.findUnique({
      where: { email: validated.recipientEmail },
      include: { trees: true },
    })

    if (!recipientUser) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 })
    }

    // Create tree if recipient doesn't have one
    let tree = recipientUser.trees[0]
    if (!tree) {
      tree = await prisma.tree.create({
        data: { userId: recipientUser.id },
      })
    }

    // Encrypt gift content
    const encryptedContent = encryptGift(
      JSON.stringify(validated.content),
      validated.password
    )

    // Encrypt image if provided
    const encryptedImage = validated.imageBase64
      ? encryptGift(validated.imageBase64, validated.password)
      : null

    // Create gift
    const gift = await prisma.gift.create({
      data: {
        treeId: tree.id,
        fromUserId: session.user.id,
        senderName: validated.senderName,
        encryptedContent,
        encryptedImage,
        giftType: validated.giftType,
        encryptionHint: validated.hint,
      },
    })

    return NextResponse.json({ success: true, giftId: gift.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error sending gift:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
