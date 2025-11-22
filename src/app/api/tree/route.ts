import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createTreeSchema, updateTreeSchema } from '@/schemas/tree.schema'
import { ZodError } from 'zod'

// GET /api/tree - Get current user's tree
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

    return NextResponse.json(tree)
  } catch (error) {
    console.error('Error fetching tree:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/tree - Create tree for current user
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = createTreeSchema.parse(body)

    const tree = await prisma.tree.create({
      data: {
        userId: session.user.id,
        name: validated.name,
        theme: validated.theme,
      },
    })

    return NextResponse.json(tree)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating tree:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/tree - Update current user's tree
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = updateTreeSchema.parse(body)

    const tree = await prisma.tree.update({
      where: { userId: session.user.id },
      data: validated,
    })

    return NextResponse.json(tree)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating tree:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
